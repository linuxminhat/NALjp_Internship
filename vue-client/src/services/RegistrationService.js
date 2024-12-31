import Api from './Api'

export default {
  employerRegister (a) {
    return Api.post('/employer/register', a)
  },
  jobseekerRegister (a) {
    return Api.post('/jobseeker/register', a)
  }

}
