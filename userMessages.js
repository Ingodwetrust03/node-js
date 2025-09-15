const sendMessage = (username, message) => {
  return {
    name: username,
    message: message,
  };
};

const receiveMessage = (...args) => {
  console.log(...args);
};

export { sendMessage, receiveMessage };
