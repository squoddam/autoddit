import uuidv1 from 'uuid/v1';
import { select } from 'redux-saga/effects';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const delay = (ms = 1000) => new Promise(res => setTimeout(res, ms));

const createPost = (details, user) => ({
  id: uuidv1(),
  createdAt: Date.now(),
  createdBy: user,
  commentsCount: 0,
  score: 0,
  ...details
});

const createComment = (postId, commentId, content, user) => ({
  id: uuidv1(),
  createdAt: Date.now(),
  createdBy: user,
  postId,
  parentId: commentId || postId,
  children: [],
  depth: 0,
  score: 0,
  content
});

const postMock = i =>
  i % 2 === 0
    ? {
        createdAt: 1577089580564 - DAY,
        createdBy: 'querty',
        commentsCount: 0,
        score: 0,
        url: 'https://www.npmjs.com/package/uuid',
        imageSrc:
          'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png',
        title: 'RFC4122 (v1, v4, and v5) UUIDs'
      }
    : {
        createdAt: 1577090645818 - DAY,
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

  window.store.posts.forEach(post => {
    post.commentsCount = 2;

    const comment1 = createComment(post.id, null, 'adasdasdasd', 'querty');
    const comment2 = createComment(
      post.id,
      comment1.id,
      'adasdasdasd',
      'querty'
    );

    comment1.children.push(comment2.id);
    comment1.createdAt = post.createdAt + HOUR;

    comment2.depth = 1;
    comment2.createdAt = comment1.createdAt + HOUR;

    window.store.comments[post.id] = [comment1, comment2];
  });
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
    postsVote: function*(change, postId, commentId) {
      yield delay();

      if (commentId) {
        window.store.comments[postId].find(
          c => c.id === commentId
        ).score += change;

        return;
      }

      window.store.posts.find(p => p.id === postId).score += change;

      return;
    },
    postsCommentAdd: function*(postId, commentId, commentContent) {
      const userStore = yield select(state => state.userStore);

      yield delay();

      const comment = createComment(
        postId,
        commentId,
        commentContent,
        userStore.name
      );

      if (!window.store.comments[postId]) {
        window.store.comments[postId] = [comment];

        return JSON.stringify(window.store.comments[postId]);
      }

      if (commentId) {
        const parent = window.store.comments[postId].find(
          c => c.id === commentId
        );
        parent.children.push(comment.id);

        comment.depth = parent.depth + 1;
      }

      window.store.comments[postId].push(comment);

      return JSON.stringify(window.store.comments[postId]);
    },
    postsCommentGet: function*(postId) {
      yield delay();

      return JSON.stringify(window.store.comments[postId]);
    }
  };
};

export default generateMock();
