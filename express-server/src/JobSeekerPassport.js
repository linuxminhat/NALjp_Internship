const passport  = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {Jobseeker} = require('./models')
const config = require('./config/config')


passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.authentication.jwtSecret
    }, async function(jwtPayload, done){
        try {
            const jobseeker = await Jobseeker.findOne({
                where: {
                    id: jwtPayload.id
                }
            })
           if(!jobseeker){
                return done(new Error(), false)
           }
           return done(null, jobseeker)
        }catch(error){
            return done(new Error(), false)
        }
    })
)


module.exports  = null
