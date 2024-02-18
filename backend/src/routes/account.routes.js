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
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance"
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account"
    });
  }

  // Perform the transfer
  await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful"
  });
})

export default router
