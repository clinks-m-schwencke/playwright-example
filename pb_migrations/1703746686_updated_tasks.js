/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o6ylh91aflmjrzy")

  collection.listRule = "@request.auth.id != \"\" && @request.auth.id = @request.data.user"
  collection.viewRule = "@request.auth.id != \"\" && @request.auth.id = @request.data.user"
  collection.createRule = "@request.auth.id != \"\" && @request.auth.id = @request.data.user"
  collection.updateRule = "@request.auth.id = user"
  collection.deleteRule = "@request.auth.id = user"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o6ylh91aflmjrzy")

  collection.listRule = "@request.auth.id = user.id"
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
