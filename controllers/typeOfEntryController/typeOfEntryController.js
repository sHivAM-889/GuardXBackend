// controllers/typeOfEntryController.js
const typeOfEntryModel = require('../../models/typeOfEntryModel/typeOfEntryModel')
// Add a new type of entry
exports.addTypeOfEntry = async (req, res) => {
  const { title, entryType } = req.body;
  const logo = req.file ? `/uploads/${req.file.filename}` : null;  // Getting the logo file path

  if (!title || !entryType || !logo) {
    return res.status(400).json({ error: 'All fields are required, and an image must be uploaded.' });
  }

  try {
    const result = await typeOfEntryModel.createTypeOfEntry({
      title,
      entryType,
      logo,
    });
    res.status(201).json(result);  // Return success response
  } catch (error) {
    console.error('Error adding entry:', error);
    res.status(500).json({ message: 'Error adding entry', error: error.message });
  }
};

// Get all type of entries
exports.getAllTypeOfEntries = async (req, res) => {
  try {
    const entries = await typeOfEntryModel.getAllTypeOfEntries();
    res.status(200).json({ entries });
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ message: 'Error fetching entries', error: error.message });
  }
};

// Get a single type of entry by ID
exports.getTypeOfEntryById = async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await typeOfEntryModel.getTypeOfEntryById(id);
    res.status(200).json({ entry });
  } catch (error) {
    console.error('Error fetching entry:', error);
    res.status(500).json({ message: 'Error fetching entry', error: error.message });
  }
};

// Update a type of entry by ID
exports.updateTypeOfEntry = async (req, res) => {
  const { id } = req.params;
  const { title, description, entryType } = req.body;

  if (!title || !entryType) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedData = {
      title,
      entryType,
    };
    // If logo is updated, add it to the data
    if (req.file) {
      updatedData.logo = req.file.path;
    }

    const result = await typeOfEntryModel.updateTypeOfEntry(id, updatedData);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).json({ message: 'Error updating entry', error: error.message });
  }
};

// Delete a type of entry by ID
exports.deleteTypeOfEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await typeOfEntryModel.deleteTypeOfEntry(id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Error deleting entry', error: error.message });
  }
};
