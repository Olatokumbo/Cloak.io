import { useEffect, useState } from "react";
import { validatePhoneNumber } from "../utils/validator";

const usePhoneValidator = (number) => {
  const [isPhoneNumber, setIsPhoneNumber] = useState(true);
  const [message, setMessage] = useState("Enter your Number");

  useEffect(() => {
    if (number) {
      const temp = validatePhoneNumber(number);
      setIsPhoneNumber(temp);
      if (temp) setMessage("Valid Phone Number");
      else setMessage("Invalid Phone Number");
    } else {
      setIsPhoneNumber(true);
      setMessage("Enter your Number");
    }
  }, [number]);

  return { isPhoneNumber, message };
};

export default usePhoneValidator;
