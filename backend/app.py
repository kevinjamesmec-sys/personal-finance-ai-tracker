import csv
from categorizer import categorize_transaction
from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app)

db = get_db_connection()


@app.route("/")
def home():
    return {"message": "Personal Finance AI Tracker Backend Running"}


@app.route("/register", methods=["POST"])
def register():
    data = request.json

    name = data["name"]
    email = data["email"]
    password = data["password"]

    db = get_db_connection()
    cursor = db.cursor()

    query = """
    INSERT INTO users (name, email, password)
    VALUES (%s, %s, %s)
    """

    values = (name, email, password)

    cursor.execute(query, values)
    db.commit()

    return jsonify({"message": "User registered successfully"})


@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data["email"]
    password = data["password"]

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    query = """
    SELECT * FROM users
    WHERE email = %s AND password = %s
    """

    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    if user:
        return jsonify({
            "message": "Login successful",
            "user": user
        })
    else:
        return jsonify({
            "message": "Invalid email or password"
        }), 401


@app.route("/income", methods=["POST"])
def add_income():
    data = request.json

    user_id = data["user_id"]
    amount = data["amount"]

    db = get_db_connection()
    cursor = db.cursor()

    query = """
    INSERT INTO income (user_id, amount)
    VALUES (%s, %s)
    """

    cursor.execute(query, (user_id, amount))
    db.commit()

    return jsonify({
        "message": "Income added successfully"
    })


@app.route("/income", methods=["GET"])
def get_income():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"error": "Invalid user_id"}), 400

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    query = "SELECT * FROM income WHERE user_id = %s"
    cursor.execute(query, (user_id,))
    income_data = cursor.fetchall()

    return jsonify(income_data)


@app.route("/expenses", methods=["POST"])
def add_expense():
    data = request.json

    user_id = data["user_id"]
    expense_name = data["expense_name"]
    amount = data["amount"]
    category = data["category"]
    transaction_date = data["transaction_date"]

    db = get_db_connection()
    cursor = db.cursor()

    query = """
    INSERT INTO transactions
    (user_id, expense_name, amount, category, transaction_date)
    VALUES (%s, %s, %s, %s, %s)
    """

    values = (
        user_id,
        expense_name,
        amount,
        category,
        transaction_date
    )

    cursor.execute(query, values)
    db.commit()

    return jsonify({
        "message": "Expense added successfully"
    })


@app.route("/expenses", methods=["GET"])
def get_expenses():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"error": "Invalid user_id"}), 400

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    query = "SELECT * FROM transactions WHERE user_id = %s ORDER BY id DESC"
    cursor.execute(query, (user_id,))
    expenses = cursor.fetchall()

    return jsonify(expenses)


@app.route("/budget", methods=["POST"])
def add_budget():
    data = request.json

    user_id = data["user_id"]
    category = data["category"]
    budget_amount = data["budget_amount"]

    db = get_db_connection()
    cursor = db.cursor()

    query = """
    INSERT INTO budgets (user_id, category, budget_amount)
    VALUES (%s, %s, %s)
    """

    cursor.execute(query, (user_id, category, budget_amount))
    db.commit()

    return jsonify({
        "message": "Budget added successfully"
    })


@app.route("/budget", methods=["GET"])
def get_budget():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"error": "Invalid user_id"}), 400

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    query = "SELECT * FROM budgets WHERE user_id = %s ORDER BY id DESC"
    cursor.execute(query, (user_id,))
    budgets = cursor.fetchall()

    return jsonify(budgets)


@app.route("/dashboard", methods=["GET"])
def dashboard():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"error": "Invalid user_id"}), 400

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT IFNULL(SUM(amount),0) AS total_income FROM income WHERE user_id = %s",
        (user_id,)
    )
    total_income = cursor.fetchone()["total_income"]

    cursor.execute(
        "SELECT IFNULL(SUM(amount),0) AS total_expenses FROM transactions WHERE user_id = %s",
        (user_id,)
    )
    total_expenses = cursor.fetchone()["total_expenses"]

    savings = total_income - total_expenses

    cursor.execute(
        "SELECT category, IFNULL(SUM(budget_amount),0) AS budget_amount FROM budgets WHERE user_id = %s GROUP BY category",
        (user_id,)
    )
    budgets = cursor.fetchall()

    cursor.execute(
        "SELECT category, IFNULL(SUM(amount),0) AS spent FROM transactions WHERE user_id = %s GROUP BY category",
        (user_id,)
    )
    spent_rows = cursor.fetchall()
    spent_by_category = {row["category"]: float(row["spent"]) for row in spent_rows}

    budget_overview = []
    for budget in budgets:
        category = budget["category"]
        budget_amount = float(budget["budget_amount"])
        spent = spent_by_category.get(category, 0.0)
        percent = 0.0
        if budget_amount > 0:
            percent = min(100.0, round((spent / budget_amount) * 100, 1))

        budget_overview.append({
            "category": category,
            "budget_amount": budget_amount,
            "spent": spent,
            "percent": percent,
            "remaining": float(max(0, budget_amount - spent))
        })

    return jsonify({
        "total_income": float(total_income),
        "total_expenses": float(total_expenses),
        "savings": float(savings),
        "budget_overview": budget_overview
    })


if __name__ == "__main__":
    app.run(debug=True)

@app.route("/upload-transactions", methods=["POST"])
def upload_transactions():

    file = request.files["file"]
    user_id = request.form["user_id"]

    file_path = file.filename
    file.save(file_path)

    transactions = process_csv(file_path)

    db = get_db_connection()
    cursor = db.cursor()

    for transaction in transactions:

        query = """
        INSERT INTO transactions
        (user_id, expense_name, amount, category, transaction_date)
        VALUES (%s, %s, %s, %s, %s)
        """

        values = (
            user_id,
            transaction["expense_name"],
            transaction["amount"],
            transaction["category"],
            transaction["transaction_date"]
        )

        cursor.execute(query, values)

    db.commit()

    return jsonify({
        "message": "Transactions uploaded successfully"
    })
@app.route("/category-spending", methods=["GET"])
def category_spending():

    user_id = request.args.get("user_id")

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    query = """
    SELECT category,
           SUM(amount) AS total
    FROM transactions
    WHERE user_id = %s
    GROUP BY category
    """

    cursor.execute(query, (user_id,))
    rows = cursor.fetchall()

    result = {}

    for row in rows:
        result[row["category"]] = float(row["total"])

    return jsonify(result)
