import express from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const app = express();
app.use(express.json())
dotenv.config()

const posts = [
    { name: 'Ted', age: 28, post: '1p' },
    { name: 'Blade', age: 50, post: '2p' },
    { name: 'Aphiwe', age: 22, post: '3p' }
]
app.listen(8080, () => {
    console.log('connection secured');
})
app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(el => el.name === req.user.name))
})
app.post('/login', function(req, res) {
    const { name, age } = req.body;
    const user = { name, age };
    const token = jwt.sign(user, process.env.ACCESS_TOKEN)
    res.json({ token })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401)
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403)
        req.user = user;
        next()
    })
}