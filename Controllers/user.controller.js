import User from '../Models/user.model.js';

export const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the User collection
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateUserRoleController = async (req, res) => {
    try {
        const { userId } = req.params; // Get the user ID from the URL
        const { role } = req.body; // Get the new role from the request body

        // Find the user by ID and update their role
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Role updated successfully', updatedUser });
    } catch (error) {
        console.error("Error updating user role: ", error);
        res.status(500).json({ message: "Server error" });
    }
};

