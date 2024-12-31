const AuthenticationController = require('../controllers/AuthenticationController');
const ProfileController = require('../controllers/ProfileController');
const JobController = require('../controllers/JobController');
const EmployerController = require('../controllers/EmployerController');
const { EmployerProfile } = require('../models')
const { JobseekerProfile } = require('../models')
// const isEmployerAuthenticated = require('../policies/isEmployerAuthenticated.js')
// const isJobseekerAuthenticated = require('../policies/isJobseekerAuthenticated.js')
const multer = require('multer');
const path = require('path')
const directory = __dirname;
const cloudinary = require('cloudinary').v2;

//set your env variable CLOUDINARY_URL or set the following configuration
cloudinary.config({
    cloud_name: 'dnynuxbi6',
    api_key: '174576997298891',
    api_secret: 'fI9q36yisH2O1uTXuhVVT8_zckQ'
}); 
   


let employer_storage = multer.diskStorage({
    destination: function(req, file, cb){
        const uploads = path.join(directory, '../../../uploads/');
        cb(null, uploads)
    },
    filename: function(req, file, cb){
        let date = new Date();
        let time = date.getTime();
        let filename = date.toISOString().replace(/:/g, '-')+'_'+time+'_'+ file.originalname;
        cb(null,   filename)
    }
});






let jobseeker_storage = multer.diskStorage({
    destination: function(req, file, cb){
        const uploads = path.join(directory, '../../../uploads/jobseekers/');
        cb(null, uploads)

    },
    filename: function(req, file, cb){
        let date = new Date();
        let time = date.getTime();
        let filename = date.toISOString().replace(/:/g, '-')+'_'+time+'_'+ file.originalname;
        cb(null,  filename)
    }
});

const imageFilter = (req, file, cb) =>{
    // Set Allowed ext
    const allowedFiletypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = allowedFiletypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = allowedFiletypes.test(file.mimetype);
    if(mimetype && extname){
        cb(null, true)
    }else{
        cb(new Error('File type must be an image: .jpeg, .jpg, or .png!'), false);
    }
}



const documentFilter = (req, file, cb) =>{
      // Set Allowed ext
    const allowedFiletypes = /pdf|doc|docx/;
    // Check ext
    const extname = allowedFiletypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = allowedFiletypes.test(file.mimetype);
    if(mimetype && extname){
        cb(null, true)
    }else{
        cb(new Error('File type must be an document: .doc, .docx, or .pdf!'), false);
    }
}

const employer_upload = multer({
    storage: employer_storage, 
    limits: { fieldSize: 1024 * 1024 * 8 },  
    fileFilter: imageFilter
}).single('file');

const jobseeker_upload = multer({
    storage: jobseeker_storage, 
    limits: {fieldSize: 1024 * 1024 * 8},  
    fileFilter: imageFilter
}).single('file');


const jobseeker_document = multer({
     storage: jobseeker_storage,
     limits: {fieldSize: 1024 * 1024 * 8}, 
     fileFilter: documentFilter
}).single('file');


