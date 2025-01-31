
const { db, admin } = require('../../config/firebase'); 
const typeOfEntryCollection = db.collection('typeOfEntries');

// Create a new type of entry
const createTypeOfEntry = async (data) => {
  try {
    const entryRef = typeOfEntryCollection.doc();
    await entryRef.set({
      title: data.title,
      entryType: data.entryType, // 'occasional' or 'regular'
      logo: data.logo, // Logo URL (stored in Firebase Storage)
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { success: true, message: 'Entry added successfully!' };
  } catch (error) {
    throw new Error('Error creating entry: ' + error.message);
  }
};

// Get all type of entries
const getAllTypeOfEntries = async () => {
  try {
    const snapshot = await typeOfEntryCollection.get();
    if (snapshot.empty) {
      throw new Error('No entries found');
    }

    const entries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return entries;
  } catch (error) {
    throw new Error('Error fetching entries: ' + error.message);
  }
};

// Get a single entry by ID
const getTypeOfEntryById = async (id) => {
  try {
    const entryDoc = await typeOfEntryCollection.doc(id).get();
    if (!entryDoc.exists) {
      throw new Error('Entry not found');
    }
    return { id: entryDoc.id, ...entryDoc.data() };
  } catch (error) {
    throw new Error('Error fetching entry: ' + error.message);
  }
};

// Update type of entry
const updateTypeOfEntry = async (id, data) => {
  try {
    const entryRef = typeOfEntryCollection.doc(id);
    await entryRef.update(data);
    return { success: true, message: 'Entry updated successfully' };
  } catch (error) {
    throw new Error('Error updating entry: ' + error.message);
  }
};

// Delete type of entry
const deleteTypeOfEntry = async (id) => {
  try {
    const entryRef = typeOfEntryCollection.doc(id);
    await entryRef.delete();
    return { success: true, message: 'Entry deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting entry: ' + error.message);
  }
};

module.exports = {
  createTypeOfEntry,
  getAllTypeOfEntries,
  getTypeOfEntryById,
  updateTypeOfEntry,
  deleteTypeOfEntry
};
