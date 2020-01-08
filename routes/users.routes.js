const {Router} = require('express');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');

const router = Router();

router.get('/currentUser', auth, async ({user}, res) => {
    try {
        const _id = user.userId;
        const currentUser = await User.findById(_id);
        if (!currentUser) {
            return res.status(401).json({message: 'Пользователь не авторизован'});
        }
        const {name, surname, email, login} = currentUser;
        return res.json({
            name, surname, email, login
        })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

router.put('/currentUser', auth, async (req, res) => {
    try {
        const _id = req.user.userId;
        const currentUser = await User.findById({_id});
        if (!currentUser) {
            return res.status(401).json({message: 'Пользователь не авторизован'});
        }
        const {name, surname} = req.body;
        currentUser.name = name;
        currentUser.surname = surname;
        await currentUser.save();
        return res.json({message: 'Обновлено'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

module.exports = router;
