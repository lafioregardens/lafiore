import { Link } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
function Navbar() {
const { cartItems } = useContext(CartContext);
const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);
  return (
    <header className="navbar-container">
      <div className="logo">
        La Fiore
      </div>
      <div className="nav-row">
      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/plantfinder">Plant Finder</Link>
        <Link to="/customize">Customize Bouquet</Link>
        <Link to="/consultation">Our Services</Link>
      </nav>
<div className="nav-icons">
          <Link to="/search" className="icon-link" aria-label="Search">
            <Search size={20} />
          </Link>

          <Link to="/login" className="icon-link" aria-label="Login">
            <User size={20} />
          </Link>

           <Link to="/cart" className="icon-link cart-icon-wrapper" aria-label="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
      <div className="nav-divider"></div>

    </header>
  );
}

export default Navbar;