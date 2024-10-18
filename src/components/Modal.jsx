import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";

import "../sass/components/modal.scss";
import Button from "./Button";

const Modal = ({ title, message, onClose, onConfirm }) => {
  return (
    <div className="component-modal" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span>{title}</span>
          <IoClose size={26} className="modal-close-icon" onClick={onClose} />
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <Button
            classBtn="secondary"
            value={"Cancelar"}
            onClick={onClose}
            style={{ maxWidth: "120px", height: "40px" }}
          />
          <Button
            classBtn="primary"
            value={"Confirmar"}
            onClick={onConfirm}
            style={{ maxWidth: "140px", height: "40px" }}
          />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Modal;
