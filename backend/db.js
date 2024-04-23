import mongoose from 'mongoose';

// MongoDB connection URI
const mongoURI = 'mongodb+srv://tirthchaklasiya0360:Gb7khWvNExIWdadK@cluster0.8wqdgux.mongodb.net/Crop';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind connection to open event (to get notification of successful connection)
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

export default db;
