import { store } from "react-notifications-component";

export const successNotification = (title, message) => {
  return store.addNotification({
    title,
    message,
    type: "success",
    insert: "top",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const errorNotification = (title, message) => {
  return store.addNotification({
    title,
    message,
    type: "error",
    insert: "bottom",
    showIcon: true,
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const defaultNotification = (title, message) => {
  return store.addNotification({
    title,
    message,
    type: "default",
    insert: "bottom",
    showIcon: true,
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const warningNotification = (title, message) => {
  return store.addNotification({
    title,
    message,
    type: "default",
    insert: "bottom",
    showIcon: true,
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};
