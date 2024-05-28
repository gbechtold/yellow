const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: Map, of: String },  // Flexibles Feld für beliebige Schlüssel-Wert-Paare
  type: { type: String, required: true },  // Typ der Notiz, z.B. 'Produkt', 'Unternehmen'
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
