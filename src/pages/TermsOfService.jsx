import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <div className="policy-page">
        <div className="policy-container">
          <h1>Terms of Service</h1>
          <div className="policy-content">
            <section>
              <h2>1. Agreement to Terms</h2>
              <p>By accessing and using LaFiore website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </section>

            <section>
              <h2>2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on LaFiore's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul>
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2>3. Disclaimer</h2>
              <p>The materials on LaFiore's website are provided on an 'as is' basis. LaFiore makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>

            <section>
              <h2>4. Limitations</h2>
              <p>In no event shall LaFiore or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on LaFiore's website.</p>
            </section>

            <section>
              <h2>5. Accuracy of Materials</h2>
              <p>The materials appearing on LaFiore's website could include technical, typographical, or photographic errors. LaFiore does not warrant that any of the materials on its website are accurate, complete, or current.</p>
            </section>

            <section>
              <h2>6. Links</h2>
              <p>LaFiore has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by LaFiore of the site. Use of any such linked website is at the user's own risk.</p>
            </section>

            <section>
              <h2>7. Modifications</h2>
              <p>LaFiore may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
            </section>

            <section>
              <h2>8. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of the United Arab Emirates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
