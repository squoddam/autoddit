const withDelay = (cb, delay = 1000) => (...args) =>
  new Promise(res => {
    setTimeout(() => res(cb(...args)), delay);
  });

const generateMock = () => {
  const store = [];

  return {
    postsGetMock: withDelay(() => store)
  };
};

export default generateMock();
