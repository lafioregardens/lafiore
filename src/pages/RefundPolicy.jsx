import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      <div className="policy-page">
        <div className="policy-container">
          <h1>Refund Policy</h1>
          <div className="policy-content">
            <section>
              <h2>30-Day Money Back Guarantee</h2>
              <p>At LaFiore, we want you to be completely satisfied with your purchase. If you are not happy with your order, we offer a 30-day money-back guarantee from the date of delivery.</p>
            </section>

            <section>
              <h2>Eligibility for Refunds</h2>
              <p>To be eligible for a refund, the following conditions must be met:</p>
              <ul>
                <li>The request must be made within 30 days of delivery</li>
                <li>The product must be in resalable condition</li>
                <li>For fresh flowers, they must show clear signs of defects or poor quality</li>
                <li>Original proof of purchase (order receipt) must be provided</li>
              </ul>
            </section>

            <section>
              <h2>Non-Refundable Items</h2>
              <p>The following items are non-refundable:</p>
              <ul>
                <li>Custom-made bouquets or arrangements (unless damaged)</li>
                <li>Plants or flowers showing signs of normal wilting after 7 days</li>
                <li>Items purchased during clearance or final sale</li>
                <li>Delivery charges</li>
              </ul>
            </section>

            <section>
              <h2>Refund Process</h2>
              <p>To initiate a refund:</p>
              <ol>
                <li>Contact our customer service team at support@lafiore.com</li>
                <li>Provide your order number and reason for refund</li>
                <li>Include photos if applicable (for damaged items)</li>
                <li>We will review and approve or deny the refund within 5 business days</li>
                <li>Approved refunds will be processed within 7-10 business days</li>
              </ol>
            </section>

            <section>
              <h2>Return Shipping</h2>
              <p>LaFiore will provide a return shipping label for all refundable items. You are responsible for packaging the item securely and dropping it off at the designated location. Refunds will not be processed until the item is received and inspected.</p>
            </section>

            <section>
              <h2>Refund Amount</h2>
              <p>The refund amount will include the product price. Shipping charges are non-refundable unless the refund is due to our error or a defective product.</p>
            </section>

            <section>
              <h2>Exchanges</h2>
              <p>If you wish to exchange a product for a different one, we offer free exchanges within 30 days. Contact us to arrange an exchange.</p>
            </section>

            <section>
              <h2>Questions?</h2>
              <p>If you have any questions about our refund policy, please contact us at support@lafiore.com or call us at +971-XX-XXX-XXXX</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
