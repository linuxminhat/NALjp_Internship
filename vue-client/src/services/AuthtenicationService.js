import Api from './Api'

export default {
  employerLogin (credentials) {
    return Api.post('/employer/login', credentials)
  },
  jobseekerLogin(credentials){
    return Api.post('/jobseeker/login', credentials)
  }
}
