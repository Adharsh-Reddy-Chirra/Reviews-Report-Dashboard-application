from elasticsearch import Elasticsearch
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import html

# Connect to Elasticsearch
es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

# Define the list of years and product categories
years = [2011, 2012, 2013, 2014]
product_categories = ['Refrigerator Parts & Accessories', 'Humidifier Parts & Accessories', 'Range Parts & Accessories', 'Dishwasher Parts & Accessories']

# Function to calculate cosine similarity
def calculate_similarity(embedding1, embedding2):
    return cosine_similarity([embedding1], [embedding2])[0][0]

# Iterate over years and product categories
for year in years:
    print(f"Year: {year}")
    for category in product_categories:
        print(f"Category: {category}")
        
        # Define Elasticsearch query to retrieve embeddings and review texts for the specified year and category
        query = {
            "query": {
                "bool": {
                    "must": [
                        {"match": {"reviewTime": str(year)}},  # Match the year
                        {"match": {"summary": category}}       # Match the product category in the summary field
                    ]
                }
            }
        }
        
        try:
            # Execute Elasticsearch query
            response = es.search(index="mini_dataset_amazon_product_reviews", body=query, size=10)
            
            # Extract unique review texts from the response and decode HTML entities
            unique_review_texts = list(set([html.unescape(hit["_source"]["reviewText"]) for hit in response["hits"]["hits"]]))
            
            # Check if review texts are empty
            if not unique_review_texts:
                print("No reviews found for this query.")
                continue
            
            # Display the top 3 most similar reviews
            for idx, review_text in enumerate(unique_review_texts[:4]):
             print(f"Review {idx + 1}: {review_text}")
             print()

            
        except Exception as e:
            print(f"An error occurred: {e}")
