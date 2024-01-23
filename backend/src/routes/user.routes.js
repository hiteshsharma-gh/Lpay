import User from '../models/user.model.js'
import { Router } from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import z from 'zod'

const app = express();

app.use(express.json());

const router = Router();

const signupBody = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().max(50),
  lastName: z.string().max(50)
})

router.post('/signup', async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Email already taken / incorrect inputs"
    })
  }

  const userExists = await User.findOne({ username: username, password: password })

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
      })

      const token = jwt.sign({ userId: createUser._id }, process.env.JWT_SECRET)

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

module.exports = {
  router
}
