import { useState, useRef, useEffect } from "react";
import api from "../utils/api";
import "./Chatbot.css";

const quickReplies = [
  { label: "Delivery Info", value: "delivery" },
  { label: "Our Services", value: "services" },
  { label: "Track Order", value: "track order" },
  { label: "Plant Care Tips", value: "plant care" },
  { label: "Custom Bouquet", value: "custom bouquet" },
  { label: "Contact Us", value: "contact" },
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const getResponse = (message) => {
    const msg = message.toLowerCase();

    // Greetings
    if (msg.match(/^(hi|hello|hey|hola|salam|good morning|good evening|assalam)/)) {
      return "Hello! Welcome to La Fiore! I'm Lily, your virtual garden assistant. How can I help you today? You can ask me about our plants, delivery, services, or anything else!";
    }

    // Delivery & Shipping
    if (msg.includes("delivery") || msg.includes("ship") || msg.includes("deliver")) {
      return "We offer **free delivery** across the UAE on orders over AED 100! Standard delivery takes 2-3 business days. Need it sooner? Express delivery (next-day) is available for AED 25. All plants are carefully packaged to arrive fresh and healthy.";
    }

    // Hours & Location
    if (msg.includes("hour") || msg.includes("open") || msg.includes("time") || msg.includes("when")) {
      return "We're open **Saturday to Thursday, 9 AM - 9 PM** and **Friday, 12 PM - 9 PM**. You can also shop anytime at lafioregardens.vercel.app!";
    }

    // Contact
    if (msg.includes("contact") || msg.includes("phone") || msg.includes("email") || msg.includes("reach")) {
      return "You can reach us at:\n- Email: lafioregardens@gmail.com\n- Phone: +971 4 XXX XXXX\n- Instagram: @lafioregardens\n- Or visit us at lafioregardens.vercel.app\n\nWe typically respond within 1 hour during business hours!";
    }

    // Returns & Refunds
    if (msg.includes("return") || msg.includes("refund") || msg.includes("exchange")) {
      return "We offer a **7-day return policy** on all products. If your plant arrives damaged, send us a photo within 24 hours and we'll replace it for free! For bouquets, we offer a freshness guarantee — if it doesn't last at least 5 days, we'll send a replacement.";
    }

    // Custom Bouquet
    if (msg.includes("custom") || msg.includes("bouquet") || msg.includes("arrange")) {
      return "Yes! We love creating custom bouquets! You can design your own on our **Customize Bouquets** page. Choose your flowers, colors, and wrapping style. Perfect for weddings, birthdays, or just because! Would you like me to take you there?";
    }

    // Services & Consultation
    if (msg.includes("service") || msg.includes("consult") || msg.includes("wedding") || msg.includes("event")) {
      return "We offer three main services:\n\n1. **Event & Wedding Flowers** — Custom floral styling for your special day\n2. **Garden Planning & Care** — Personalized garden design and maintenance\n3. **Planterior Design** — Plant-focused interior styling\n\nBook a free consultation on our Services page!";
    }

    // Plant Care
    if (msg.includes("care") || msg.includes("water") || msg.includes("sunlight") || msg.includes("plant tip")) {
      return "Here are some general plant care tips:\n\n- **Watering**: Most indoor plants prefer soil to dry slightly between waterings\n- **Light**: Bright indirect light works for most houseplants\n- **Humidity**: Mist tropical plants regularly\n- **Fertilizer**: Feed monthly during spring and summer\n\nEach of our products comes with a detailed care guide! Visit any product page to see specific tips.";
    }

    // Track Order
    if (msg.includes("track") || msg.includes("order status") || msg.includes("where is my")) {
      return "To check your order status, go to your **Account page** after logging in. You'll find your order history and tracking details there. If you need help with a specific order, email us at lafioregardens@gmail.com with your order number!";
    }

    // Pricing
    if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("expensive")) {
      return "Our products range from **AED 25 for small plants** to **AED 500+ for premium arrangements**. We have options for every budget! Browse our shop to find something perfect. We also offer free delivery on orders over AED 100.";
    }

    // Payment
    if (msg.includes("pay") || msg.includes("visa") || msg.includes("card") || msg.includes("cash")) {
      return "We accept multiple payment methods:\n- Visa & Mastercard\n- American Express\n- Apple Pay & Google Pay\n- Cash on Delivery (COD)\n\nAll online payments are 100% secure!";
    }

    // Gift
    if (msg.includes("gift") || msg.includes("birthday") || msg.includes("anniversary") || msg.includes("surprise")) {
      return "Looking for the perfect gift? We have beautiful options!\n\n- **Bouquets** starting from AED 75\n- **Potted plants** that last forever\n- **Custom arrangements** for any occasion\n- **Birth Month Flowers** — a unique personalized touch!\n\nWe can add a gift card message too!";
    }

    // Birth Month Flowers
    if (msg.includes("birth") || msg.includes("month flower") || msg.includes("zodiac")) {
      return "Did you know each month has its own special flower? Check out our **Birth Month Flowers** page to discover yours! It's a beautiful and meaningful gift idea. Would you like me to take you there?";
    }

    // Plant Finder
    if (msg.includes("find") || msg.includes("recommend") || msg.includes("suggest") || msg.includes("which plant")) {
      return "Not sure which plant is right for you? Try our **Plant Finder** tool! Answer a few quick questions about your space, light, and experience level, and we'll recommend the perfect plants for you.";
    }

    // Thank you
    if (msg.includes("thank") || msg.includes("thanks") || msg.includes("helpful")) {
      return "You're welcome! We're always happy to help at La Fiore. If you need anything else, just ask! Happy planting!";
    }

    // Bye
    if (msg.match(/^(bye|goodbye|see you|take care)/)) {
      return "Goodbye! Thank you for visiting La Fiore. We hope to see you again soon! Happy planting!";
    }

    // Who are you
    if (msg.includes("who are you") || msg.includes("your name") || msg.includes("what are you")) {
      return "I'm **Lily**, La Fiore's virtual garden assistant! I can help you with product info, delivery questions, plant care tips, and more. Think of me as your friendly neighborhood plant expert!";
    }

    // Default
    return "I'd be happy to help! Here are some things I can assist with:\n\n- Delivery & shipping info\n- Plant care tips\n- Our services (weddings, gardens, interiors)\n- Custom bouquets\n- Payment options\n- Gift ideas\n\nOr feel free to ask me anything else! You can also visit us at lafioregardens.vercel.app";
  };

  const handleSend = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage) return;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await api.post("/chatbot/message", { message: userMessage });
      setMessages((prev) => [...prev, { role: "assistant", text: res.data.data.reply }]);
    } catch {
      const response = getResponse(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    }

    setLoading(false);
  };

  const formatMessage = (text) => {
    // Bold: **text**
    let formatted = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Newlines
    formatted = formatted.replace(/\n/g, "<br/>");
    return formatted;
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
        <svg width="44" height="44" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Petals */}
          <ellipse cx="16" cy="8" rx="4.5" ry="6.5" fill="white" opacity="0.92"/>
          <ellipse cx="23" cy="13" rx="4.5" ry="6.5" fill="white" opacity="0.87" transform="rotate(72 23 13)"/>
          <ellipse cx="21" cy="21.5" rx="4.5" ry="6.5" fill="white" opacity="0.82" transform="rotate(144 21 21.5)"/>
          <ellipse cx="11" cy="21.5" rx="4.5" ry="6.5" fill="white" opacity="0.82" transform="rotate(-144 11 21.5)"/>
          <ellipse cx="9" cy="13" rx="4.5" ry="6.5" fill="white" opacity="0.87" transform="rotate(-72 9 13)"/>
          {/* Center */}
          <circle cx="16" cy="15.5" r="4" fill="#f0d8a0"/>
          <circle cx="16" cy="15.5" r="2.2" fill="#d4b46a"/>
        </svg>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <h3>La Fiore</h3>
              <span className="chatbot-status">Online</span>
            </div>
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
                <div className="chatbot-welcome-icon">🌿</div>
                <h4>Welcome to La Fiore!</h4>
                <p>Hi there! I'm Lily, your virtual garden assistant. How can I help you today?</p>
                <div className="chatbot-quick-replies">
                  {quickReplies.map((qr) => (
                    <button
                      key={qr.value}
                      className="quick-reply-btn"
                      onClick={() => handleSend(qr.value)}
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-msg chatbot-msg--${msg.role}`}>
                {msg.role === "assistant" && <span className="chatbot-avatar">🌸</span>}
                <p dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg chatbot-msg--assistant">
                <span className="chatbot-avatar">🌸</span>
                <p className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-footer">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="chatbot-send-btn"
              onClick={() => handleSend()}
              disabled={loading}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;