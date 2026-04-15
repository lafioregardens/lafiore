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

const menuLinks = {
  shop: { label: "Visit Shop", url: "/shop" },
  services: { label: "Our Services", url: "/services" },
  bouquet: { label: "Custom Bouquets", url: "/customize-bouquet" },
  birthMonth: { label: "Birth Month Flowers", url: "/birth-month-flowers" },
  plantFinder: { label: "Plant Finder", url: "/plant-finder" },
  account: { label: "My Account", url: "/account" },
  consultation: { label: "Book Consultation", url: "/consultation" },
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastMenus, setLastMenus] = useState([]);
  const messagesEndRef = useRef(null);

  // Detect if input is gibberish or unclear
  const isGibberish = (message) => {
    const msg = message.trim().toLowerCase();

    // Too short
    if (msg.length < 2) return true;

    // Only special characters or numbers
    if (!/[a-z]/i.test(msg)) return true;

    // Random keyboard mashing (same key repeated)
    if (/(.)\1{4,}/.test(msg)) return true;

    // Too many spaces or symbols
    if (msg.split(" ").filter(w => w.length === 0).length > msg.split(" ").length / 2) return true;

    // Random letter sequences without vowels (keyboard mashing like vbncxjm)
    const words = msg.split(/\s+/);
    for (let word of words) {
      if (word.length > 3) {
        // Check if word is mostly consonants without vowels (gibberish)
        const vowels = (word.match(/[aeiou]/g) || []).length;
        if (vowels === 0) return true; // No vowels = likely gibberish
      }
    }

    return false;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-reset to welcome after goodbye message
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant" && lastMessage.text.includes("Thank you for chatting")) {
        // Wait 2 seconds then reset to welcome screen
        const timer = setTimeout(() => {
          setMessages([]);
          setLastMenus([]);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [messages]);

  const getResponse = (message) => {
    const msg = message.toLowerCase();

    // Smart navigation - detect which page user is asking for
    if (msg.includes("take me") || msg.includes("link to") || msg.includes("show me") || msg.includes("go to") || msg.includes("navigate")) {
      // Detect specific pages
      if (msg.includes("shop") || msg.includes("products") || msg.includes("buy") || msg.includes("browse")) {
        setLastMenus(["shop"]);
        return "Let me take you to our shop! 🛍️";
      } else if (msg.includes("plant finder") || msg.includes("recommend") || msg.includes("find plant")) {
        setLastMenus(["plantFinder"]);
        return "Let's find the perfect plant for you! 🌱";
      } else if (msg.includes("service") || msg.includes("wedding") || msg.includes("garden") || msg.includes("design")) {
        setLastMenus(["services"]);
        return "Check out our amazing services! 🏡";
      } else if (msg.includes("custom") || msg.includes("bouquet") || msg.includes("arrange")) {
        setLastMenus(["bouquet"]);
        return "Let's create a beautiful custom bouquet! 💐";
      } else if (msg.includes("birth") || msg.includes("month flower") || msg.includes("zodiac")) {
        setLastMenus(["birthMonth"]);
        return "Discover your birth month flower! 🌸";
      } else if (msg.includes("account") || msg.includes("order") || msg.includes("track")) {
        setLastMenus(["account"]);
        return "Let me take you to your account! 👤";
      } else if (msg.includes("consult") || msg.includes("booking")) {
        setLastMenus(["consultation"]);
        return "Book a consultation with us! 📞";
      } else {
        // Generic page request without specific page mentioned
        setLastMenus(["shop", "plantFinder", "services", "bouquet", "birthMonth"]);
        return "I'd be happy to take you there! Which page would you like to visit?";
      }
    }

    // Check for gibberish/unclear input
    if (isGibberish(message)) {
      setLastMenus(["shop", "plantFinder", "services", "bouquet", "contact"]);
      return "Sorry, unable to understand that! 😊 Could you please ask a clear question? I'm here to help with:\n\n- Delivery & shipping info\n- Plant care tips\n- Our services\n- Custom bouquets\n- And much more!\n\nFeel free to browse our pages or ask me anything!";
    }

    // Greetings
    if (msg.match(/^(hi|hello|hey|hola|salam|good morning|good evening|assalam)/)) {
      setLastMenus(["shop", "plantFinder", "services", "bouquet"]);
      return "Hello! Welcome to La Fiore! I'm Lily, your virtual garden assistant. 🌿 How can I help you today?";
    }

    // Delivery & Shipping
    if (msg.includes("delivery") || msg.includes("ship") || msg.includes("deliver")) {
      setLastMenus(["shop"]);
      return "We offer **free delivery** across the UAE on orders over AED 100! 🚚\n\n**Standard:** 2-3 business days\n**Express:** Next-day delivery for AED 25\n\nAll plants are carefully packaged to arrive fresh and healthy. Ready to shop?";
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
      setLastMenus(["bouquet"]);
      return "Yes! We love creating custom bouquets! 💐\n\nYou can design your own and choose:\n- Your favorite flowers\n- Colors & style\n- Wrapping options\n\nPerfect for weddings, birthdays, anniversaries, or just because! Ready to create?";
    }

    // Specific service explanations
    if (msg.includes("planterior") || msg.includes("interior") || msg.includes("interior styling")) {
      setLastMenus(["services", "consultation"]);
      return "🏡 **Planterior Design** is our plant-focused interior styling service!\n\nWe transform your living and working spaces with:\n- Expert plant selection for your décor\n- Strategic placement for maximum impact\n- Style recommendations that match your aesthetic\n- Maintenance tips to keep plants thriving\n\nPerfect for homes, offices, restaurants, and retail spaces. Create a green, living atmosphere!";
    }

    if (msg.includes("garden") && (msg.includes("plan") || msg.includes("care"))) {
      setLastMenus(["services", "consultation"]);
      return "🌳 **Garden Planning & Care** is our personalized garden design and maintenance service!\n\nWe help with:\n- Custom garden design tailored to your space\n- Plant selection for climate & conditions\n- Seasonal planting guidance\n- Ongoing maintenance & care\n- Landscape transformation\n\nWhether it's a small balcony or a sprawling yard, we create beautiful gardens!";
    }

    if (msg.includes("wedding") || msg.includes("event") || (msg.includes("flower") && msg.includes("event"))) {
      setLastMenus(["services", "consultation"]);
      return "✨ **Event & Wedding Flowers** is our custom floral styling service!\n\nWe create stunning arrangements for:\n- Weddings & ceremonies\n- Corporate events\n- Celebrations & parties\n- Proposals & special moments\n- Decor installations\n\nOur team designs custom floral experiences that match your vision perfectly. From intimate gatherings to grand celebrations!";
    }

    // Services & Consultation
    if (msg.includes("service") || msg.includes("consult")) {
      setLastMenus(["services", "consultation"]);
      return "We offer three amazing services:\n\n✨ **Event & Wedding Flowers** — Custom floral styling for your special day\n🌳 **Garden Planning & Care** — Personalized garden design & maintenance\n🏡 **Planterior Design** — Plant-focused interior styling\n\nBook a free consultation to discuss your vision!";
    }

    // Plant Care
    if (msg.includes("care") || msg.includes("water") || msg.includes("sunlight") || msg.includes("plant tip")) {
      setLastMenus(["plantFinder", "shop"]);
      return "Great question! Here are some general plant care tips:\n\n💧 **Watering:** Most plants prefer soil to dry slightly between waterings\n☀️ **Light:** Bright indirect light works for most houseplants\n💨 **Humidity:** Mist tropical plants regularly\n🌱 **Fertilizer:** Feed monthly in spring/summer\n\nEach product comes with a detailed care guide! Want personalized recommendations?";
    }

    // Track Order
    if (msg.includes("track") || msg.includes("order status") || msg.includes("where is my")) {
      setLastMenus(["account"]);
      return "To check your order status, go to your **Account page** after logging in! 📦\n\nYou'll find:\n- Order history\n- Tracking details\n- Delivery updates\n\nNeed help? Email us at lafioregardens@gmail.com with your order number!";
    }

    // Pricing
    if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("expensive")) {
      setLastMenus(["shop"]);
      return "Great news! We have options for every budget! 💚\n\n💰 **Small plants:** AED 25+\n💐 **Bouquets:** AED 75-300\n🌳 **Large arrangements:** AED 300-500+\n\n✨ **BONUS:** Free delivery on orders over AED 100!\n\nLet's find something perfect for you!";
    }

    // Payment
    if (msg.includes("pay") || msg.includes("visa") || msg.includes("card") || msg.includes("cash")) {
      return "We accept multiple payment methods:\n- Visa & Mastercard\n- American Express\n- Apple Pay & Google Pay\n- Cash on Delivery (COD)\n\nAll online payments are 100% secure!";
    }

    // Gift
    if (msg.includes("gift") || msg.includes("birthday") || msg.includes("anniversary") || msg.includes("surprise")) {
      setLastMenus(["bouquet", "birthMonth", "shop"]);
      return "Perfect! We have amazing gift options! 🎁\n\n🌹 **Bouquets** starting from AED 75\n🪴 **Potted plants** that last forever\n💐 **Custom arrangements** for any occasion\n🌸 **Birth Month Flowers** — unique & personalized!\n\n✨ We add gift card messages too! What's the occasion?";
    }

    // Birth Month Flowers
    if (msg.includes("birth") || msg.includes("month flower") || msg.includes("zodiac")) {
      setLastMenus(["birthMonth", "shop"]);
      return "Did you know each month has its own special flower? 🌺\n\nOur **Birth Month Flowers** collection features:\n- Unique flowers for every month\n- Meaningful & personal gifts\n- Perfect for any celebration\n\nDiscover your birth flower and find the perfect gift!";
    }

    // Plant Finder
    if (msg.includes("find") || msg.includes("recommend") || msg.includes("suggest") || msg.includes("which plant")) {
      setLastMenus(["plantFinder", "shop"]);
      return "Not sure which plant is right for you? 🤔\n\nOur **Plant Finder** tool helps you discover the perfect match!\n\nJust answer a few quick questions about:\n- Your space & light\n- Your experience level\n- Your style preferences\n\nWe'll recommend plants perfectly suited to you!";
    }

    // Thank you
    if (msg.includes("thank") || msg.includes("thanks") || msg.includes("helpful")) {
      return "You're welcome! We're always happy to help at La Fiore. If you need anything else, just ask! Happy planting!";
    }

    // Bye / End conversation
    if (msg.match(/^(bye|goodbye|see you|take care|thanks|thank you|that's all)/)) {
      setLastMenus([]);
      // Return a response that will show end of convo message
      return "Thank you for chatting with Lily! 💚 We hope we could help. Have a wonderful day and happy planting! Type 'mainpage' or 'main' anytime to restart the conversation.";
    }

    // Who are you
    if (msg.includes("who are you") || msg.includes("your name") || msg.includes("what are you")) {
      return "I'm **Lily**, La Fiore's virtual garden assistant! I can help you with product info, delivery questions, plant care tips, and more. Think of me as your friendly neighborhood plant expert!";
    }

    // Default
    setLastMenus(["shop", "plantFinder", "services", "bouquet", "birthMonth"]);
    return "I'd be happy to help! 😊 Here's what I can assist with:\n\n🚚 Delivery & shipping info\n🌱 Plant care tips\n💐 Custom bouquets & gifts\n🏡 Our services (weddings, gardens, design)\n💳 Payment options\n🎁 Gift recommendations\n\nOr feel free to ask me anything! Ready to explore?";
  };

  const handleSend = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage) return;
    setInput("");

    // Check if user wants to go to main page
    const msg = userMessage.toLowerCase();
    if (msg.includes("main page") || msg.includes("mainpage") || msg.includes("home") || msg.match(/^(main|home|reset|restart)/)) {
      setMessages([]);
      setLastMenus([]);
      return;
    }

    // Check for gibberish FIRST - client-side validation
    if (isGibberish(userMessage)) {
      setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
      setLastMenus(["shop", "plantFinder", "services", "bouquet", "contact"]);
      setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, unable to understand that! 😊 Could you please ask a clear question? I'm here to help with:\n\n- Delivery & shipping info\n- Plant care tips\n- Our services\n- Custom bouquets\n- And much more!\n\nFeel free to browse our pages or ask me anything!" }]);
      return;
    }

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
              <div key={idx}>
                <div className={`chatbot-msg chatbot-msg--${msg.role}`}>
                  {msg.role === "assistant" && <span className="chatbot-avatar">🌸</span>}
                  <p dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                </div>
                {msg.role === "assistant" && idx === messages.length - 1 && lastMenus.length > 0 && (
                  <div className="chatbot-menu-buttons">
                    {lastMenus.map((menuKey) => (
                      <a
                        key={menuKey}
                        href={menuLinks[menuKey].url}
                        className="chatbot-menu-link"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = menuLinks[menuKey].url;
                        }}
                      >
                        {menuLinks[menuKey].label}
                      </a>
                    ))}
                  </div>
                )}
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