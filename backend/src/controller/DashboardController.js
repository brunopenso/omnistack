const Spot = require('../model/Spot');
const User = require('../model/User');

module.exports = {
    async show(req, res) {
        const { userid } = req.headers;

        const spots = await Spot.find({ user: userid });

        return res.json(spots);
    }
}