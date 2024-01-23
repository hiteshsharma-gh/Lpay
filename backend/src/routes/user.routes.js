import 'dotenv/config';
import User from '../models/user.model.js';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import z from 'zod';

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
    bcrypt.hash(password, process.env.SALT_ROUNDS, function(err, hash) {
      if (err) {
        return res.json({
          message: 'error while hashing'
        })
      }

      const createUser = User.create({
        username,
        password: hash,
        firstName,
        lastName
      });

      const token = jwt.sign({ userId: createUser._id }, process.env.JWT_SECRET);

      res.status(200).json({
        message: 'User created successfully',
        token: token
      })
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

    bcrypt.compare(password, user.password, function(err, result) {
      if (err) {
        return res.json({
          message: 'error while comparing hash'
        })
      }

      if (!result) {
        return res.status(411).json({
          message: 'invalid credentials'
        })
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.status(200).json({
        token
      })
    })
  } catch (error) {
    res.status(411).json({
      message: 'Error while logging in'
    })
  }
})

module.exports = {
  router
}
