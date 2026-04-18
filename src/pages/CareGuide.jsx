import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CareGuide() {
  return (
    <>
      <Navbar />
      <div className="policy-page">
        <div className="policy-container">
          <h1>Plant & Flower Care Guide</h1>
          <div className="policy-content">
            <section>
              <h2>Fresh Flowers Care</h2>
              <p>Fresh flowers are delicate and require proper care to maintain their beauty and longevity.</p>
            </section>

            <section>
              <h3>Upon Delivery</h3>
              <ul>
                <li>Remove flowers from packaging gently</li>
                <li>Trim 1-2 inches off the stems at a 45-degree angle using sharp scissors</li>
                <li>Remove any leaves that would be submerged in water</li>
                <li>Place in a clean vase with room-temperature water</li>
                <li>Add flower food if included (follow packet instructions)</li>
              </ul>
            </section>

            <section>
              <h3>Daily Care</h3>
              <ul>
                <li>Change water every 2-3 days</li>
                <li>Trim stems slightly each time you change water</li>
                <li>Remove any wilted or dead leaves and petals</li>
                <li>Keep flowers away from ripening fruits and vegetables</li>
                <li>Avoid direct sunlight, heating/cooling vents, and drafts</li>
              </ul>
            </section>

            <section>
              <h3>Lifespan</h3>
              <p>With proper care, most fresh flowers last 7-14 days. Different flowers have different lifespans:</p>
              <ul>
                <li>Roses: 10-14 days</li>
                <li>Tulips: 7-10 days</li>
                <li>Sunflowers: 10-12 days</li>
                <li>Chrysanthemums: 10-14 days</li>
                <li>Orchids: 2-3 weeks</li>
              </ul>
            </section>

            <section>
              <h2>Indoor Plants Care</h2>
              <p>Indoor plants bring life and freshness to your space. Here's how to care for them:</p>
            </section>

            <section>
              <h3>Light Requirements</h3>
              <ul>
                <li><strong>Low Light:</strong> Snake plants, pothos, philodendrons - suitable for bathrooms and corners</li>
                <li><strong>Indirect Light:</strong> Most houseplants prefer bright, indirect light - near windows with sheer curtains</li>
                <li><strong>Direct Light:</strong> Succulents, cacti, flowering plants - need 4-6 hours of direct sunlight</li>
              </ul>
            </section>

            <section>
              <h3>Watering Guidelines</h3>
              <ul>
                <li>Check soil moisture before watering - stick your finger 2 inches into soil</li>
                <li>Water when soil feels dry to touch</li>
                <li>Use room-temperature water</li>
                <li>Ensure pots have drainage holes to prevent root rot</li>
                <li>Most plants need less water in winter</li>
                <li>Avoid overwatering - it's the #1 cause of plant death</li>
              </ul>
            </section>

            <section>
              <h3>Common Plant Problems</h3>
              <ul>
                <li><strong>Yellow Leaves:</strong> Usually overwatering - reduce frequency</li>
                <li><strong>Brown Leaf Tips:</strong> Low humidity - mist regularly or use a humidifier</li>
                <li><strong>Leaf Drop:</strong> Cold drafts or inconsistent watering - move away from AC vents</li>
                <li><strong>Pest Issues:</strong> Spider mites, mealybugs - spray with neem oil or insecticidal soap</li>
                <li><strong>Not Growing:</strong> Insufficient light or nutrients - repot with fresh soil and move to brighter spot</li>
              </ul>
            </section>

            <section>
              <h3>Seasonal Care</h3>
              <ul>
                <li><strong>Spring/Summer:</strong> Water more frequently, apply fertilizer every 2-4 weeks</li>
                <li><strong>Fall/Winter:</strong> Reduce watering, stop or reduce fertilizing, provide supplemental light if needed</li>
              </ul>
            </section>

            <section>
              <h2>Bouquet Care Tips</h2>
              <ul>
                <li>Use a clean vase - wash with hot water before using</li>
                <li>Fill vase with cool water, add flower food provided</li>
                <li>Recut stems under running water every 2-3 days</li>
                <li>Place in a cool location away from heating and direct sun</li>
                <li>Remove dead or yellowing leaves immediately</li>
                <li>Change water every 2-3 days for maximum freshness</li>
              </ul>
            </section>

            <section>
              <h2>Succulents & Cacti Care</h2>
              <ul>
                <li>Place in bright, indirect light (at least 6 hours of light per day)</li>
                <li>Water deeply but infrequently - only when soil is completely dry</li>
                <li>Use well-draining cactus or succulent soil mix</li>
                <li>Fertilize once in spring and once in summer</li>
                <li>Avoid cold temperatures below 50°F</li>
              </ul>
            </section>

            <section>
              <h2>Seasonal Plants</h2>
              <p>Seasonal plants like tulips, poinsettias, and chrysanthemums have specific care needs:</p>
              <ul>
                <li>Keep soil consistently moist but not waterlogged</li>
                <li>Provide cool temperatures (60-70°F is ideal)</li>
                <li>Place in bright, indirect light</li>
                <li>Fertilize weekly during blooming season</li>
                <li>Remove dead flowers to encourage more blooms</li>
              </ul>
            </section>

            <section>
              <h2>Need Help?</h2>
              <p>If you have specific care questions about your plants or flowers, contact our care experts:</p>
              <p>
                Email: care@lafiore.com<br />
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
