import { useState } from "react";
import api from "../utils/api";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // FAQ responses for offline mode
  const getOfflineResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("delivery") || lowerMsg.includes("ship")) {
      return "We offer free delivery on orders over AED 100. Standard delivery takes 2-3 business days. Express delivery is available for urgent orders.";
    }
    if (lowerMsg.includes("hour") || lowerMsg.includes("open")) {
      return "We're open 9am-9pm, Saturday to Thursday. Friday hours are 12pm-9pm.";
    }
    if (lowerMsg.includes("contact") || lowerMsg.includes("phone")) {
      return "You can reach us at hello@lafiore.ae or call +971 4 XXX XXXX. We're happy to help!";
    }
    if (lowerMsg.includes("return") || lowerMsg.includes("refund")) {
      return "We offer 7-day returns on all orders. The bouquet must be unused and in original condition.";
    }
    if (lowerMsg.includes("custom") || lowerMsg.includes("bouquet")) {
      return "Yes! We offer custom bouquet design. Visit our 'Customize Bouquets' page to create your own arrangement.";
    }

    return "I'll connect you with our team shortly. You can also reach us at hello@lafiore.ae. How else can I help?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      // Try backend first
      const res = await api.post("/chatbot/message", { message: userMessage });
      setMessages((prev) => [...prev, { role: "assistant", text: res.data.data.reply }]);
    } catch (err) {
      // Fallback to offline responses
      const offlineResponse = getOfflineResponse(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", text: offlineResponse }]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Bubble */}
      <button
        className="chatbot-bubble"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
        title="Chat with La Fiore"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Chat bubble shape */}
          <path d="M2 14C2 7.92487 7.92487 2 14 2C20.0751 2 26 7.92487 26 14C26 20.0751 20.0751 26 14 26C11.2464 26 8.68131 25.2702 6.57368 23.9995L2.66667 25.3333L4.00052 21.4263C2.72976 19.3187 2 16.7536 2 14Z" fill="white" stroke="currentColor" strokeWidth="0.5"/>

          {/* Flower in center - stylized petals */}
          <circle cx="14" cy="13" r="2.5" fill="currentColor"/>
          <circle cx="14" cy="8.5" r="1.8" fill="currentColor" opacity="0.8"/>
          <circle cx="18.5" cy="10.5" r="1.8" fill="currentColor" opacity="0.8"/>
          <circle cx="19" cy="15.5" r="1.8" fill="currentColor" opacity="0.8"/>
          <circle cx="15.5" cy="18.5" r="1.8" fill="currentColor" opacity="0.8"/>
          <circle cx="9.5" cy="18.5" r="1.8" fill="currentColor" opacity="0.8"/>
          <circle cx="8.5" cy="10.5" r="1.8" fill="currentColor" opacity="0.8"/>
        </svg>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <h3>La Fiore Support</h3>
            <button
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="chatbot-welcome">
                <p>👋 Hello! How can we help you today?</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-msg chatbot-msg--${msg.role}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg chatbot-msg--assistant">
                <p className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </p>
              </div>
            )}
          </div>

          <div className="chatbot-footer">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="chatbot-send-btn"
              onClick={handleSend}
              disabled={loading}
              aria-label="Send message"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
