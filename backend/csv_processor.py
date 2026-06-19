import csv
from categorizer import categorize_transaction


def process_csv(file_path):

    transactions = []

    with open(file_path, newline='', encoding='utf-8') as csvfile:

        reader = csv.DictReader(csvfile)

        for row in reader:

            transaction = {
                "transaction_date": row["Date"],
                "expense_name": row["Description"],
                "amount": float(row["Amount"].strip()),
                "category": categorize_transaction(
                    row["Description"]
                )
            }

            transactions.append(transaction)

    return transactions
