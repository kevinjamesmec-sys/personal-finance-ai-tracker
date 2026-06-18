from flask import Flask, request, jsonify
from flask_cors import CORS
from db import db

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return {"message": "Personal Finance AI Tracker Backend Running"}


@app.route("/register", methods=["POST"])
def register():
    data = request.json

    name = data["name"]
    email = data["email"]
    password = data["password"]

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
    cursor = db.cursor(dictionary=True)

    query = "SELECT * FROM income"

    cursor.execute(query)

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
    cursor = db.cursor(dictionary=True)

    query = "SELECT * FROM transactions"

    cursor.execute(query)

    expenses = cursor.fetchall()

    return jsonify(expenses)

@app.route("/budget", methods=["POST"])
def add_budget():
    data = request.json

    user_id = data["user_id"]
    category = data["category"]
    budget_amount = data["budget_amount"]

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
    cursor = db.cursor(dictionary=True)

    query = "SELECT * FROM budgets"

    cursor.execute(query)

    budgets = cursor.fetchall()

    return jsonify(budgets)

@app.route("/dashboard", methods=["GET"])
def dashboard():
    cursor = db.cursor(dictionary=True)

    # Total income
    cursor.execute("SELECT IFNULL(SUM(amount),0) AS total_income FROM income")
    total_income = cursor.fetchone()["total_income"]

    # Total expenses
    cursor.execute("SELECT IFNULL(SUM(amount),0) AS total_expenses FROM transactions")
    total_expenses = cursor.fetchone()["total_expenses"]

    savings = total_income - total_expenses

    return jsonify({
        "total_income": float(total_income),
        "total_expenses": float(total_expenses),
        "savings": float(savings)
    })


if __name__ == "__main__":
    app.run(debug=True)