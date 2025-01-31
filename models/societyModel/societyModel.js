const { db, admin } = require('../../config/firebase'); // Firebase instance
const societyCollection = db.collection('societies');


// Create Society
const createSociety = async (data) => {
  try {
    const societyRef = societyCollection.doc(); 
    await societyRef.set({
      societyName: data.societyName,
      address: data.address,
      city: data.city,
      state: data.state,
      contactNo: data.contactNo,
      registrationNo: data.registrationNo,
      email: data.email,
      houses: data.houses,
      status: data.status || 'Approved', 
      createdAt: admin.firestore.FieldValue.serverTimestamp(), 
    });
    return { success: true, message: 'Society added successfully!' };
  } catch (error) {
    throw new Error('Error creating society: ' + error.message);
  }
};

// Get All Societies
const getAllSocieties = async () => {
  try {
    const snapshot = await societyCollection.get(); // Fetch all societies
    if (snapshot.empty) {
      throw new Error('No societies found');
    }

    // Mapping through documents to return the data
    const societies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return societies; // Return the list of societies
  } catch (error) {
    throw new Error('Error fetching societies: ' + error.message);
  }
};
// Get society by ID
const getSocietyById = async (id) => {
  try {
    const societyDoc = await societyCollection.doc(id).get();

    if (!societyDoc.exists) {
      throw new Error('Society not found');
    }

    return { id: societyDoc.id, ...societyDoc.data() };
  } catch (error) {
    throw new Error('Error fetching society: ' + error.message);
  }
};
// Update Society Information
const updateSociety = async (id, data) => {
  try {
    // Ensure there are no undefined values before updating
    for (const key in data) {
      if (data[key] === undefined) {
        data[key] = null; // Replace undefined values with null or a default value
      }
    }

    const societyRef = societyCollection.doc(id); 
    await societyRef.update(data); // Update the document with new data
    return { success: true, message: 'Society updated successfully' };
  } catch (error) {
    throw new Error('Error updating society: ' + error.message);
  }
};

// Delete Society
const deleteSociety = async (id) => {
  try {
    const societyRef = societyCollection.doc(id); // Get the document by ID
    await societyRef.delete();  // Delete the document from Firestore
    return { success: true, message: 'Society deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting society: ' + error.message);
  }
};


module.exports = { createSociety, getAllSocieties, updateSociety, deleteSociety , getSocietyById };