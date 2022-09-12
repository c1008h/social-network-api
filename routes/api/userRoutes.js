const router = require('express').Router();

const {
    getAllUser,
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route('/')
.get(getAllUser)
.post(createUser);

router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router.route('/:id/friend/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router; 