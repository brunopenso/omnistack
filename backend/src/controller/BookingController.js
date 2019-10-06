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

        const ownerSpotSocket = req.connectedUsers[booking.spot.user];

        if (ownerSpotSocket) {
            req.io.to(ownerSpotSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
}