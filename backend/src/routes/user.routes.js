import bcrypt from 'bcrypt';
import 'dotenv/config';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import z from 'zod';
import authMiddlware from '../middlewares/authMiddleware.js';
import User from '../models/user.model.js';
import Account from '../models/account.model.js'

const app = express();

app.use(express.json());

const router = Router();

const signupBody = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().max(50),
  lastName: z.string().max(50)
});

router.post('/signup', async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Email already taken / incorrect inputs"
    })
  }

  const userExists = await User.findOne({ username: username, password: password });

  if (userExists) {
    return res.status(411).json({
      message: "Email already taken / incorrect inputs"
    })
  }

  try {
    const hash = bcrypt.hashSync(password, process.env.SALT_ROUNDS)

    const createUser = User.create({
      username,
      password: hash,
      firstName,
      lastName
    });

    const token = jwt.sign({ userId: createUser._id }, process.env.JWT_SECRET);

    const randomBalance = Math.floor(Math.random() * 10000) + 1;

    const Balance = await Account.create({
      userId: createUser._id,
      balance: randomBalance
    })

    res.status(200).json({
      message: 'User created successfully',
      token: token
    })
  } catch (error) {
    res.json({
      message: 'error while creating user'
    })
  }
})

const signinBody = z.object({
  username: z.string().email(),
  password: z.string().min(6)
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: 'invalid inputs'
    })
  }

  try {
    const user = await User.findOne({
      username
    });

    if (!user) {
      return res.status(411).json({
        message: 'invalid credentials'
      })
    }

    const result = bcrypt.compareSync(password, user.password)

    if (!result) {
      return res.status(411).json({
        message: 'invalid credentials'
      })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      token
    })
  } catch (error) {
    res.status(411).json({
      message: 'Error while logging in'
    })
  }
})

const updateBody = z.object({
  password: z.string().email().optional(),
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional()
})

router.put('/', authMiddlware, async (req, res) => {
  const userId = req.userId;
  let { password, firstName, lastName } = req.body;

  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: 'invalid inputs'
    })
  }

  let updateObject = {
    ...(password !== undefined ? { password } : {}),
    ...(firstName !== undefined ? { firstName } : {}),
    ...(lastName !== undefined ? { lastName } : {})
  }

  if (password) {
    const hash = bcrypt.hashSync(password, process.env.SALT_ROUNDS)

    updateBody.password = hash
  }

  try {

    await User.findOneAndUpdate(
      { _id: userId },
      updateObject
    )

    res.status(200).json({
      message: 'Updated successfully'
    })
  } catch (error) {
    res.status(411).json({
      message: 'Error while updateing information'
    })
  }
})

router.get('/bulk', async (req, res) => {
  const filterName = req.query.filter || "";

  const users = await User.find({
    $or: [{
      firstName: {
        $regex: filterName
      }
    }, {
      lastName: {
        $regex: filterName
      }
    }]
  }).select('username firstName lastName')

  if (!users) {
    res.json({
      message: 'User not found'
    })
  }

  res.status(200).json({
    users
  })
})

module.exports = {
  router
}
