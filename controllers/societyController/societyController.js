const societyModel = require('../../models/societyModel/societyModel.js');

// Add a new society
exports.addSociety = async (req, res) => {
  const { societyName, address, city, state, contactNo, registrationNo, email, houses, status } = req.body;

  // Validate fields
  if (!societyName || !address || !city || !state || !contactNo || !registrationNo || !email || !houses) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const societyData = {
      societyName,
      address,
      city,
      state,
      contactNo,
      registrationNo,
      email,
      houses,
      status: status || 'Approved', 
    };

    // Call the model function to save society
    const result = await societyModel.createSociety(societyData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding society:', error);
    res.status(500).json({ message: 'Error adding society', error: error.message });
  }
};

// Get all societies
exports.getAllSocieties = async (req, res) => {
  try {
    const societies = await societyModel.getAllSocieties();

    // Format createdAt timestamp for each society
    const formattedSocieties = societies.map(society => {
      if (society.createdAt && society.createdAt.seconds) {
        const date = new Date(society.createdAt.seconds * 1000); // Convert seconds to milliseconds
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          dateStyle: 'long',
        }).format(date);

        return { ...society, createdAt: formattedDate };
      }
      return society;
    });

    res.status(200).json({ societies: formattedSocieties });
  } catch (error) {
    console.error('Error fetching societies:', error);
    res.status(500).json({ message: 'Error fetching societies', error: error.message });
  }
};

// Get a single society by ID
exports.getSocietyById = async (req, res) => {
  const { id } = req.params;

  try {
    const society = await societyModel.getSocietyById(id);
    res.status(200).json({ society });
  } catch (error) {
    console.error('Error fetching society by ID:', error);
    res.status(500).json({ message: 'Error fetching society by ID', error: error.message });
  }
};

// Update a society by ID
exports.updateSociety = async (req, res) => {
  const { id } = req.params;
  const { societyName, address, city, state, contactNo, registrationNo, email, houses, status } = req.body;

  // Validate fields
  if (!societyName || !address || !city || !state || !contactNo || !registrationNo || !email || !houses) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const societyData = {
      societyName,
      address,
      city,
      state,
      contactNo,
      registrationNo,
      email,
      houses,
      status: status || 'Pending',
    };

    // Call model to update society
    const result = await societyModel.updateSociety(id, societyData);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating society:', error);
    res.status(500).json({ message: 'Error updating society', error: error.message });
  }
};

// Delete a society by ID
exports.deleteSociety = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await societyModel.deleteSociety(id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting society:', error);
    res.status(500).json({ message: 'Error deleting society', error: error.message });
  }
};
