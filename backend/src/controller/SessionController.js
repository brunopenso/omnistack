const User = require('../model/User');

//default methods for the MVC controller
//index, show, store, update, destroy

module.exports = {
    async store(req, res) {
        //both codes works. The second with {} get the email attribute inside body and create a local 
        //attribute with the same name
        //const email = req.body.email;
        const { email } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }
        return res.json(user);
    }
};