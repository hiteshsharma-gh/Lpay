import express from 'express'

import rootRouter from './routes/index.js'
import userRouter from './routes/user.routes.js'

import cors from 'cors'
import { error } from 'console'

const app = express()
const whitelist = process.evn.CORS_ORIGIN;

app.use(cors({
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("not allowed by cors"))
    }
  },
  credentials: true
}));

app.use('/api/v1/', rootRouter);
app.use('/api/v1/user/', userRouter);

module.exports = {
  app
}
