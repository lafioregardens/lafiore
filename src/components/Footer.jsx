import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Column 1 - Brand */}
        <div className="footer-col">
          <h3 className="footer-logo">LA FIORE </h3>
          <p className="footer-tagline">
            Bringing beauty and nature into your everyday life, one bloom at a time.
          </p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="mailto:lafioregardens@gmail.com" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2 - Shop */}
        <div className="footer-col">
          <h4 className="footer-heading">{t("shop")}</h4>
          <ul className="footer-links">
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/shop">Bouquets</Link></li>
            <li><Link to="/shop">Plants</Link></li>
            <li><Link to="/shop">Gifts</Link></li>
            <li><Link to="/shop">Accessories</Link></li>
          </ul>
        </div>

        {/* Column 3 - Services */}
        <div className="footer-col">
          <h4 className="footer-heading">{t("ourServices")}</h4>
          <ul className="footer-links">
            <li><Link to="/plantfinder">Plant Finder</Link></li>
            <li><Link to="/customize">Customize Bouquet</Link></li>
            <li><Link to="/birth-month">Birth Month Flowers</Link></li>
            <li><Link to="/consultation">Consultation</Link></li>
            <li><Link to="/consultation">Events & Corporate</Link></li>
          </ul>
        </div>

        {/* Column 4 - Company */}
        <div className="footer-col">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/delivery-info">Delivery Info</Link></li>
            <li><Link to="/care-guide">Care Guide</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/refund-policy">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Column 5 - Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">{t("contactUs")}</h4>
          <div className="footer-contact">
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+971 50 123 4567</span>
            </div>
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>lafioregardens@gmail.com</span>
            </div>
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Dubai, UAE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            © 2026 La Fiore. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link to="/privacy">{t("privacyPolicy")}</Link>
            <span className="footer-divider">·</span>
            <Link to="/terms">{t("termsOfService")}</Link>
            <span className="footer-divider">·</span>
            <Link to="/refund">{t("refundPolicy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;