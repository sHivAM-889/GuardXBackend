const multer = require('multer');
const path = require('path');

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Store the uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();  // Get file extension (e.g., .jpg, .png)
    
    // Check file type: Accept only .jpg, .jpeg, .png
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
    }

    // Use the current timestamp as part of the filename to avoid conflicts
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });  // Create the upload middleware

module.exports = upload;
