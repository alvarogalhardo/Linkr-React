const POSTS_ROUTE = process.env.REACT_APP_API_BASE_URL + '/posts';
const SIGN_IN_ROUTE = process.env.REACT_APP_API_BASE_URL;
const SIGN_UP_ROUTE = process.env.REACT_APP_API_BASE_URL + '/signup';
const TIMELINE_ROUTE = process.env.REACT_APP_API_BASE_URL + '/timeline';
const HASTAGS_ROUTE = process.env.REACT_APP_API_BASE_URL + '/hashtag';
const POST_DELETE_ROUTE = process.env.REACT_APP_API_BASE_URL + '/deletepost';
const URL = process.env.REACT_APP_API_BASE_URL;
const COMMENTS = process.env.REACT_APP_API_BASE_URL + '/comments';

const ROUTES = {
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  POSTS_ROUTE,
  TIMELINE_ROUTE,
  HASTAGS_ROUTE,
  POST_DELETE_ROUTE,
  URL,
  COMMENTS,
};

export default ROUTES;

export const POSTS_PER_PAGE = 10;
