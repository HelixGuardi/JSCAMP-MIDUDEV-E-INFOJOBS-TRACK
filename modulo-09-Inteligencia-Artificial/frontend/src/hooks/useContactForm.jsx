import { useEffect, useState } from "react";

export function useContactForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    email: "",
    phone: "",
    comment: "",
  });

  const modalCountDown = 7000;
  const [showModal, setShowModal] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

  const handleFormDataValues = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setDisableSubmitBtn(true);
  };

  useEffect(() => {
    if (showModal) {
      const contactContainer = document.getElementById(
        "contact-main-container",
      );
      contactContainer.style.filter = "blur(10px)";

      const timer = setTimeout(() => {
        setShowModal(false);
        setDisableSubmitBtn(false);
        contactContainer.style.filter = "none";
      }, modalCountDown);

      const progressInterval = setInterval(() => {
        setProgressBar((prev) => prev + 1.04);
      }, 70);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
        setProgressBar(0);
        setFormData({
          firstname: "",
          surname: "",
          email: "",
          phone: "",
          comment: "",
        });
      };
    }
  }, [showModal]);

  return {
    formData,
    showModal,
    progressBar,
    disableSubmitBtn,
    handleFormDataValues,
    handleSubmit,
  };
}
