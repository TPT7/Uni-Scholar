const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'unischolar',
    password: 'admin',
    port: 5432,
});

app.use(bodyParser.json());
app.use(cors()); 

//home
app.post('/questions', async (req, res) => {
    const { question } = req.body;

    try {
        await pool.query('INSERT INTO questions (question) VALUES ($1)', [question]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.post('/comments', async (req, res) => {
    const { comment } = req.body;

    try {
        await pool.query('INSERT INTO comments (comment) VALUES ($1)', [comment]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

//login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            if (password === user.password) {
                res.json({ success: true });
            } else {
                console.log('Password does not match');
                res.json({ success: false, message: 'Invalid username or password' });
            }
        } else {
            console.log('Username not found');
            res.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

//signup
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

//history
app.get('/questions', async (req, res) => {
    try {
        const questionsResult = await pool.query('SELECT * FROM questions ORDER BY created_at');
        const commentsResult = await pool.query('SELECT * FROM comments ORDER BY created_at');
        res.json({
            questions: questionsResult.rows,
            comments: commentsResult.rows
        });
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

