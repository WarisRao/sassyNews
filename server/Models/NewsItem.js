import * as HNDB from '../dataApi';

let newPostIdCounter = 100;

export default class NewsItem {
  constructor(props) {
    if (!props.id) throw new Error('Error instantiating News Item, id is required:', props.id);
    
    this.id = props.id || (newPostIdCounter += 1);
    this.creationTime = props.creationTime || +new Date();
    this.commentCount = props.commentCount || 0;
    this.comments = props.comments || [];
    this.hides = props.hides || [];
    this.submitterId = props.submitterId;
    this.text = props.text || null;
    this.title = props.title;
    this.upvotes = props.upvotes || [props.submitterId];
    this.upvoteCount = props.upvoteCount || 1;
    this.url = props.url;
  }

  static getNewsItem = id => HNDB.fetchNewsItem(id);

  static getNewsItems = ids =>
    Promise.all(ids.map(id => NewsItem.getNewsItem(id)))
      .then(newsItems => newsItems.filter(newsItem => newsItem !== undefined))
      .catch(reason => console.log(`Rejected News Items: ${reason}`));

}
