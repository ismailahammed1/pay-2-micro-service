const asyncHandler = require('express-async-handler')
const User = require('../modules/userModules');


const deleteUser = asyncHandler(async (req, res) => {
    try {
        const token=req.cookies.accessToken 
        const userId = req.params.id;
        // Find the user by their ID and remove it from the database
        const deletedUser = await User.findByIdAndRemove(userId);
    
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found.' });
        }
    
        res.status(200).json({ message: 'User deleted successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
      }
});

module.exports = { deleteUser };
  