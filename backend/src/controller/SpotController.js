const Spot = require('../model/Spot');
const User = require('../model/User');
module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech});

        return res.json(spots);
    },
    async store(req,res) {
        const { filename } = req.file;
        const { company, techs, price} = req.body;
        const { userid } = req.headers;

        const user = await User.findById(userid);
        if (!user) {
            return res.status(400).json('user does not exists');
        }
        let spot = await Spot.find({ company });
        
        if (!spot) {
            spot = await Spot.create({
                user: userid,
                thumbnail: filename,
                company,
                techs: techs.split(',').map(tech => tech.trim()),
                price
            });
        }

        return res.json(spot);
    }
}