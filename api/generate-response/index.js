const axios = require('axios');

module.exports = async function (context, req) {
    const userInput = req.body?.input || '';
    const apiKey = process.env.OPENAI_API_KEY; // 環境変数としてAPIキーを使用

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: userInput,
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
                response: response.data.choices[0].text
            }
        };
    } catch (error) {
        context.log('Error calling OpenAI:', error);
        context.res = {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
};
