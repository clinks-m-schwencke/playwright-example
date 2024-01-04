/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o6ylh91aflmjrzy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sbusfy9y",
    "name": "isdone",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o6ylh91aflmjrzy")

  // remove
  collection.schema.removeField("sbusfy9y")

  return dao.saveCollection(collection)
})
