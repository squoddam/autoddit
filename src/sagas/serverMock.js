import uuidv1 from 'uuid/v1';
import { select } from 'redux-saga/effects';

const delay = (ms = 1000) => new Promise(res => setTimeout(res, ms));

const createPost = (details, user) => ({
  id: uuidv1(),
  createdAt: Date.now(),
  createdBy: user,
  commentsCount: 0,
  score: 0,
  ...details
});

const postMock = i =>
  i % 2 === 0
    ? {
        createdAt: 1577089580564 - i * 1000 * 60 * 60,
        createdBy: 'querty',
        commentsCount: 0,
        score: 0,
        url: 'https://www.npmjs.com/package/uuid',
        imageSrc:
          'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png',
        title: 'RFC4122 (v1, v4, and v5) UUIDs'
      }
    : {
        createdAt: 1577090645818 - i * 1000 * 60 * 60,
        createdBy: 'querty',
        commentsCount: 0,
        score: 0,
        url: 'https://google.com',
        imageSrc:
          'https://www.google.com/logos/doodles/2019/happy-holidays-2019-day-1-6753651837108240-2xa.gif',
        title: 'Happy Holidays 2019! #GoogleDoodle'
      };

const getWithSkip = (posts, skip = 0, get = 5) => posts.slice(skip, skip + get);

const generateMock = () => {
  window.store = {
    posts: [],
    comments: {}
  };

  // !dev
  window.store.posts = Array(12)
    .fill(null)
    .map((_, i) => createPost(postMock(i)));
  // !dev

  return {
    postsGetMock: function*(skip = 0, get = 5) {
      yield delay();

      return JSON.stringify(getWithSkip(window.store.posts, skip, get));
    },
    postsAddMock: function*(postDetails) {
      const userStore = yield select(state => state.userStore);

      yield delay();

      const post = createPost(postDetails, userStore.name);

      window.store.posts = [post, ...window.store.posts];

      return JSON.stringify(getWithSkip(window.store.posts));
    },
    postsVote: function*(id, change = 0) {
      yield delay();

      const postIndex = window.store.posts.findIndex(p => p.id === id);
      window.store.posts[postIndex].score += change;

      return;
    }
  };
};

export default generateMock();
