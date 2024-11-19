// Function to index data into ElasticSearch
async function indexData(indexName, data) {
    try {
        // Create index if it doesn't exist
        await createIndexIfNotExists(indexName);

        const chunkSize = 1000; // Adjust this value based on your data size and Elasticsearch settings
        const totalChunks = Math.ceil(data.length / chunkSize);

        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = (i + 1) * chunkSize;
            const chunk = data.slice(start, end);

            const bulkBody = [];
            chunk.forEach(item => {
                bulkBody.push({ index: { _index: indexName.toLowerCase() } }); // Use lowercase index name
                bulkBody.push(item);
            });

            console.log(`Sending bulk request for chunk ${i + 1} of ${totalChunks}:`);
            console.log(bulkBody);

            const { body, statusCode } = await esClient.bulk({ refresh: true, body: bulkBody });

            console.log('Response from Elasticsearch:');
            console.log(body); // Log the response from Elasticsearch

            if (statusCode !== 200) {
                console.error('Failed to index documents. Status code:', statusCode);
                return;
            }

            if (body && body.errors) {
                console.error('Failed to index some documents:', body.errors);
            } else if (!body) {
                console.error('Error: Bulk response is undefined.');
            } else {
                console.log(`Indexed chunk ${i + 1} of ${totalChunks} successfully.`);
            }
        }
    } catch (error) {
        console.error('Error indexing data:', error);
    }
}
