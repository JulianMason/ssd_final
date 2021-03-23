const User = require('../models/User')

exports.login = function(req, res) {
    res.render("login", {
        layout: 'login'
    })
}

exports.landing_page = async(req, res) => {
    try {
        const user = await User.find({ user: req.user.email }).lean();
        res.render('dashboardA', {
            name: req.user.name,
            //coursework
        })
    } catch(err) {
        console.error(err);
        res.render('/views/error/500.hbs');
    }
    
}

