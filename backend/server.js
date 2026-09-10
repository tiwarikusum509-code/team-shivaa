const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// ✅ MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

// ✅ DATABASE PATH
const DB_PATH = path.join(__dirname, 'database', 'users.json');

// ✅ DATABASE FOLDER BANAYEIN
if (!fs.existsSync(path.join(__dirname, 'database'))) {
    fs.mkdirSync(path.join(__dirname, 'database'));
}

// ✅ DATABASE FILE BANAYEIN
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

// ✅ HELPER FUNCTIONS
function readUsers() {
    const data = fs.readFileSync(DB_PATH);
    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

// ========================================
// ✅ API ROUTES
// ========================================

// ✅ TEST API
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true, 
        message: '✅ Backend server is running!',
        timestamp: new Date().toISOString()
    });
});

// ✅ REGISTER API
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password, bgmiId } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email and password are required' 
            });
        }
        
        const users = readUsers();
        
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ 
                success: false, 
                error: 'User already exists' 
            });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = {
            id: Date.now().toString(),
            name: name || email.split('@')[0],
            email: email,
            password: hashedPassword,
            bgmiId: bgmiId || '',
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        writeUsers(users);
        
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            'your-secret-key',
            { expiresIn: '7d' }
        );
        
        res.json({
            success: true,
            message: 'User registered successfully!',
            token: token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                bgmiId: newUser.bgmiId
            }
        });
        
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Server error' 
        });
    }
});

// ✅ LOGIN API
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email and password are required' 
            });
        }
        
        const users = readUsers();
        const user = users.find(u => u.email === email);
        
        if (!user) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid credentials' 
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid credentials' 
            });
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email },
            'your-secret-key',
            { expiresIn: '7d' }
        );
        
        res.json({
            success: true,
            message: 'Login successful!',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                bgmiId: user.bgmiId
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Server error' 
        });
    }
});

// ✅ GET USER PROFILE
app.get('/api/profile/:id', (req, res) => {
    try {
        const users = readUsers();
        const user = users.find(u => u.id === req.params.id);
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                error: 'User not found' 
            });
        }
        
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                bgmiId: user.bgmiId,
                createdAt: user.createdAt
            }
        });
        
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Server error' 
        });
    }
});

// ========================================
// ✅ SERVER START
// ========================================

app.listen(PORT, () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`);
    console.log(`✅ Test API: http://localhost:${PORT}/api/test`);
    console.log(`✅ Register: POST http://localhost:${PORT}/api/register`);
    console.log(`✅ Login: POST http://localhost:${PORT}/api/login`);
});
app.use(cors({
    origin: [
        'https://team-shivaa.tiwarikusum509.workers.dev',
        'http://localhost:5500',
        'http://127.0.0.1:5500'
    ]
}));