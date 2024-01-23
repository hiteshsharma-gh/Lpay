import app from './app.js'

app.listen(process.env.PORT || 8000, (req, res) => {
  console.log(`server is listening on port ${process.evn.PORT}`)
})
