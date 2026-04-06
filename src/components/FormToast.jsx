// Close icon (optional)
import { X } from "lucide-react";

// Reusable toast component for forms
function FormToast({ message, type = "success", onClose }) {
  // If no message → don't render anything
  if (!message) return null;

  return (
    <div className={`form-toast ${type}`}>
      <span>{message}</span>

      {/* Close button */}
      <button className="toast-close-btn" onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}

export default FormToast;