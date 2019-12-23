import uuidv1 from 'uuid/v1';
import { select } from 'redux-saga/effects';

const delay = (ms = 1000) => new Promise(res => setTimeout(res, ms));

const withDelay = (cb, delay = 1000) => (...args) =>
  new Promise(res => {
    setTimeout(() => res(cb(...args)), delay);
  });

const createPost = (details, user) => ({
  id: uuidv1(),
  createdAt: Date.now(),
  createdBy: user,
  commentsCount: 0,
  ...details
});

const postMock = i =>
  i % 2 === 0
    ? {
        createdAt: 1577089580564 + i * 1000 * 60,
        createdBy: 'querty',
        commentsCount: 0,
        url: 'npmjs.com',
        imageSrc:
          'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png',
        title: 'npmjs.com'
      }
    : {
        createdAt: 1577090645818 + i * 1000 * 60,
        createdBy: 'querty',
        commentsCount: 0,
        url: 'google.com',
        imageSrc:
          'https://www.google.com/logos/doodles/2019/happy-holidays-2019-day-1-6753651837108240-2xa.gif',
        title: 'Happy Holidays 2019! #GoogleDoodle'
      };

const generateMock = () => {
  const store = {
    posts: [],
    comments: {}
  };

  // dev
  store.posts = Array(12)
    .fill(null)
    .map((_, i) => createPost(postMock(i)));
  // dev

  return {
    postsGetMock: withDelay(() => store.posts),
    postsAddMock: function*(postDetails) {
      const userStore = yield select(state => state.userStore);

      yield delay();

      const post = createPost(postDetails, userStore.name);

      store.posts = [...store.posts, post];

      return store.posts;
    }
  };
};

export default generateMock();
