
class Feed {
  getForType(type, first, skip) {
    console.log(`Get first ${first} ${type} stories skip ${skip}.`);

    switch (type) {
      case 'TOP':
        return this.topNewsItems.slice(skip, first + skip);
      case 'NEW':
        return this.newNewsItems.slice(skip, first + skip);
      case 'SHOW':
        return this.showNewsItems.slice(skip, first + skip);
      case 'ASK':
        return this.askNewsItems.slice(skip, first + skip);
      case 'JOB':
        return this.jobNewsItems.slice(skip, first + skip);
      default:
        return this.topNewsItems.slice(skip, skip + first);
    }
  }

  topNewsItems = [];
  newNewsItems = [];
  bestNewsItems = [];
  showNewsItems = [];
  askNewsItems = [];
  jobNewsItems = [];
}

export default new Feed();
