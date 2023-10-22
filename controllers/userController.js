const asyncHandler = require('express-async-handler')
const User = require('../modules/userModules');
const createError = require('../utils/createError');

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

module.exports = { deleteUser };
