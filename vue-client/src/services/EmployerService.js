import Api from './Api';

export default {
 getJobCategories(){
   return Api.get('/job/categories')
 },
 getJobTypes(){
   return Api.get('/job/types')
 },
 createJob(jobInfo){
  return Api.post('/employer/create/job', jobInfo)
 },
 deleteJob(jobInfo){
  return Api.post(`/employer/delete/job/${jobInfo}`)
 },
 updateJob(jobInfo){
  return Api.post('/employer/update/job', jobInfo)
 },
 getEmployerJobs(employerId){
   return Api.get('/employer/' + employerId + '/jobs')
 },
 getInactiveEmployerJobs(employerId){
  return Api.get('/employer/' + employerId + '/inactive/jobs')
 },
 getFeaturedCompanies(){
    return Api.get('/employer/featured/companies')
 },
}
