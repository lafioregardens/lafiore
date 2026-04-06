import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Toast() {
  const { toastMessage, showToast } = useContext(CartContext);

  if (!showToast) return null;

  return <div className="toast-message">{toastMessage}</div>;
}

export default Toast;