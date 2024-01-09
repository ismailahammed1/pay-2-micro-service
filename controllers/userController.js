const asyncHandler = require('express-async-handler')
const createError = require('../utils/createError');
const User = require('../modules/userModules');


const deleteUser = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.params.id;
        // Find the user by their ID and remove it from the database
        const deletedUser = await User.findById(userId);
    
        if (req.userId !== deletedUser._id.toString()) {
            return next(createError(403, "You can delete only your account!"));
        }
       
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User deleted.");
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

    
const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  try {
      const userData = await User.findById(userId);

      if (!userData) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json(userData);
  } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
  }
});


      

module.exports = { deleteUser,getUser };
