const withDelay = (cb, delay = 1000) => (...args) =>
  new Promise(res => {
    setTimeout(() => res(cb(...args)), delay);
  });

const createPost = details => ({
  createdAt: Date.now(),
  comments: [],
  ...details
});

const generateMock = () => {
  const store = {
    posts: []
  };

  return {
    postsGetMock: withDelay(() => store.posts),
    postsAddMock: withDelay(postDetails => {
      const post = createPost(postDetails);

      store.posts = [...store.posts, post];

      return store;
    })
  };
};

export default generateMock();
