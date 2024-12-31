import Api from './Api'
export default {

  updateJobSeekerProfile(info){
    return Api.post('/jobseeker/profile', info)
  },
  updateEmployerProfile(info){
    return Api.post('/employer/profile', info)
  },
  getJobseekerProfile(info){
    return Api.get('/jobseeker/' + info + '/profile', info)
  },
  getEmployerProfile(id){
    return Api.get('/employer/' + id + '/profile', id)
  },
  checkJobsAppliedTo(jobseekerId){
    return Api.get(`/jobseeker/${jobseekerId}/profile/applications`)
  },
  getFavoritedJobs(jobseekerId){
    return Api.get(`/jobseeker/${jobseekerId}/profile/favorites`)
  },
  uploadJobseekerPhoto(jobseekerId, photo){
    const formData = new FormData();
    formData.append('file', photo, photo.name)
     return Api.post(`/jobseeker/${jobseekerId}/jobseeker/photo/upload`, formData)
  },
  uploadResume(jobseekerId, resume){
    const formData = new FormData();
    formData.append('file', resume, resume.name)
     return Api.post(`/jobseeker/${jobseekerId}/resume/upload`, formData)
  },
  uploadCoverLetter(jobseekerId, coverletter){
    const formData = new FormData();
    formData.append('file', coverletter, coverletter.name)
    return Api.post(`/jobseeker/${jobseekerId}/coverletter/upload`, formData)
  },
  uploadCompanyPhoto(employerId, photo){
    const formData = new FormData();
    formData.append('file', photo, photo.name)
    return Api.post(`/employer/${employerId}/company/photo/upload`, formData)
  },
  uploadCompanyLogo(employerId, logo){
    const formData = new FormData();
    formData.append('file', logo, logo.name)
    return Api.post(`/employer/${employerId}/company/logo/upload`, formData)
  },
}
