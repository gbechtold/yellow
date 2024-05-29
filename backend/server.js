require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerConfig');
const Note = require('./models/Note'); // Stelle sicher, dass der Pfad korrekt ist!
const cors = require('cors');
app.use(cors());

// Verbinden zur Datenbank
async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
}
connectDB();

app.use(express.json());

// Swagger Dokumentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routen
app.post('/notes', async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({});
        res.status(200).send(notes);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/notes/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send();
        }
        updates.forEach(update => note[update] = req.body[update]);
        await note.save();
        res.send(note);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).send();
        }
        res.send(note);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger docs available on http://localhost:${port}/api-docs`);
});
