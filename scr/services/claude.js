const axios = require("axios");

async function askClaude(messages) {
  try {
    const res = await axios.post(
      "https://api.agentrouter.ai/v1/chat/completions",
      {
        model: "claude-haiku-4-5-20251001", // đổi opus nếu muốn
        messages: messages.map(m => ({
          role: m.role,
          content: m.content
        }))
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLAUDE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("API RESPONSE:", res.data); // 👈 debug

    return res.data.choices?.[0]?.message?.content || "Không có phản hồi";
  } catch (err) {
    console.error("❌ Claude ERROR:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { askClaude };
