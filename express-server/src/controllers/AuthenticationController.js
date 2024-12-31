const {Employer} =  require('../models')
const {Jobseeker} =  require('../models')
const {EmployerProfile} = require('../models')
const {JobseekerProfile} = require('../models')
const config = require('../config/config')
const jwt   = require('jsonwebtoken')
//Helper functions

function jwtSignEmployer(employer){
const ONE_WEEK = 60*50*24*7
 return jwt.sign(employer, config.authentication.jwtSecret, {
     expiresIn: ONE_WEEK
 })
}

function jwtSignJobSeeker(jobseeker){
    const ONE_WEEK = 60*50*24*7
     return jwt.sign(jobseeker, config.authentication.jwtSecret, {
         expiresIn: ONE_WEEK
     })
}

module.exports = {
    
    async employerRegister(req, res) {
        try{
            const employer = await Employer.create(req.body)
            const emlProfile = await EmployerProfile.create({
                company: employer.company,
                EmployerId: employer.id
            })
            const employerJSON = employer.toJSON()
            const  employerProfileJSON = emlProfile.toJSON()
            const status = "Registration Successful! Please login to complete your Profile."
           res.send({
            employer: employerJSON,
            token: jwtSignEmployer(employerJSON),
            profile: employerProfileJSON,
            message: status,
           })
        }catch(error){
            res.status(400).send({
                'error': `This email is already in use! - ${error}`
            })
        }
       
    
    },
    async jobseekerRegister(req, res) {
        try{
            const jobseeker = await Jobseeker.create(req.body)
            const jobSeekProfile = await JobseekerProfile.create({
                JobseekerId: jobseeker.id
            })
            const  jobSeekProfileJSON = jobSeekProfile.toJSON()
            const jobseekerJSON = jobseeker.toJSON()
            const status = "Registration Successful! Please login to complete your Profile."
           res.send({
              jobseeker: jobseekerJSON,
              token:   jwtSignJobSeeker(jobseekerJSON),
              profile: jobSeekProfileJSON,
              message: status
           })
        }catch(error){
            res.status(400).send({
                'error': `This email is already in use! - ${error}`
            })
        }
       
    
    },

    async employerLogin(req, res) {
         // Check email
        try{
            const {email, password } = req.body;
            const employer = await Employer.findOne({ 
                where: {
                    email: email
                }
         })
         if(!employer){
               res.status(403).send({
                 'error': 'This email or password is incorrect'
              })     
           }
         // Check password   
         try{
            const isPasswordValid = await employer.comparePassword(password)
            if(!isPasswordValid){
                res.status(403).send({
                'error': 'This email or password is incorrect'
             })     
            }}catch(err){
                res.status(403).send({
                    'error': 'This email or password is incorrect'
                })     
            }
      // If email and password is correct send back jwt token and employer info
        const employerJSON = employer.toJSON()
        res.send({
               employer: employerJSON,
               token: jwtSignEmployer(employerJSON)
        })
        }catch(error){
            res.status(500).send({ error: `An error has occured trying to login`})
        }
    },

    async jobseekerLogin(req, res) {
        // Check email
        try{
            const {email, password } = req.body;
            const jobseeker = await Jobseeker.findOne({ where: { email: email}
          })
            if(!jobseeker){
            res.status(403).send({
                'error': 'This email or password is incorrect'
            })     
            }
        // Check password
        try{
        const isPasswordValid = await jobseeker.comparePassword(password)
            if(!isPasswordValid){
                res.status(403).send({
                    'error': 'This email or password is incorrect'
                })     
            }
        }catch(err){
            res.status(403).send({
                'error': 'This email or password is incorrect'
            })     
        }
        // If email and password is correct send back jwt token and jobseeker info
        const jobseekerJSON = jobseeker.toJSON()
        res.send({
               jobseeker: jobseekerJSON,
               token: jwtSignJobSeeker(jobseekerJSON)
        })
        } catch(error){
            res.status(500).send({ error: `An error has occured while trying to login:`})
        }
    }
    
    
}