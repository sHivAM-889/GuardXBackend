const { db } = require('../../config/firebase');
const userCollection = db.collection('users');

// Create a new user document
const createUser = async (uid, data) => {
  try {
    await userCollection.doc(uid).set(data);
    return { success: true, message: 'User created successfully!' };
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

// Get user by UID
const getUserById = async (uid) => {
  try {
    const userDoc = await userCollection.doc(uid).get();
    if (!userDoc.exists) {
      throw new Error('User not found');
    }
    return userDoc.data();
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};

// Get user by email
const getUserByEmail = async (email) => {
  try {
    const snapshot = await userCollection.where('email', '==', email).get();
    if (snapshot.empty) {
      throw new Error('User not found');
    }
    return snapshot.docs[0].data();
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};

// Get user by phone
const getUserByPhone = async (phone) => {
  try {
    const snapshot = await userCollection.where('phone', '==', phone).get();
    if (snapshot.empty) {
      throw new Error('User not found');
    }
    return snapshot.docs[0].data();
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};

// Update user
const updateUser = async (uid, data) => {
  try {
    await userCollection.doc(uid).update(data);
    return { success: true, message: 'User updated successfully!' };
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};

// Delete user
const deleteUser = async (uid) => {
  try {
    await userCollection.doc(uid).delete();
    return { success: true, message: 'User deleted successfully!' };
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
};

module.exports = { createUser, getUserById, getUserByEmail, getUserByPhone, updateUser, deleteUser };
