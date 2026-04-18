import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="policy-page">
        <div className="policy-container">
          <h1>Privacy Policy</h1>
          <div className="policy-content">
            <section>
              <h2>Introduction</h2>
              <p>LaFiore ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
            </section>

            <section>
              <h2>Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
              <ul>
                <li><strong>Personal Data:</strong> Name, email address, phone number, shipping address, billing address</li>
                <li><strong>Payment Information:</strong> Credit card details (processed securely by our payment provider)</li>
                <li><strong>Account Information:</strong> Username, password, preferences</li>
                <li><strong>Communication Data:</strong> Messages you send us, feedback, and inquiries</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system, pages visited</li>
              </ul>
            </section>

            <section>
              <h2>Use of Your Information</h2>
              <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
              <ul>
                <li>Process your transactions and send related information</li>
                <li>Email you regarding your account or order</li>
                <li>Fulfill and manage your orders</li>
                <li>Generate a personal profile about you to facilitate your use of the Site</li>
                <li>Increase the efficiency and operation of the Site</li>
                <li>Monitor and analyze usage and trends to improve your experience</li>
                <li>Notify you of updates to the Site</li>
              </ul>
            </section>

            <section>
              <h2>Disclosure of Your Information</h2>
              <p>We may share information we have collected about you in certain circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> We may disclose your information to companies that assist us in operating our website and conducting our business</li>
                <li><strong>By Law or Legal Process:</strong> If required by law or legal process, we may disclose your information</li>
                <li><strong>Business Transfers:</strong> Your information may be transferred in the event of a merger, acquisition, or sale</li>
              </ul>
            </section>

            <section>
              <h2>Security of Your Information</h2>
              <p>We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2>Cookies and Tracking Technologies</h2>
              <p>Our Site may use cookies and similar tracking technologies to track activity on our Site and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse cookies or to alert you when cookies are being sent.</p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
              <p>
                Email: privacy@lafiore.com<br />
                Address: LaFiore, Dubai, UAE<br />
                Phone: +971-XX-XXX-XXXX
              </p>
            </section>

            <section>
              <h2>Changes to This Policy</h2>
              <p>LaFiore reserves the right to make changes to this Privacy Policy at any time and for any reason. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the Site.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
