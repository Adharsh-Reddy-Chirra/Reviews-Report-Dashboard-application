from elasticsearch import Elasticsearch

# Connect to Elasticsearch
es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

# Index creation settings and mappings
index_settings = {
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "category": {"type": "keyword"},
            "query": {"type": "text"}
        }
    }
}

# Create index
index_name = "sample_queries"
try:
    es.indices.create(index=index_name, body=index_settings)
    print(f"Index '{index_name}' created successfully.")
except Exception as e:
    print(f"Failed to create index '{index_name}': {e}")

# Sample queries data for each category
sample_queries_data = [
    {"category": "Quantitative Queries", "query": "How many products are there in every product subcategory?"},
    {"category": "Quantitative Queries", "query": "How many reviews for every product subcategory?"},
    {"category": "Quantitative Queries", "query": "What is the average size (characters/words) of the review text/body?"},
    {"category": "Quantitative Queries", "query": "How many reviews submitted every January for years: 2011, 2012, 2013, 2014?"},
    {"category": "Fuzzy/Exact-Search Queries", "query": "Look for items that have the word 'dishwasher' in them"},
    {"category": "Fuzzy/Exact-Search Queries", "query": "Look for product subcategories that are comparable to 'kitchen appliances'"},
    {"category": "Fuzzy/Exact-Search Queries", "query": "Get reviews that have ratings close to 'five stars'"},
    {"category": "Fuzzy/Exact-Search Queries", "query": "Search for reviewers whose names correspond to 'John Smith'"},
    {"category": "Fuzzy/Exact-Search Queries", "query": "Look for evaluations that reference 'overheating issues'"},
    {"category": "Fuzzy/Exact-Search Queries", "query": "Look for goods whose names begin with 'Samsung'"},
    {"category": "Fuzzy/Exact-Search Queries", "query": "Look up reviews using 'defective' and 'refund' keywords"},
    {"category": "Hybrid-Search Queries", "query": "Look for goods that have received great feedback and ratings"},
    {"category": "Hybrid-Search Queries", "query": "Look for evaluations that address both 'durability' and 'performance'"},
    {"category": "Hybrid-Search Queries", "query": "Find items with reviews mentioning 'value' and average ratings higher than 4"},
    {"category": "Hybrid-Search Queries", "query": "Track down reviewers who give high ratings in a variety of areas on a regular basis"},
    {"category": "Hybrid-Search Queries", "query": "Look for items with good ratings but conflicting feedback that lists advantages and disadvantages"},
    {"category": "Hybrid-Search Queries", "query": "Look for reviews in several product categories that express similar opinions"},
    {"category": "Hybrid-Search Queries", "query": "Determine which items have had erratic sales trends in the last 12 months"}
]

# Index sample queries data
try:
    for query_data in sample_queries_data:
        es.index(index=index_name, body=query_data)
    print("Sample queries data indexed successfully.")
except Exception as e:
    print(f"Failed to index sample queries data: {e}")
