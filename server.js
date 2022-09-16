import express from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const app = express();
app.use(express.json())
dotenv.config()

const posts = [
    { name: 'Ted', age: 28 },
    { name: 'Blade', age: 50 },
]
app.listen(8080, () => {
    console.log('connection secured');
})
app.get('/', (req, res) => {
    res.json(posts)
})
app.post('/login', function(req, res) {
    const { name, age } = req.body;
    const user = { name, age };
    const token = jwt.sign(user, process.env.ACCESS_TOKEN)
    res.json({ token })
})