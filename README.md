# 📊 Amazon Reviews Report Dashboard  

An interactive **React + Material UI dashboard** for exploring and analyzing **Amazon Product Reviews**.  
The application leverages **ElasticSearch** to store and query reviews, enabling **fast, flexible, and powerful search capabilities**.  

## 🔍 Overview  
- Focused on **Amazon "Appliances" reviews** from datasets provided by the **Amazon Product Graph Project**.  
- Reviews are indexed in **ElasticSearch** for high-performance querying.  
- The dashboard provides **3 specialized tabs** for different query needs:  
  1. **Quantitative Search** – Numerical filtering and analysis (ratings, review counts).  
  2. **Exact or Fuzzy Search** – Keyword-based review/product search with support for approximate matching.  
  3. **Hybrid Search** – Combines multiple criteria for advanced review exploration.  

## ✨ Features  

### 🎨 React + Material UI Dashboard  
- Clean, responsive, and user-friendly UI.  
- Tabbed interface for switching between query modes.  

### ⚡ ElasticSearch Integration  
- All reviews stored in **ElasticSearch** indices.  
- Enables quick filtering, keyword matching, and hybrid searches.  

### 📑 Query Tabs  
1. **Quantitative Search**  
   - Filter reviews by numerical attributes (e.g., rating ≥ 4, minimum review count).  
   - Generate summary insights.  

2. **Exact or Fuzzy Search**  
   - Search reviews by **keywords**.  
   - Supports **fuzzy search** (approximate matches for misspelled or similar terms).  

3. **Hybrid Search**  
   - Combine keyword, fuzzy, and numerical filters.  
   - Ideal for advanced exploratory queries.  

## 🛠 Tech Stack  
- **Frontend:** React, Material UI  
- **Backend / Search Engine:** ElasticSearch  
- **Dataset:** Amazon Product Graph – *Appliances Reviews*  
