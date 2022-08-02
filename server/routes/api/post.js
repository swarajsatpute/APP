const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()
//Get
router.get('/', async (req, res) => {
  const posts = await loadPostCollections()
  res.send(await posts.find().toArray())
})
//Add
router.post('/', async (req, res) => {
  const posts = await loadPostCollections()
  await posts.insertOne({
    text: req.body.text,
  })
  res.status(200).send()
})
//Delete
router.delete('/:id', async (req, res) => {
  const posts = await loadPostCollections()
  console.log(posts)
  await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
  res.status(200).send()
})
async function loadPostCollections() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://localhost:27017/beta'
  )
  return client.db('beta').collection('posts')
}
module.exports = router
