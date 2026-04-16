import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import WishlistButton from "../components/WishlistButton";

import carnationb from "../assets/birthmonth/carnationb.jpg";
import daffodilsb from "../assets/birthmonth/daffodilsb.jpg";
import daisyb from "../assets/birthmonth/daisyb.jpg";
import lilyb from "../assets/birthmonth/lilyb.jpg";
import roseb from "../assets/birthmonth/roseb.jpg";
import asterb from "../assets/birthmonth/asterb.jpg";
import chrysanthemumb from "../assets/birthmonth/chrysanthemumb.jpg";
import gladiolusb from "../assets/birthmonth/gladiolusb.jpg";
import larkspurb from "../assets/birthmonth/larkspurb.jpg";
import marigoldb from "../assets/birthmonth/marigoldb.jpg";
import narcissusb from "../assets/birthmonth/narcissusb.jpg";
import violetsb from "../assets/birthmonth/violetsb.jpg";

function BirthMonthFlowers() {
  const { addToCart } = useContext(CartContext);

  const birthMonthFlowers = [
    {
      id: 1,
      month: "January",
      flower: "Carnation",
      meaning: "Represents admiration, love, and distinction.",
      colors: ["Pink", "White", "Red"],
      price: "AED 85.00",
      image: carnationb,
    },
    {
      id: 2,
      month: "February",
      flower: "Violet",
      meaning: "Symbolizes loyalty, wisdom, and faithfulness.",
      colors: ["Purple", "Blue", "White"],
      price: "AED 90.00",
      image: violetsb,
    },
    {
      id: 3,
      month: "March",
      flower: "Daffodil",
      meaning: "Represents new beginnings, hope, and joy.",
      colors: ["Yellow", "White"],
      price: "AED 80.00",
      image: daffodilsb,
    },
    {
      id: 4,
      month: "April",
      flower: "Daisy",
      meaning: "Symbolizes innocence, purity, and happiness.",
      colors: ["White", "Pink", "Yellow"],
      price: "AED 75.00",
      image: daisyb,
    },
    {
      id: 5,
      month: "May",
      flower: "Lily",
      meaning: "Represents devotion, grace, and beauty.",
      colors: ["White", "Pink", "Orange"],
      price: "AED 95.00",
      image: lilyb,
    },
    {
      id: 6,
      month: "June",
      flower: "Rose",
      meaning: "Symbolizes love, passion, and appreciation.",
      colors: ["Red", "Pink", "White", "Yellow"],
      price: "AED 110.00",
      image: roseb,
    },
    {
      id: 7,
      month: "July",
      flower: "Larkspur",
      meaning: "Represents positivity, dignity, and strong bonds.",
      colors: ["Purple", "Blue", "Pink"],
      price: "AED 88.00",
      image: larkspurb,
    },
    {
      id: 8,
      month: "August",
      flower: "Gladiolus",
      meaning: "Symbolizes strength, integrity, and remembrance.",
      colors: ["Red", "Pink", "White", "Yellow"],
      price: "AED 92.00",
      image: gladiolusb,
    },
    {
      id: 9,
      month: "September",
      flower: "Aster",
      meaning: "Represents love, wisdom, and elegance.",
      colors: ["Purple", "Pink", "White"],
      price: "AED 86.00",
      image: asterb,
    },
    {
      id: 10,
      month: "October",
      flower: "Marigold",
      meaning: "Symbolizes warmth, creativity, and passion.",
      colors: ["Orange", "Yellow"],
      price: "AED 78.00",
      image: marigoldb,
    },
    {
      id: 11,
      month: "November",
      flower: "Chrysanthemum",
      meaning: "Represents friendship, honesty, and happiness.",
      colors: ["White", "Yellow", "Pink", "Purple"],
      price: "AED 98.00",
      image: chrysanthemumb,
    },
    {
      id: 12,
      month: "December",
      flower: "Narcissus",
      meaning: "Symbolizes hope, self-worth, and renewal.",
      colors: ["White", "Yellow"],
      price: "AED 84.00",
      image: narcissusb,
    },
  ];

  return (
    <div>
      <Navbar />

      <main className="birth-month-page">
        <section className="birth-month-hero">
          <h1>Birth Month Flowers</h1>
          <p>
            Discover the flower that represents each month and choose a thoughtful
            floral gift.
          </p>
        </section>

        <section className="birth-month-grid-section">
          <div className="birth-month-grid">
            {birthMonthFlowers.map((item) => (
              <BirthMonthCard
                key={item.id}
                item={item}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function BirthMonthCard({ item, addToCart }) {
  const [selectedColor, setSelectedColor] = useState(item.colors[0]);

  const handleAddToCart = () => {
    addToCart({
      id: `${item.id}-birthmonth-${selectedColor}`,
      month: item.month,
      flower: item.flower,
      description: item.meaning,
      price: item.price,
      details: {
        color: selectedColor,
        type: "Birth Month Flower",
      },
    });
  };

  return (
    <article className="birth-month-card">
      <div className="birth-month-image-container">
        <span className="birth-month-badge">{item.month}</span>
        {item.image ? (
          <img
            src={item.image}
            alt={item.flower}
            className="birth-month-image"
          />
        ) : (
          <div className="birth-month-image"></div>
        )}
        <div className="birth-month-wishlist-btn">
          <WishlistButton product={item} />
        </div>
      </div>

      <div className="birth-month-content">
        <h2 className="birth-month-flower-name">{item.flower}</h2>

        <p className="birth-month-meaning">{item.meaning}</p>

        <select
          className="birth-month-color-select"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {item.colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>

        <p className="birth-month-price">{item.price}</p>

        <button className="birth-month-add-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default BirthMonthFlowers;