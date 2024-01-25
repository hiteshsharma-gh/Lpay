import express from 'express'

import healthcheckRouter from './routes/healthcheck.routes.js'
import userRouter from './routes/user.routes.js'
import accountRouter from './routes/account.routes.js'

import cors from 'cors'

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

app.use('/api/v1/healthcheck', healthcheckRouter);
app.use('/api/v1/user/', userRouter);
app.use('/api/v1/account', accountRouter);

module.exports = {
  app
}
