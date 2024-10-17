import PropTypes from "prop-types";

import Toast from "./Toast";

const ToastContainer = ({ toasts }) => {
  return (
    <div className="component-toast-container position-fixed top-0 end-0 p-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={toast.onClose}
        />
      ))}
    </div>
  );
};

ToastContainer.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      onClose: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default ToastContainer;
