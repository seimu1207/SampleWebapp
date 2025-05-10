const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generate-response', async (req, res) => {
    const userInput = req.body.input;
    const apiKey = 'Bw9Adj1EJpEWJDW78yamz4sVah1QqNAyMAVKJYGS5iRYJfho4iKdJQQJ99BEACfhMk5XJ3w3AAABACOG16HL';

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: userInput,
                   }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ response: response.data.choices[0].text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error generating response' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
