const {sequelize} = require('../src/models/')
const Promise = require('bluebird')
const {Jobseeker} = require('../src/models/')
const {Employer} = require('../src/models/')
const {EmployerProfile} =require('../src/models/')
const {Job} = require('../src/models/')
const { JobCategory } = require('../src/models/')
const {JobseekerProfile} =require('../src/models/')


const jobs = require('../seed/jobs.json')
const jobseekers = require('./jobseekers.json')
const employers = require('./employers.json')
const employerprofiles = require('./employer_profiles.json')
const jobcategories = require('./jobcategories.json')
const jobseekerprofiles = require('./jobseeker_profiles.json')

sequelize.sync({force:true})
    .then(async function(){
        await Promise.all(
            employers.map(employer => {
                Employer.create(employer)
            })
        )
        
        await Promise.all(
            jobseekers.map(jobeeker => {
                Jobseeker.create(jobeeker)
            })
        )

        await Promise.all(
            employerprofiles.map(employerprofile => {
                EmployerProfile.create(employerprofile)
            })
        )

        await Promise.all(
            jobseekerprofiles.map(jobseekerprofile => {
                JobseekerProfile.create(jobseekerprofile)
            })
        )

        
        await Promise.all(
            jobcategories.map(jobcategory => {
                JobCategory.create(jobcategory)
            })
        )

        await Promise.all(
            jobs.map(job => {
                Job.create(job)
            })
        )

     
    })
