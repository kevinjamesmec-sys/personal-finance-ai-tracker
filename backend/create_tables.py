from db import db

cursor = db.cursor()

# Users table
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
)
""")
# Income table
cursor.execute("""
CREATE TABLE IF NOT EXISTS income (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(id)
)
""")
# Transactions table
cursor.execute("""
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    expense_name VARCHAR(100),
    amount DECIMAL(10,2),
    category VARCHAR(50),
    transaction_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
""")
# Budgets table
cursor.execute("""
CREATE TABLE IF NOT EXISTS budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    category VARCHAR(50),
    budget_amount DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(id)
)
""")
db.commit()

print("Users table created successfully!")