import express from 'express';
import mongoose from 'mongoose';

import { authMiddleware } from '../middlewares/authMiddleware.js'
import { Account } from '../models/account.model.js'

const app = express()
const router = express.Router()

app.use(express.json())

router.get('/balance', authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const userBalance = Account.findOne({
      userId
    })

    res.status(200).json({
      balance: userBalance.balance
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

  const session = await mongoose.startSession();

  session.startTransaction();

  const senderAccount = await Account.findOne(
    { userId }
  ).session(session)

  const receiverAccount = await Account.findOne(
    { userId: to }
  ).session(session)

  if (!receiverAccount) {
    session.abortTransaction();
    res.status(400).json({
      message: 'Invalid Account'
    })
  }

  if (!senderAccount || senderAccount.balance < amount) {
    session.abortTransaction();
    res.status(400).json({
      message: 'Insufficient balance'
    })
  }

  await Account.updateOne(
    { userId },
    {
      balance: {
        $inc: -amount
      }
    }
  ).session(session)

  await Account.updateOne(
    { userId: to },
    {
      balance: {
        $inc: amount
      }
    }
  ).session(session)

  session.commitTransaction();

  res.status(200).json({
    message: 'transfer successful'
  })

  session.endSession();
})

module.exports = {
  router
}
