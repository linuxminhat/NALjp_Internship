const passport = require('passport')

module.exports = function(req, res, next){
    passport.authenticate('jwt', function(err, jobseeker){
        if(err || !jobseeker){
            res.status(403).send({
                error: 'You do not have access to view this resource.'
            })
        } else{
            req.jobseeker = jobseeker
            next()
        }
    })(req, res, next)
}