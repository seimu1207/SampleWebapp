const axios = require('axios');

module.exports = async function (context, req) {
    const userInput = req.body?.input || '';
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',  // または 'gpt-4'
                messages: [
                    { role: 'user', content: userInput }
                ],
                max_tokens: 100
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        context.res = {
            status: 200,
            body: {
                response: response.data.choices[0].message.content
            }
        };
    } catch (error) {
        context.log('Error calling OpenAI:', error.response?.data || error.message);
        context.res = {
            status: 500,
            body: {
                error: 'Internal Server Error',
                details: error.response?.data || error.message
            }
        };
    }
};
