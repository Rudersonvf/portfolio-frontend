import { useState } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, type = "success") => {
    const id = Date.now();
    const onClose = () => removeToast(id);

    setToasts([...toasts, { id, title, message, type, onClose }]);

    setTimeout(() => {
      removeToast(id);
    }, 6000);
  };

  const removeToast = (id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  };

  return {
    toasts,
    addToast,
  };
};
