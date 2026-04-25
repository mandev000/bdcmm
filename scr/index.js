require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { askClaude } = require("./services/claude");
const { getHistory, addMessage } = require("./utils/memory");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const cooldown = new Set();

client.once("ready", () => {
    console.log(`✅ Bot online: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (!message.content.startsWith("!ai")) return;

    // anti spam 5s
    if (cooldown.has(message.author.id)) {
        return message.reply("⏳ Đợi 5 giây rồi hỏi tiếp!");
    }

    cooldown.add(message.author.id);
    setTimeout(() => cooldown.delete(message.author.id), 5000);

    const prompt = message.content.replace("!ai", "").trim();
    if (!prompt) {
        return message.reply("❗ Nhập câu hỏi đi bro");
    }

    const history = getHistory(message.author.id);
    history.push({ role: "user", content: prompt });

    try {
        const reply = await askClaude(history);

        addMessage(message.author.id, "assistant", reply);

        message.reply(reply.slice(0, 2000));
    } catch (error) {
        message.reply("❌ Lỗi khi gọi Claude");
    }
});

client.login(process.env.DISCORD_TOKEN);