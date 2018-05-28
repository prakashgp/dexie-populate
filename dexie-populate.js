Dexie.addons.push((db) => {
  /**
   * Populates the db query results based on reference details passed (method added to Table instances)
   * @param {(object|object[])} details - Reference details
   * @param {string} details.field - Name of the field need to be populated
   * @param {string} details.table - Table name from which to fetch referenced data
   * @param {string} [details.key='id'] - The primary key name in the referenced table to match referenced data
   */
  db.Table.prototype.populate = function (details) {
    return this.toCollection().populate(details)
  }
  /**
   * Populates the db query results based on reference details passed (method added to Collection instances)
   * @param {(object|object[])} details - Reference details
   * @param {string} details.field - Name of the field need to be populated
   * @param {string} details.table - Table name from which to fetch referenced data
   * @param {string} [details.key='id'] - The primary key name in the referenced table to match referenced data
   */
  db.Collection.prototype.populate = function (details) {
    return new Dexie.Promise((resolve, reject) => {
      this.toArray().then(items => {
        return Promise.all(items.map(item => {
          var populate = field => {
            var refField = field.field
            var refValue = item[refField]
            var refKey = field.key || 'id'
            var refTable = field.table
            if (Array.isArray(refValue)) {
              return Pomise.all(refValue.map(value => {
                if (value) return db[refTable].get({[refKey]: value})
              })).then(data => {
                item[refField] = data
              })
            } else if (refValue) {
              return db[refTable].get({[refKey]: refValue}).then(data => {
                item[refField] = data
              })
            }
          };
          if (Array.isArray(details)) {
            return Promise.all(details.map(populate))
          } else {
            return populate(details)
          }
        })).then(() => {
          resolve(items)
        })
      })
    })
  }
})
