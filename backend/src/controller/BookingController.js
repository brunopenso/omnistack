const Spot = require('../model/Spot');
const User = require('../model/User');
const Booking = require('../model/Booking');

module.exports = {
    async store(req, res) {
        const { userid } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: userid,
            spot: spot_id,
            date
        });

        //load dependencies
        await booking.populate('spot').populate('user').execPopulate();

        return res.json(booking);
    }
}