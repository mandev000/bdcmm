const axios = require("axios");

async function askClaude(messages) {
  const res = await axios.post(
    "https://api.agentrouter.ai/v1/chat/completions", // ✅ endpoint đúng
    {
      model: "claude-haiku-4-5-20251001", // hoặc opus
      messages: messages
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.CLAUDE_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data.choices[0].message.content;
}

module.exports = { askClaude };
