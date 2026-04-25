const axios = require("axios");

async function askClaude(messages) {
    try {
        const res = await axios.post(
            "https://api.anthropic.com/v1/messages",
            {
                model: "claude-3-sonnet-20240229",
                max_tokens: 1000,
                messages: messages.map(m => ({
                    role: m.role,
                    content: m.content
                }))
            },
            {
                headers: {
                    "x-api-key": process.env.CLAUDE_API_KEY,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json"
                }
            }
        );

        return res.data.content[0].text;
    } catch (err) {
        console.error("Claude API Error:", err.response?.data || err.message);
        throw new Error("Claude API failed");
    }
}

module.exports = { askClaude };