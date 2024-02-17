import express from 'express';
import mongoose from 'mongoose';

import authMiddleware from '../middlewares/authMiddleware.js'
import Account from '../models/account.model.js'

const app = express()
const router = express.Router()

app.use(express.json())

router.get('/balance', authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const userBalance = await Account.findOne({
      userId
    })

    res.status(200).json({
      balance: userBalance.balance / 10000
    })
  } catch (error) {
    res.status(411).json({
      message: 'error while retreving user balance'
    })
  }
})

router.post('/transfer', authMiddleware, async (req, res) => {
  const { to, amount } = req.body;
  const userId = req.userId;
  console.log(req.body, "/n", req.userId)

  console.log("arrived at start")
  const session = await mongoose.startSession();

  session.startTransaction();

  const senderAccount = await Account.findOne(
    { userId }
  ).session(session)

  if (!senderAccount || senderAccount.balance < amount) {
    await session.abortTransaction();
    res.status(400).json({
      message: 'Insufficient balance'
    })
  }

  const receiverAccount = await Account.findOne(
    { userId: to }
  ).session(session)

  if (!receiverAccount) {
    await session.abortTransaction();
    res.status(400).json({
      message: 'Invalid Account'
    })
  }

  await Account.updateOne(
    { userId },
    {
      $inc: {
        balance: -amount
      }
    }
  ).session(session)

  await Account.updateOne(
    { userId: to },
    {
      $inc: {
        balance: amount
      }
    }
  ).session(session)

  await session.commitTransaction();

  console.log("trasfer successful")
  res.status(200).json({
    message: 'transfer successful'
  })

  await session.endSession();
})

export default router
