import * as HNDB from '../dataApi';

export default class Comment {
  constructor(props) {
    if (!props.id) throw new Error('Error instantiating Comment, id invalid: ', props.id);
   
    this.id = props.id;
    this.creationTime = props.creationTime || +new Date();
    this.comments = props.comments || [];
    this.parent = props.parent;
    this.submitterId = props.submitterId;
    this.text = props.text;
  }
  static getComment = id => HNDB.fetchComment(id).catch(reason => console.log(`Rejected comment: ${reason}`))

  static getComments = ids =>
    Promise.all(ids.map(commentId => Comment.getComment(commentId)))
      .then(comments => comments.filter(comment => comment !== undefined))
      .catch(reason => console.log(`Rejected comments: ${reason}`))
}
