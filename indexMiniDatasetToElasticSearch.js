// Import necessary modules
const fs = require('fs');
const csv = require('csv-parser');

const { Client } = require('@elastic/elasticsearch');
const { OpenAI } = require('openai');

// Initialize OpenAI and Elasticsearch clients with API key
const openai = new OpenAI({ apiKey: 'API_KEY' });
const esClient = new Client({ node: 'http://localhost:9200' });

// Function to read the dataset from CSV
async function readDataset(csvFilePath) {
    return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                console.log('Parsed row:', row);
                data.push(row);
            })
            .on('end', () => {
                console.log('Finished reading CSV file.');
                resolve(data);
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                reject(error);
            });
    });
}

// Function to generate embeddings using OpenAI API
async function generateEmbeddings(text) {
    try {
        const response = await openai.embed(text);
        return response.data.embeddings[0];
    } catch (error) {
        console.error('Error generating embeddings:', error);
        return null;
    }
}

// Function to index data into Elasticsearch
async function indexData(indexName, data) {
    try {
        console.log(`Indexing ${data.length} documents:`);
        for (const doc of data) {
            console.log(JSON.stringify(doc));
            try {
                await esClient.index({
                    index: indexName.toLowerCase(),
                    body: doc
                });
                console.log(`Indexed document successfully: ${JSON.stringify(doc)}`);
            } catch (error) {
                console.error(`Error indexing document: ${JSON.stringify(doc)} - ${error}`);
            }
        }
        console.log(`Indexed ${data.length} documents successfully.`);
    } catch (error) {
        console.error('Error indexing data:', error);
    }
}

// Main function
async function main() {
    try {
        // Read dataset
        const dataset = await readDataset('C:/Users/adhar/Downloads/Final_Project_Phase_3(1)/Mini_Dataset_Amazon_Appliances_Reviews.csv');

        // Generate embeddings for each review
        const embeddings = await Promise.all(dataset.map(generateEmbeddings));

        // Combine reviews with their embeddings
        const indexedData = dataset.map((review, index) => ({ review, embedding: embeddings[index] }));

        // Index data into Elasticsearch
        await indexData('Mini_Dataset_Amazon_Product_Reviews', indexedData);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Call the main function
main();
