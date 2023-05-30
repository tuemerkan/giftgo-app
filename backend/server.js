const express = require('express');
const app = express();
const port = 4000; // or another port if you prefer
const MongoClient = require('mongodb').MongoClient;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.post('/register', (req, res) => {
    // your registration handling code here
});

MongoClient.connect('mongodb+srv://tuemerkan:giftgoapp@cluster0.dotlzvn.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('yourDatabaseName');
        // your database handling code here
    })
    .catch(error => console.error(error));

