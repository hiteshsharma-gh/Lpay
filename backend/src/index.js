import app from './app.js'
import mongoose from 'mongoose'

const main = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`)
  } catch (error) {
    console.log("mongodb connection failed", error)
  }
}

main()
  .then(() => {
    app.listen(process.env.PORT || 8000, (req, res) => {
      console.log(`server is listening`)
    })
  })
  .catch((err) => {
    console.log('mongodb connection failed', err)
  })
