export const greeting = (messages: Array<string>) => {
  const randomMessage = () =>
    messages[Math.floor(Math.random() * messages.length)];
  return {
    message: randomMessage(),
    new() {
      this.message = randomMessage();
    },
  };
};
