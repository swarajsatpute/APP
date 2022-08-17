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
    rem: true,
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
//

//find
//========================================
// router.put('/:id', async (req, res) => {
//   const { id } = req.params
//   console.log(req.body, req.params)
//   // console.log(new mongodb.ObjectId(req.params.id))
//   const posts = await loadPostCollections()
//   try {
//     const response = await posts.findOne({
//       _id: new mongodb.ObjectId(req.params.id),
//     })
//     if (!response) throw Error('Problem in Update() => id not found')
//     const updated = req.params
//     //...response._doc,...req.body
//     res.status(200).json(updated)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })
//update
//==========================================
// router.put('/:id', async (req, res) => {
//   const posts = await loadPostCollections()
//   const id = req.params
//   const text = req.body
//   console.log(id, { $set: text })
//   const response = await posts.updateOne(
//     { _id: new mongodb.ObjectId(req.params.id) },
//     { $set: text }
//   )
//   const updated = { ...response }
//   //...response._doc,...req.body
//   res.status(200).json(updated)
// })
// //========================================
router.put('/:id', async (req, res) => {
  const posts = await loadPostCollections()
  const id = req.params
  const text = req.body
  // console.log(query)
  //({$set:{ text: 'Edit Template =>TBR' }})
  try {
    const response = await posts.updateOne(
      { _id: new mongodb.ObjectId(req.params.id) },
      { $set: text }
    )
    if (!response) throw Error('Problem in Update() => id not found')
    const updated = { ...response }
    //...response._doc,...req.body
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
//========================================
// --------------------------------og
async function loadPostCollections() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://root:root@cluster0.aejxtds.mongodb.net/?retryWrites=true&w=majority'
  )
  // const client = await mongodb.MongoClient.connect('mongodb://localhost:27017')
  return client.db('Beta').collection('Beta')
}
//-------------------------------dup
// async function loadPostCollections() {
//   const client = await mongodb.MongoClient.connect(
//     process.env.MONGODB_URI || 'mongodb://localhost:27017/beta'
//   )
//   return client.db('beta').collection('posts')
// }
//--------------------------------
// const { MongoClient, ServerApiVersion } = require('mongodb')
// async function loadPostCollections() {
//   const client = await mongodb.MongoClient.connect(
//     process.env.MONGODB_URI ||
//       'mongodb+srv://root:<password>@cluster0.aejxtds.mongodb.net/?retryWrites=true&w=majority'
//   )
//   return client.db('beta').collection('beta')
// }
//-----------------------------------

// const { MongoClient, ServerApiVersion } = require('mongodb')
// async function loadPostCollections() {
//   const uri =
//     'mongodb+srv://root:<password>@cluster0.aejxtds.mongodb.net/?retryWrites=true&w=majority'
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverApi: ServerApiVersion.v1,
//   })
//   return client.db('beta').collection('beta')
// }

//==================================
// const mongoose = require('mongoose')
// async function loadPostCollections() {
//   const url = `mongodb+srv://root:root@cluster0.aejxtds.mongodb.net/?retryWrites=true&w=majority`
//   const connectionParams = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   }
//   await mongoose
//     .connect(url, connectionParams)
//     .then(() => {
//       console.log('Connected to the database ')
//     })
//     .catch((err) => {
//       console.error(`Error connecting to the database. n${err}`)
//     })
// }
//================
// const { MongoClient } = require('mongodb')
// or as an es module:
// import { MongoClient } from 'mongodb'

// // Connection URL
// const url = 'mongodb://localhost:27017'
// const client = new MongoClient(url)
// // Database Name
// const dbName = 'myProject'
// async function main() {
//   // Use connect method to connect to the server
//   await client.connect()
//   console.log('Connected successfully to server')
//   const db = client.db(dbName)
//   const collection = db.collection('documents')
//   // the following code examples can be pasted here...
//   return 'done.'
// }
// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close())

module.exports = router
