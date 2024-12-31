import Api from './Api';


export default {
    addJobToFavorites(jobId, jobseekerId){
      return Api.get(`/jobseeker/${jobseekerId}/favorite/job/${jobId}`)
    },
    removeJobFromFavorites(jobId, jobseekerId){
      return Api.get(`/jobseeker/${jobseekerId}/favorite/remove/job/${jobId}`)
    },
    checkFavoritedJob(jobId, jobseekerId){
      return Api.get(`/check/jobseeker/${jobseekerId}/favorite/job/${jobId}`)
    },
    viewAllJobs(){
     return Api.get('/jobs/all')
    },
    viewJob(id){
      return Api.get('/job/' + id + '/detail')
    },
    searchJob(value){
      return Api.get('/job/search/' + value)
    },
    employerJob(id){
      return Api.get('/employer/job/' + id + '/detail')
    },
    applyForJob(jobseekerId, jobId){
      return Api.post('/jobseeker/' + jobseekerId + '/job/' + jobId + '/apply')
    },
    checkJobApplication(jobseekerId, jobId){
      return Api.get('/check/jobseeker/' + jobseekerId + '/job/' + jobId + '/application')
    },
    getEmployerJobApplicants(employerId){
      return Api.get(`/employer/${employerId}/job/applicants`)
    }
}

