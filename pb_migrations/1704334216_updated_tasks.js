/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o6ylh91aflmjrzy")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o6ylh91aflmjrzy")

  collection.listRule = "@request.auth.id != \"\" && @request.auth.id = @request.data.user"
  collection.viewRule = "@request.auth.id != \"\" && @request.auth.id = @request.data.user"

  return dao.saveCollection(collection)
})
