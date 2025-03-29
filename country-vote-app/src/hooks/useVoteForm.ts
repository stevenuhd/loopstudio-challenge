import { useState, useEffect } from "react";
import { Errors, FormState } from "../app/vote-page/interfaces";



const useVoteForm = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    selectedCountry: "",
    touched: {
      name: false,
      email: false,
      country: false,
    },
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    country: "",
  });

  const [isValid, setIsValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let newErrors = { name: "", email: "", country: "" };
    let valid = true;

    if (formState.touched.name) {
      if (!formState.name.trim()) {
        newErrors.name = "Name is required";
        valid = false;
      } else if (!/^[A-Za-z\s]+$/.test(formState.name)) {
        newErrors.name = "Name must contain only letters";
        valid = false;
      }
    }

    if (formState.touched.email) {
      if (!formState.email.trim()) {
        newErrors.email = "Email is required";
        valid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
        newErrors.email = "Invalid email format";
        valid = false;
      }
    }

    if (formState.touched.country && !formState.selectedCountry) {
      newErrors.country = "Please select a country";
      valid = false;
    }

    setErrors(newErrors);
    setIsValid(!!(valid && formState.name && formState.email && formState.selectedCountry));
  }, [formState]);

  const handleChange = (field: keyof Omit<FormState, "touched">, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleBlur = (field: keyof FormState["touched"]) => {
    setFormState((prevState) => ({
      ...prevState,
      touched: {
        ...prevState.touched,
        [field]: true,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      setSubmitted(true);
    }
  };

  return {
    formState,
    errors,
    isValid,
    submitted,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useVoteForm;
