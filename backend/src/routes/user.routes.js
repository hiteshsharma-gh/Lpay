import express, { Router } from 'express';
import jwt from 'jsonwebtoken'
import z from 'zod'

const app = express();

app.use(express.json());

const router = Router();

const usernameSchema = z.string().email();
const passwordSchema = z.string().min(6);
const fnameSchema = z.string().max(50)
const lnameSchema = z.string().max(50)

router.get('/signup', (req, res) => {
  const { username, password, firstName, lastName } = req.body;
})

module.exports = {
  router
}
