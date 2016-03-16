export class UsersRepository {
  constructor(db) {
    this.db = db;
  }

  findOrCreate ({ accessToken }) {
    return this.db.get(accessToken).catch(e => {
      return this.db.put({
        _id: accessToken
      })
    })
  }

  getUsers() {
    return this.db.allDocs()
  }

  getUser(query) {
    return getUsers(query)
  }
}

export default function (container) {
  container.dependsOn(['db'], () => {
    container.register({
      users: new UsersRepository(container.db)
    })
  });
}
