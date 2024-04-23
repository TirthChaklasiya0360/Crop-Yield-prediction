import express from 'express';
import mongoose from 'mongoose';
import ejs from 'ejs';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI
const mongoURI = 'mongodb+srv://tirthchaklasiya0360:Gb7khWvNExIWdadK@cluster0.8wqdgux.mongodb.net/Crop';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind connection to open event (to get notification of successful connection)
db.once('open', function () {
  console.log('Connected to MongoDB successfully!');
});

// Set up session middleware
app.use(session({
  secret: 'your-secret-key', // Change this to a random string
  resave: false,
  saveUninitialized: true,
}));

// Define routes or other server logic here
// For example, you can define routes using Express:
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  // Render the 'index' template with dynamic data
  res.render('login',); // Pass session user data to the template
});

app.get('/register', (req, res) => {
  res.render('signup');
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Passwords match, set user in session
      req.session.user = user;
      res.redirect("http://127.0.0.1:5000");
    } else {
      // Passwords don't match'
      console.log(error);
      res.status(400).send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.post("/reg", async (req, res) => {
  const { fullname, email, username, password } = req.body;
  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    return res.status(400).send('Username already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new User({
      fullName: fullname,
      email: email,
      username: username,
      password: hashedPassword, // Store the hashed password
    });
  await newUser.save();

  // Store user data in session
  req.session.user = newUser;

  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
