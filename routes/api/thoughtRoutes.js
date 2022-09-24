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

router.route('/').get(getAllUser)

router.route('/').post(createUser);

router.route('/:id').get(getUserById)
router.route('/:id').put(updateUser)
router.route('/:id').delete(deleteUser);

router.route('/:id/friend/:id').post(addFriend)
router.route('/:id/friend/:id').delete(deleteFriend)

module.exports = router; 