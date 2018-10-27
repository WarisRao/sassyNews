import Firebase from 'firebase';

import {
  HN_DB_URI,
  HN_API_VERSION,
} from './config';
import model from './Models';

const Comment=model.Comment;
const NewsItem=model.NewsItem;
const Feed=model.Feed;
const User=model.User;

Firebase.initializeApp({
  databaseURL: HN_DB_URI,
});

const api = Firebase.database().ref(HN_API_VERSION);

export function fetchNewsItem(id) {

  return api.child(`item/${id}`).once('value')
    .then((postSnapshot) => {
      const post = postSnapshot.val();
      if (post !== null) {
        const newsItem = new NewsItem({
          id: post.id,
          creationTime: post.time * 1000,
          commentCount: post.descendants,
          comments: post.kids,
          submitterId: post.by,
          title: post.title,
          upvoteCount: post.score,
          url: post.url,
        });

        return newsItem;
      }
      throw post;
    })
    .catch(reason => console.log(`Fetching post failed: ${reason}`));
}

export function fetchComment(id) {

  return api.child(`item/${id}`).once('value')
    .then((itemSnapshot) => {
      const item = itemSnapshot.val();
      if (item !== null && !item.deleted && !item.dead) {
        const comment = new Comment({
          id: item.id,
          creationTime: item.time * 1000,
          comments: item.kids,
          parent: item.parent,
          submitterId: item.by,
          text: item.text,
        });

        return comment;
      }
      throw item;
    })
    .catch(reason => console.log(`Fetching comment failed: ${reason}`));
}

export function fetchUser(id) {

  return api.child(`user/${id}`).once('value')
    .then((itemSnapshot) => {
      const item = itemSnapshot.val();
      if (item !== null && !item.deleted && !item.dead) {
        const user = new User({
          id: item.id,
          about: item.about,
          creationTime: item.created * 1000,
          karma: item.karma,
          posts: item.submitted,
        });

        return user;
      }
      throw item;
    })
    .catch(reason => console.log(`Fetching user failed: ${reason}`));
}

export function getFeed(feedType) {

  return api.child(`${feedType}stories`).once('value')
    .then(feedSnapshot => feedSnapshot.val())
    .then(feed => feed.filter(newsItem => newsItem !== undefined && newsItem !== null))
    .catch(reason => console.log(`Fetching news feed failed: ${reason}`));
}

const rebuildFeed = (feedType) => {
  console.log('seeding');
  setTimeout(rebuildFeed, 180000, feedType);
  getFeed(feedType)
    .then(feed => Promise.all(feed.map(id => fetchNewsItem(id)))
      .then((newsItems) => {
        Feed[`${feedType}NewsItems`] = newsItems.filter(newsItem => newsItem !== undefined && newsItem !== null);
        console.log(`Updated ${feedType} ids`);
      }),
    )
    .catch(reason => console.log(`Error building feed: ${reason}`));
};

export function seedCache() {
    console.log('Seeding cache');
    ['top', 'new', 'show', 'ask', 'job'].forEach((feedType) => {
      rebuildFeed(feedType);
    });
  
}
