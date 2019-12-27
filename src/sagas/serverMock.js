import uuidv1 from 'uuid/v1';
import { select } from 'redux-saga/effects';

// const log = (...args) => (
//   console.log('SERVER: ', ...args), args[args.length - 1]
// );

const findBy = (mask, arr = []) => {
  if (!mask) return null;

  const byKeys = Object.keys(mask);

  return arr.find(item => byKeys.every(key => item[key] === mask[key]));
};

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
  directComments: [],
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

const getChildrenOrder = (children, comments) => {
  const getChildren = id => {
    if (comments[id].children.length === 0) {
      return id;
    }

    return [id, ...comments[id].children.flatMap(getChildren)];
  };

  return children.flatMap(getChildren);
};

const generateMock = () => {
  window.store = {
    posts: [],
    commentsMap: {},
    getPost(postId) {
      return findBy(
        {
          id: postId
        },
        this.posts
      );
    },
    getComments(postId) {
      const post = this.getPost(postId);
      const order = getChildrenOrder(
        post.directComments,
        this.commentsMap[postId]
      );

      return JSON.stringify(
        order.map(commentId => this.commentsMap[postId][commentId])
      );
    }
  };

  // !dev
  window.store.posts = Array(12)
    .fill(null)
    .map((_, i) => createPost(postMock(i)));

  window.store.posts.forEach(post => {
    post.commentsCount = 2;

    const comment1 = createComment(
      post.id,
      null,
      'Comment 1 content',
      'querty'
    );
    const comment2 = createComment(
      post.id,
      comment1.id,
      'Comment 1 1 content',
      'querty'
    );

    comment1.children.push(comment2.id);
    comment1.createdAt = post.createdAt + HOUR;

    comment2.depth = 1;
    comment2.createdAt = comment1.createdAt + HOUR;

    window.store.commentsMap[post.id] = {
      [comment1.id]: comment1,
      [comment2.id]: comment2
    };

    post.directComments = [comment1.id];
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
        window.store.commentsMap[postId][commentId].score += change;

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

      const post = window.store.posts.find(p => p.id === postId);
      post.commentsCount++;

      if (!window.store.commentsMap[postId]) {
        window.store.commentsMap[postId][comment.id] = comment;
        post.directComments.push(comment.id);
      } else if (commentId) {
        const parent = window.store.commentsMap[postId][commentId];

        comment.depth = parent.depth + 1;

        parent.children.push(comment.id);
        window.store.commentsMap[postId][comment.id] = comment;
      } else {
        window.store.commentsMap[postId][comment.id] = comment;
        post.directComments.push(comment.id);
      }

      return window.store.getComments(postId);
    },
    postsCommentGet: function*(postId) {
      yield delay();

      return window.store.getComments(postId);
    }
  };
};

export default generateMock();
