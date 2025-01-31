const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { registerUser, loginUser, getAdminProfile, updateAdminProfile, deleteAdminProfile } = require('./controllers/authController/authController');
const societyController = require ('./controllers/societyController/societyController')
const typeOfEntryController = require('./controllers/typeOfEntryController/typeOfEntryController');
const upload = require('./config/multer');
const app = express();
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.json());
// Routes for Auth
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/get-admin', getAdminProfile);
app.put('/update-admin', updateAdminProfile);
app.delete('/delete-admin', deleteAdminProfile);
// Routes for Society
app.post('/api/add-society', societyController.addSociety);
app.get('/api/get-all-societies', societyController.getAllSocieties);
app.put('/api/update-society/:id', societyController.updateSociety);  
app.delete('/api/delete-society/:id', societyController.deleteSociety);  
app.get('/api/get-society/:id', societyController.getSocietyById)
// Routes for Type of Entries
app.post('/api/add-type-of-entry', upload.single('logo'), typeOfEntryController.addTypeOfEntry); 
app.get('/api/get-all-type-of-entries', typeOfEntryController.getAllTypeOfEntries);
app.get('/api/get-type-of-entry/:id', typeOfEntryController.getTypeOfEntryById);
app.put('/api/update-type-of-entry/:id', upload.single('logo'), typeOfEntryController.updateTypeOfEntry);
app.delete('/api/delete-type-of-entry/:id', typeOfEntryController.deleteTypeOfEntry);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
