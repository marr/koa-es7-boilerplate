import PouchDB from 'pouchdb'

const db = new PouchDB('hybridb')

export default function(container) {
  return container.register({ db })
}
