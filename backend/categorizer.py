CATEGORY_KEYWORDS = {
    "Food": [
        "swiggy",
        "zomato",
        "restaurant",
        "cafe"
    ],

    "Transport": [
        "uber",
        "ola",
        "metro",
        "bus"
    ],

    "Shopping": [
        "amazon",
        "flipkart",
        "myntra"
    ],

    "Entertainment": [
        "netflix",
        "spotify",
        "prime"
    ],

    "Utilities": [
        "electricity",
        "water",
        "internet"
    ]
}


def categorize_transaction(description):

    description = description.lower()

    for category, keywords in CATEGORY_KEYWORDS.items():

        for keyword in keywords:

            if keyword in description:
                return category

    return "Other"