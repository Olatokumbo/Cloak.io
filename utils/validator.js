import validator from "validator";

export const validatePhoneNumber = (number) => {
  const isValidPhoneNumber = validator.isMobilePhone(number);
  return isValidPhoneNumber;
};
