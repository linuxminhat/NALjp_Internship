const passport = require('passport')

module.exports = function(req, res, next){
    passport.authenticate('jwt', function(err, employer){
        if(err || !employer){
            res.status(403).send({
                error: 'You do not have access to view this resource.'
            })
        } else{
            req.employer = employer
            next()
        }
    })(req, res, next)
}