module.exports = (app) =>{
 
     

 /**** Job Seeker ****/
    // Get employer profile info
    app.get('/jobseeker/:jobseekerId/profile',ProfileController.getJobSeekerProfileInfo)
    // Update jobseeker profile info 
    app.post('/jobseeker/profile/', ProfileController.updateJobseekerProfile)
    // Send employer login credentials
    app.post('/jobseeker/login', AuthenticationController.jobseekerLogin)
    // Send jobseeker registration info
    app.post('/jobseeker/register', AuthenticationController.jobseekerRegister)
    // Apply for a job
    app.post('/jobseeker/:jobseekerId/job/:jobId/apply',  JobController.applyforJob)
    // Check Job seeker application
    app.get('/check/jobseeker/:jobseekerId/job/:jobId/application', JobController.checkJobSeekerApplication)
    // Get all obs jobseeker applied for
    app.get('/jobseeker/:jobseekerId/profile/applications',  ProfileController.getJobAppliedFor)
    // Add Job to favorites
    app.get('/jobseeker/:jobseekerId/favorite/job/:jobid', JobController.addJobToFavorites)
    // Remove Job from favorites
    app.get('/jobseeker/:jobseekerId/favorite/remove/job/:jobid', JobController.removeJobFromFavorites)
    // Check if job is in jobseekers favorites
    app.get('/check/jobseeker/:jobseekerId/favorite/job/:jobId', JobController.checkFavoritedJob)
    // Get list of all jobs in job seeker favorites
    app.get('/jobseeker/:jobseekerId/profile/favorites', ProfileController.getFavoritedJobsForJobseekerProfile)



 /**** Employer ****/
    // Get employer profile info
    app.get('/employer/:employerId/profile', ProfileController.getEmployerProfileInfo)
    // Send employer login credentials
    app.post('/employer/login', AuthenticationController.employerLogin)
    // Send employer registration info
    app.post('/employer/register', AuthenticationController.employerRegister)
    // Update employer profile info
    app.post('/employer/profile/', ProfileController.updateEmployerProfile)
    
    //Get job categories
    app.get('/job/categories', EmployerController.getCategories)
    // Get job types
    app.get('/job/types', EmployerController.getJobTypes)
    // Create job
    app.post('/employer/create/job',  EmployerController.createJob)
    // Delete job doesnt delete from db just makes inactive
    app.post('/employer/delete/job/:jobId', EmployerController.deleteJob)
    // Update job information
    app.post('/employer/update/job', EmployerController.updateJob)
    // Get all jobs that belong to employer
    app.get('/employer/:employerId/jobs', EmployerController.getEmployerJobs)
    //  Get all inactive jobs that belong to employer
    app.get('/employer/:employerId/inactive/jobs', EmployerController.getEmployerInactiveJobs)
    // Get all jobs that belong to employer
    app.get('/employer/featured/companies', EmployerController.getFeaturedCompanies)  
    // Get job applicants that have applied to employer jobs
    app.get(`/employer/:employerId/job/applicants`, EmployerController.getJobApplicants)

    /***** Job ****/   
    // Get all jobs
    app.get('/jobs/all', JobController.viewAllJobs)
    // Search for specific job
    app.get('/job/search/:search', JobController.searchJob)
    // Get individual job details, 
    app.get('/job/:jobId/detail', JobController.viewJob)
    // Get individual company details
    app.get('/employer/job/:employerId/detail', JobController.employerJob)

   
   
   
   
   
   /********************************* Upload Routes *************************************************
    * **********************************************************************************
    * ******************************************************************************************
    * *****************************************************************************************
    */
   
   
   
   
          app.post('/jobseeker/:jobseekerId/jobseeker/photo/upload', function(req, res){
            jobseeker_upload(req, res, async function(err){
                if(err instanceof multer.MulterError){
                    // Multer Error
                    res.status(500).send({
                        'error': err
                    })
                } else if (err){
                    // Unknown error
                    res.status(500).send({
                        'error': err
                    })
                } else {
                    // Everything went fine
                   
                    // const filepath = req.file.path.replace(/\\/g, "/").substring(req.file.path)
                    // const url  = "https://vue-job-portal.herokuapp.com"+ filepath;
                    try {
                      const result = await cloudinary.uploader.upload(req.file.path);
                      if (result) {
                       JobseekerProfile.update({photo: result.secure_url},
                          {where:{ JobseekerId: req.params.jobseekerId }});
                        res.status(200).send({
                          'success': 'Every thing went fine',
                          'url':result.secure_url,
                          'cloudinary': result
                           
                        })
                       }
                    } catch(error){
                        res.status(500).send({
                            'error': error
                        })
                    }
                   
                } 
            })
        })


        app.post('/jobseeker/:jobseekerId/resume/upload', function(req, res){
          jobseeker_document(req, res, async function(err){
                if(err instanceof multer.MulterError){
                    // Multer Error
                    res.status(500).send({
                        'error': err
                    })
                } else if (err){
                    // Unknown error
                    res.status(500).send({
                        'error': err
                    })
                } else {
                    // Everything went fine
                    // local url:
                    //  const filepath = req.file.path.replace(/\\/g, "/").substring(req.file.path)
                    //  const url  = "https://vue-job-portal.herokuapp.com"+ filepath;
                     try {
                        const result = await cloudinary.uploader.upload(req.file.path);
                        if(result){
                          JobseekerProfile.update({resume: result.secure_url},
                            {where: {JobseekerId: req.params.jobseekerId}})
                          res.status(200).send({
                              'success': 'Every thing went fine',
                              'url':result.secure_url,
                              'cloudinary': result
                          })
                        }
                     } catch(error){
                        res.status(500).send({
                            'error': error
                        })
                     }
                 
                } 
                   
               
            })
        })
        
        app.post('/jobseeker/:jobseekerId/coverletter/upload', function(req,  res){ 
          jobseeker_document(req, res, async function(err){
                if(err instanceof multer.MulterError){
                    // Multer Error
                    res.status(500).send({
                        'error': err
                    })
                } else if (err){
                    // Unknown error
                    res.status(500).send({
                        'error': err
                    })
                }  else {
                    // Everything went fine
                    // const filepath = req.file.path.replace(/\\/g, "/").substring(req.file.path)
                    // local url:
                    // const url  = "https://vue-job-portal.herokuapp.com"+ filepath;
                    try {
                       const result = await cloudinary.uploader.upload(req.file.path);
                       if(result){
                        JobseekerProfile.update({coverletter: result.secure_url},
                          {where: {JobseekerId: req.params.jobseekerId}})
                        res.status(200).send({
                            'success': 'Every thing went fine',
                            'url':result.secure_url,
                            'cloudinary': result
                        })
                       }
                    } catch(error){
                        res.status(500).send({
                            'error': error
                        })
                    }
                 
                } 
               
                
            })
        })
        app.post('/employer/:employerId/company/photo/upload', function(req,  res){ 
            employer_upload(req, res,  async function(err){
                if(err instanceof multer.MulterError){
                    // Multer Error
                    res.status(500).send({
                        'error': err
                    })
                } else if (err){
                    // Unknown error
                    res.status(500).send({
                        'error': err
                    })
                }  else {
                    // Everything went fine
                    // const filepath = req.file.path.replace(/\\/g, "/").substring(req.file.path)
                    // local url:
                    // const url  = "https://vue-job-portal.herokuapp.com"+ filepath; 
                    try {
                      const result = await cloudinary.uploader.upload(req.file.path);
                      if(result){
                        EmployerProfile.update({coverphoto: result.secure_url},
                          {where: {EmployerId: req.params.employerId}})
                        res.status(200).send({
                            'success': 'Every thing went fine',
                            'url':result.secure_url,
                            'cloudinary': result
                            
                        })
                      }
                    } catch(error){
                        res.status(500).send({
                            'error': error
                        })
                    }
                  
                } 
                  
            
            })
        })
        app.post('/employer/:employerId/company/logo/upload',  function(req,  res){ 
                  employer_upload(req, res, async function(err){
                    if(err instanceof multer.MulterError){
                        // Multer Error
                        res.status(500).send({
                            'error': err
                        })
                    } else if (err){
                        // Unknown error
    
                        res.status(500).send({
                            'error': err
                        })
                    }  else {
                        // Everything went fine
                        // const filepath = req.file.path.replace(/\\/g, "/").substring(req.file.path)
                        // local url:
                        // const url  = "https://vue-job-portal.herokuapp.com"+ filepath;
                        try {
                            const result = await cloudinary.uploader.upload(req.file.path);
                            if(result){
                                EmployerProfile.update({logo: result.secure_url},
                                    {where: {EmployerId: req.params.employerId}})
                                res.status(200).send({
                                    'success': 'Every thing went fine',
                                    'url':result.secure_url,
                                    'cloudinary': result
                                })
                            }
                           
                        } catch(error){
                            res.status(500).send({
                                'error': error
                            })
                        }
                    } 
                })
                
               
        })

        


        
}