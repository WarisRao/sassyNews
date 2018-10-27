import * as HNDB from '../dataApi';

export default class User {
  constructor(props) {

    this.id = props.id;
    this.about = props.about || '';
    this.creationTime = props.creationTime || +new Date();
    this.dateOfBirth = props.dateOfBirth || null;
    this.email = props.email || null;
    this.firstName = props.firstName || null;
    this.hides = props.hides || [];
    this.karma = props.karma || 1;
    this.lastName = props.lastName || null;
    this.likes = props.likes || [];
    this.posts = props.posts || [];
    this.hashedPassword = props.hashedPassword || undefined;
    this.passwordSalt = props.passwordSalt || undefined;
  }

  static getUser = id =>  HNDB.fetchUser(id);

}
