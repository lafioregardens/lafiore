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
  bouquet: { label: "Custom Bouquets", url: "/customize" },
  birthMonth: { label: "Birth Month Flowers", url: "/birth-month" },
  plantFinder: { label: "Plant Finder", url: "/plantfinder" },
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

    // Check each word for gibberish patterns
    const words = msg.split(/\s+/);
    for (let word of words) {
      if (word.length > 2) {
        // No vowels at all
        const vowels = (word.match(/[aeiou]/g) || []).length;
        if (vowels === 0) return true;

        // Too many consonants in a row (more than 3 consecutive)
        if (/[bcdfghjklmnpqrstvwxyz]{4,}/.test(word)) return true;

        // Keyboard mashing patterns (qwerty, asdf, zxcv, etc.)
        if (/^[qwerty]+$|^[asdfgh]+$|^[zxcvbn]+$/.test(word)) return true;

        // Random consonant-heavy patterns (less than 20% vowels)
        if (word.length > 3) {
          const vowelRatio = vowels / word.length;
          if (vowelRatio < 0.15) return true; // Less than 15% vowels = likely gibberish
        }

        // Check for unnatural letter combinations (3+ consonants with no vowel between)
        if (/[bcdfghjklmnpqrstvwxyz]{3,}/.test(word.replace(/[aeiou]/g, ' '))) return true;
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
    const msg = message.toLowerCase().trim();

    // Home/Main menu command
    if (msg === "home" || msg === "main menu" || msg === "mainpage") {
      setMessages([]);
      setLastMenus([]);
      return;
    }

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
        setLastMenus(["consultation"]);
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
        setLastMenus(["shop", "plantFinder", "bouquet", "birthMonth", "consultation"]);
        return "I'd be happy to take you there! Which page would you like to visit?";
      }
    }

    // Check for gibberish/unclear input
    if (isGibberish(message)) {
      return "Sorry, can't understand that! 😊\n\nType **HOME** to go back to main menu!";
    }

    // Greetings
    if (msg.match(/^(hi|hello|hey|hola|salam|good morning|good evening|assalam)/)) {
      setLastMenus(["shop", "plantFinder", "bouquet", "consultation"]);
      const greetings = [
        "Hello! Welcome to La Fiore! I'm Lily, your virtual garden assistant. 🌿 How can I help you today?",
        "Hey there! 👋 Welcome to La Fiore! Looking for plants, gifts, or design services? I'm here to help!",
        "Welcome! 🌸 I'm Lily from La Fiore. Whether you're shopping, getting plant care tips, or planning something special, I've got you covered!"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Delivery & Shipping
    if (msg.includes("delivery") || msg.includes("ship") || msg.includes("deliver") || msg.includes("how long")) {
      setLastMenus(["shop"]);
      const responses = [
        "Great question! 🚚 We offer **free delivery** across the UAE on orders over AED 100!\n\n⏱️ **Standard:** 2-3 business days\n⚡ **Express:** Next-day delivery for AED 25\n\nEverything is carefully packaged to arrive fresh and happy. When are you looking to order?",
        "We've got you covered with delivery! 📦\n\n✨ **Orders over AED 100:** FREE delivery\n🚀 **Next-day express:** Just AED 25\n📍 **Service area:** All across UAE\n\nReady to find something perfect?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
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
      setLastMenus(["consultation"]);
      return "🏡 **Planterior Design** is our plant-focused interior styling service!\n\nWe transform your living and working spaces with:\n- Expert plant selection for your décor\n- Strategic placement for maximum impact\n- Style recommendations that match your aesthetic\n- Maintenance tips to keep plants thriving\n\nPerfect for homes, offices, restaurants, and retail spaces. Create a green, living atmosphere!";
    }

    if (msg.includes("garden") && (msg.includes("plan") || msg.includes("care"))) {
      setLastMenus(["consultation"]);
      return "🌳 **Garden Planning & Care** is our personalized garden design and maintenance service!\n\nWe help with:\n- Custom garden design tailored to your space\n- Plant selection for climate & conditions\n- Seasonal planting guidance\n- Ongoing maintenance & care\n- Landscape transformation\n\nWhether it's a small balcony or a sprawling yard, we create beautiful gardens!";
    }

    if (msg.includes("wedding") || msg.includes("event") || (msg.includes("flower") && msg.includes("event"))) {
      setLastMenus(["consultation"]);
      return "✨ **Event & Wedding Flowers** is our custom floral styling service!\n\nWe create stunning arrangements for:\n- Weddings & ceremonies\n- Corporate events\n- Celebrations & parties\n- Proposals & special moments\n- Decor installations\n\nOur team designs custom floral experiences that match your vision perfectly. From intimate gatherings to grand celebrations!";
    }

    // Services & Consultation
    if (msg.includes("service") || msg.includes("consult")) {
      setLastMenus(["consultation"]);
      return "We offer three amazing services:\n\n✨ **Event & Wedding Flowers** — Custom floral styling for your special day\n🌳 **Garden Planning & Care** — Personalized garden design & maintenance\n🏡 **Planterior Design** — Plant-focused interior styling\n\nBook a free consultation to discuss your vision!";
    }

    // Plant Care
    if (msg.includes("care") || msg.includes("water") || msg.includes("sunlight") || msg.includes("plant tip") || msg.includes("dying") || msg.includes("wilting") || msg.includes("brown leaves")) {
      setLastMenus(["plantFinder", "shop"]);
      const careResponses = [
        "Great question! 🌱 Here are some universal plant care tips:\n\n💧 **Watering:** Let soil dry slightly between waterings (most common mistake is overwatering!)\n☀️ **Light:** Bright indirect light is perfect for most plants\n💨 **Humidity:** Tropical plants love a regular misting\n🌱 **Fertilizer:** Feed every 2-4 weeks during growing season\n\n✨ Every product includes care instructions. Want personalized advice?",
        "Plant struggling? 😟 Don't worry, it happens!\n\n🔍 **Check:** Soil moisture, light level, and humidity\n💡 **Most fixes:** Adjust watering or move to brighter spot\n🌿 **Prevention:** Right plant in right place!\n\nUse our **Plant Finder** to get the perfect match for your home!"
      ];
      return careResponses[Math.floor(Math.random() * careResponses.length)];
    }

    // Track Order
    if (msg.includes("track") || msg.includes("order status") || msg.includes("where is my")) {
      setLastMenus(["account"]);
      return "To check your order status, go to your **Account page** after logging in! 📦\n\nYou'll find:\n- Order history\n- Tracking details\n- Delivery updates\n\nNeed help? Email us at lafioregardens@gmail.com with your order number!";
    }

    // Pricing
    if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("expensive") || msg.includes("expensive")) {
      setLastMenus(["shop"]);
      const priceResponses = [
        "Amazing prices for every budget! 💚\n\n🌿 **Plants:** AED 25-150\n💐 **Bouquets:** AED 75-300\n🎁 **Arrangements:** AED 100-500\n\n✨ **FREE shipping on orders over AED 100**\n🎯 **Quality guaranteed**\n\nWhat's your budget? I can suggest something perfect!",
        "We believe beautiful plants shouldn't break the bank! 🌱\n\n💰 **Budget-friendly:** Starting at AED 25\n💎 **Premium options:** Up to AED 500+\n\nWith **free delivery on orders over AED 100**, you save even more!\n\nWhat interests you?"
      ];
      return priceResponses[Math.floor(Math.random() * priceResponses.length)];
    }

    // Payment
    if (msg.includes("pay") || msg.includes("visa") || msg.includes("card") || msg.includes("cash")) {
      return "We accept multiple payment methods:\n- Visa & Mastercard\n- American Express\n- Apple Pay & Google Pay\n- Cash on Delivery (COD)\n\nAll online payments are 100% secure!";
    }

    // Gift
    if (msg.includes("gift") || msg.includes("birthday") || msg.includes("anniversary") || msg.includes("surprise") || msg.includes("present")) {
      setLastMenus(["bouquet", "birthMonth", "shop"]);
      const responses = [
        "Ooh, a gift! 🎁 That's wonderful!\n\n🌹 **Fresh Bouquets** (AED 75+) — Perfect for any moment\n🪴 **Potted Plants** — Long-lasting & thoughtful\n💐 **Custom Creations** — Design it yourself!\n🌸 **Birth Month Flowers** — Unique & personal\n\n✨ We even add personalized gift messages! Who's the lucky person?",
        "Love it! 💚 Gift-giving is our specialty!\n\n✨ **Starting from AED 75** for beautiful arrangements\n🎯 **Same-day delivery available**\n💝 **Personalized messages** included\n\nWhat's the occasion? Birthday, anniversary, or just because?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
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
    if (msg.includes("thank") || msg.includes("thanks") || msg.includes("helpful") || msg.includes("appreciate")) {
      const thankResponses = [
        "You're so welcome! 😊 That's what I'm here for. Anything else I can help with?",
        "Happy to help! 💚 Feel free to ask anytime you need something!",
        "Anytime! We love helping our plant lovers. Need anything else?"
      ];
      return thankResponses[Math.floor(Math.random() * thankResponses.length)];
    }

    // Detect office/workspace plants
    if (msg.includes("office") || msg.includes("workspace") || msg.includes("desk") || msg.includes("workplace")) {
      setLastMenus(["plantFinder", "shop", "consultation"]);
      return "Office plants are a great idea! 🌿 They boost productivity and mood!\n\n✨ **Best office plants:**\n🌱 Low-light tolerant (no windows needed!)\n💨 Air-purifying\n😌 Low maintenance\n\nOur **Plant Finder** can match you with perfect office companions, or check our **shop**!";
    }

    // Detect apartment/balcony/space-limited questions
    if (msg.includes("apartment") || msg.includes("balcony") || msg.includes("small space") || msg.includes("limited space")) {
      setLastMenus(["plantFinder", "shop"]);
      return "Small space, big impact! 💚\n\n✨ Perfect for apartments & balconies:\n🌿 Compact plants & hanging planters\n🪴 Space-saving vertical gardens\n💐 Potted arrangements\n\nUse **Plant Finder** to discover plants perfect for your space!";
    }

    // Detect questions about greenery/decor
    if (msg.includes("decor") || msg.includes("interior") || msg.includes("beautiful") || msg.includes("aesthetic")) {
      setLastMenus(["consultation", "shop", "plantFinder"]);
      return "Plants are the perfect decor! 🎨\n\n✨ We can help:\n🏡 **Planterior Design** — Style your space beautifully\n🌿 Find plants that match your aesthetic\n💐 Custom arrangements for any room\n\nReady to transform your space?";
    }

    // Bye / End conversation
    if (msg.match(/^(bye|goodbye|see you|take care|thanks|thank you|that's all)/)) {
      setLastMenus([]);
      const goodbyeResponses = [
        "Thank you for chatting with Lily! 💚 We hope we could help. Have a wonderful day and happy planting!",
        "Goodbye! 🌸 Thanks for stopping by La Fiore. Happy growing!",
        "See you soon! 💚 Thanks for visiting. Enjoy your plants!"
      ];
      return goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)];
    }

    // Who are you
    if (msg.includes("who are you") || msg.includes("your name") || msg.includes("what are you") || msg.includes("tell me about you")) {
      return "I'm **Lily** 🌸, La Fiore's virtual garden assistant!\n\n✨ I'm here to help with:\n🛍️ Finding the perfect plants & flowers\n💐 Custom bouquet design\n🌿 Plant care & gardening tips\n💚 Gift recommendations\n🎯 Delivery & order info\n👰 Events & special occasions\n\nThink of me as your friendly neighborhood plant expert! What can I help with?";
    }

    // Detect flower/plant names
    const flowers = ["rose", "tulip", "sunflower", "daisy", "orchid", "lily", "lavender", "hydrangea", "peony", "carnation", "jasmine", "hibiscus", "bonsai", "cactus", "succulent", "fern", "monstera", "pothos"];
    if (flowers.some(flower => msg.includes(flower))) {
      setLastMenus(["shop", "bouquet"]);
      return `Oh, you're interested in that! 🌺 We have beautiful options available!\n\n✨ Check out our **shop** to browse, or **design a custom bouquet** with it!\n\nNeed any care tips or want to know more?`;
    }

    // Detect budget questions
    if (msg.includes("budget") || msg.includes("cheap") || msg.includes("affordable") || msg.includes("price range")) {
      setLastMenus(["shop"]);
      return "Budget-friendly? We've got options! 💚\n\n🌿 **Small plants:** AED 25-50\n💐 **Fresh bouquets:** AED 75-150\n🎁 **Gifts & arrangements:** AED 100-300\n✨ **Premium options:** Starting AED 300+\n\nAnd remember, **FREE delivery on orders over AED 100**! What appeals to you?";
    }

    // Detect location/store questions
    if (msg.includes("where") || msg.includes("location") || msg.includes("visit") || msg.includes("store")) {
      return "You can shop with us anytime at **lafioregardens.vercel.app**! 🌐\n\n📍 We serve all across the UAE with delivery\n🕒 Open Saturday-Thursday: 9 AM - 9 PM\n📍 Friday: 12 PM - 9 PM\n\nReady to start shopping online?";
    }

    // Default - more conversational
    setLastMenus(["shop", "plantFinder", "bouquet", "birthMonth", "consultation"]);
    const defaultResponses = [
      "I'd be happy to help! 😊 What are you looking for today?\n\n🛍️ Browse our **shop**\n🌱 Find your perfect plant with **Plant Finder**\n💐 Create something custom\n🎁 Looking for a gift idea?\n\nJust let me know!",
      "How can I assist you? 💚\n\n✨ **Shopping** for plants or flowers?\n🎯 **Gift ideas** for someone special?\n🌿 **Plant care advice**?\n👰 **Planning an event**?\n\nI'm all ears!",
      "Tell me more! What brings you to La Fiore? 🌿\n\nWhether it's plants, gifts, design services, or just browsing, I'm here to help guide you!"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
      setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, can't understand that! 😊\n\nType **HOME** to go back to main menu!" }]);
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