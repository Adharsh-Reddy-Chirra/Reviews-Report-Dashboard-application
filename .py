from elasticsearch import Elasticsearch

# Connect to Elasticsearch
es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

def retrieve_sample_queries(index_name):
    # Define the search query
    query = {
        "query": {
            "match_all": {}  # Retrieve all documents
        }
    }

    try:
        # Execute the search query
        response = es.search(index=index_name, body=query)

        # Extract the sample queries from the response
        sample_queries = [hit["_source"] for hit in response["hits"]["hits"]]

        return sample_queries

    except Exception as e:
        print(f"An error occurred while retrieving sample queries: {e}")
        return []

# Specify the index name
index_name = "sample_queries"

# Retrieve the sample queries
sample_queries = retrieve_sample_queries(index_name)

# Print the retrieved sample queries
print("Retrieved Queries:")
for query in sample_queries:
    print(query)
