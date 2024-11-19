from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

# Load the mini dataset
mini_dataset_path = "C:\\Users\\adhar\\Downloads\\Final_Project_Phase_3(1)\\Mini_Dataset_Amazon_Appliances_Reviews.csv"
mini_df = pd.read_csv(mini_dataset_path)

# Drop rows with missing values in the 'reviewText' column
mini_df.dropna(subset=['reviewText'], inplace=True)

# Create TF-IDF vectors for reviews
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(mini_df['reviewText'])

# Calculate cosine similarity between reviews
cosine_similarities = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Get indices of top 3 most similar reviews for each review
similar_reviews_indices = [sorted(range(len(row)), key=lambda x: row[x], reverse=True)[1:4] for row in cosine_similarities]

# Store top 3 most similar reviews
similar_reviews = [[mini_df.iloc[idx]['reviewText'] for idx in indices] for indices in similar_reviews_indices]

# Print the top 3 most similar reviews
for idx, review_set in enumerate(similar_reviews, start=1):
    print(f"Similar Review {idx}:")
    for review in review_set:
        print(review[:100])  # Print only the first 100 characters of the review
    print()
