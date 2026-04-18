import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DeliveryInfo() {
  return (
    <>
      <Navbar />
      <div className="policy-page">
        <div className="policy-container">
          <h1>Delivery Information</h1>
          <div className="policy-content">
            <section>
              <h2>Delivery Coverage</h2>
              <p>LaFiore delivers throughout Dubai, Abu Dhabi, and Sharjah. We offer same-day and next-day delivery options for most locations.</p>
            </section>

            <section>
              <h2>Delivery Options</h2>
              <ul>
                <li><strong>Same-Day Delivery:</strong> Available for orders placed before 2 PM (AED 25)</li>
                <li><strong>Next-Day Delivery:</strong> Order anytime, delivery the next day (AED 15)</li>
                <li><strong>Scheduled Delivery:</strong> Choose your preferred date and time (AED 20)</li>
              </ul>
            </section>

            <section>
              <h2>Delivery Times</h2>
              <p>Deliveries are made between 9 AM and 6 PM on weekdays, and 10 AM to 5 PM on weekends. For specific time slots, select "Scheduled Delivery" during checkout.</p>
            </section>

            <section>
              <h2>Delivery Areas</h2>
              <ul>
                <li><strong>Dubai:</strong> All areas including Downtown, Marina, Jumeirah, Business Bay, and more</li>
                <li><strong>Abu Dhabi:</strong> Abu Dhabi Island and surrounding areas</li>
                <li><strong>Sharjah:</strong> Central Sharjah areas</li>
              </ul>
              <p>Outside these areas? Contact us for special arrangements at support@lafiore.com</p>
            </section>

            <section>
              <h2>Delivery Charges</h2>
              <p>Standard delivery charges are AED 15-25 depending on location and delivery option. Free delivery on orders above AED 500.</p>
            </section>

            <section>
              <h2>What to Expect</h2>
              <ul>
                <li>Your delivery will arrive in our branded packaging to ensure freshness</li>
                <li>Fresh flowers are packaged with water-absorbing materials and care instructions</li>
                <li>A signature or confirmation is required upon delivery</li>
                <li>Our drivers carry water sachets for fresh bouquets</li>
              </ul>
            </section>

            <section>
              <h2>Recipient Not Available</h2>
              <p>If the recipient is not available at the delivery address, our driver will:</p>
              <ul>
                <li>Attempt to contact you or the recipient</li>
                <li>Wait for a reasonable time (up to 30 minutes)</li>
                <li>Leave a delivery attempt notice</li>
                <li>Schedule a redeliver y at no additional charge</li>
              </ul>
            </section>

            <section>
              <h2>Delivery Issues</h2>
              <p>If you have any issues with your delivery:</p>
              <ol>
                <li>Contact us immediately at support@lafiore.com</li>
                <li>Provide order number and photos if applicable</li>
                <li>We will resolve the issue within 24 hours</li>
                <li>We offer full refunds for missed or damaged deliveries</li>
              </ol>
            </section>

            <section>
              <h2>Special Requests</h2>
              <p>Have special delivery instructions? Add them during checkout:</p>
              <ul>
                <li>Leave at specific location</li>
                <li>Deliver to someone other than the address holder</li>
                <li>Add personalized gift messages</li>
                <li>Schedule for a specific time</li>
              </ul>
            </section>

            <section>
              <h2>International Delivery</h2>
              <p>Currently, we deliver within the UAE only. For international orders, please contact us at support@lafiore.com for special arrangements.</p>
            </section>

            <section>
              <h2>Questions?</h2>
              <p>For delivery inquiries, contact us at:</p>
              <p>
                Email: delivery@lafiore.com<br />
                Phone: +971-XX-XXX-XXXX<br />
                Hours: 9 AM - 6 PM (Daily)
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
