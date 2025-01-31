const { admin } = require('../../config/firebase.js');
const { createUser, getUserById, getUserByEmail, getUserByPhone, updateUser, deleteUser } = require('../../models/userModal/userModel');

exports.registerUser = async (req, res) => {
  const { email, password, role, phone } = req.body;

  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      phoneNumber: phone,
    });

    // Prepare user data
    const userData = {
      uid: userRecord.uid, // Store UID
      email,
      phone,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Save user data in Firestore
    await createUser(userRecord.uid, userData);

    res.status(201).json({ message: 'User registered successfully!', uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { identifier } = req.body;

  try {
    let user;

    if (identifier.includes('@')) {
      // Fetch user by email
      user = await getUserByEmail(identifier);
    } else {
      // Fetch user by phone
      user = await getUserByPhone(identifier);
    }

    if (!user.uid) {
      throw new Error('User UID is missing');
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Fetch Admin Profile
exports.getAdminProfile = async (req, res) => {
  const { uid } = req.body;

  try {
    const user = await getUserById(uid);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied. Admin only.' });
    }

    res.status(200).json({ message: 'Admin profile fetched successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Admin Profile
exports.updateAdminProfile = async (req, res) => {
  const { uid, email, phone, role } = req.body;

  try {
    const updatedUserData = {
      email,
      phone,
      role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await admin.auth().updateUser(uid, { email, phoneNumber: phone });
    await updateUser(uid, updatedUserData);

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Admin Profile
exports.deleteAdminProfile = async (req, res) => {
  const { uid } = req.body;

  try {
    await admin.auth().deleteUser(uid);
    await deleteUser(uid);

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
