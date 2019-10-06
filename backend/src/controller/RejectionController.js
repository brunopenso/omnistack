const Spot = require('../model/Spot');
const User = require('../model/User');
const Booking = require('../model/Booking');

module.exports = {
    async store(req, res) {
        const {booking_id} = req.params;
        const booking = await Booking.findById(booking_id).populate('spot');
        booking.approved = false;
        await booking.save();

        return res.json(booking);
    }
};