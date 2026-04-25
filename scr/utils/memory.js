const memory = new Map();

function getHistory(userId) {
    if (!memory.has(userId)) {
        memory.set(userId, []);
    }
    return memory.get(userId);
}

function addMessage(userId, role, content) {
    const history = getHistory(userId);
    history.push({ role, content });

    // giữ tối đa 10 message
    if (history.length > 10) history.shift();
}

module.exports = { getHistory, addMessage };