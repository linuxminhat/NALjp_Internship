const passport  = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {Employer} = require('./models')
const config = require('./config/config')


passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.authentication.jwtSecret
    }, async function(jwtPayload, done){
        try {
            const employer = await Employer.findOne({
                where: {
                    id: jwtPayload.id
                }
            })
           if(!employer){
                return done(new Error(), false)
           }
           return done(null, employer)
        }catch(error){
            return done(new Error(), false)
        }
    })
)


module.exports  = null
