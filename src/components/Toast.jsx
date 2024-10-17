import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import {
  IoClose,
  IoAlertCircle,
  IoCloseCircle,
  IoCheckmarkCircle,
} from "react-icons/io5";
import "../sass/components/toast.scss";

const Toast = ({ title, message, type, onClose }) => {
  const [, setVisible] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setVisible(true);
    const showTimeout = setTimeout(() => {
      setIsShowing(true);
    }, 50);

    const hideTimeout = setTimeout(() => {
      setIsShowing(false);
      setTimeout(() => {
        onClose();
      }, 500);
    }, 5000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [onClose]);

  return (
    <div className={`component-toast ${isShowing ? "show" : "hide"}`}>
      <div className={`toast toast-${type}`}>
        <div className="toast-icon-container">
          {type === "success" && <IoCheckmarkCircle size={30} />}
          {type === "danger" && <IoCloseCircle size={30} />}
          {type === "warning" && <IoAlertCircle size={30} />}
        </div>
        <div className="toast-message-container">
          <span className="toast-title">{title}</span>
          <p className="toast-message">{message}</p>
        </div>
        <IoClose
          size={26}
          className="toast-close-icon"
          onClick={() => {
            setIsShowing(false);
            setTimeout(onClose, 500);
          }}
        />
      </div>
    </div>
  );
};

Toast.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "danger", "warning"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
