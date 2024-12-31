import Home from '../components/Home'
import EmployerLogin from '../components/authentication/EmployerLogin'
import JobSeekerLogin from '../components/authentication/JobseekerLogin'
import EmployerRegistration from '../components/employer/Register'
import JobSeekerRegistration from '../components/jobseeker/Register'
import EmployerProfile from '../components/employer/profile/Profile.vue'
import JobseekerProfile from '../components/jobseeker/profile/Profile'
import JobDetail from '../components/jobs/Detail.vue'
import EmployerDetail from '../components/employer/Detail'
import EmployerPostJob from '../components/employer/CreateJob'
import EditEmployerJob from '../components/employer/EditJob'
import ViewApplicants from '../components/jobs/ViewApplicants.vue'
import store from '../store'

const routes = [
  {path: '/', component: Home, name:'home'},
  {path: '/employer/login', component: EmployerLogin, name:'employer.login'},
  {path: '/jobseeker/login', component: JobSeekerLogin, name:'jobseeker.login'},
  {path: '/employer/registration', component: EmployerRegistration, name:'employer.registration'},
  {path: '/jobseeker/registration', component: JobSeekerRegistration, name:'jobseeker.registration'},
  {
    path: '/employer/:employerId/profile/',
    component: EmployerProfile,
    name: 'view.employer.profile',
    beforeEnter: (to, from, next) => {
      if (store.state.isEmployerLoggedIn) {
        next()
      } else {
        next({name: 'employer.login'});
      }
    }
  },
  {
    path: '/jobseeker/:jobseekerId/profile/',
    component: JobseekerProfile,
    name: 'view.jobseeker.profile',
    beforeEnter: (to, from, next) => {
      if (store.state.isJobseekerLoggedIn) {
        next()
      } else {
        next({name: 'jobseeker.login'})
      }
    }
  },
  {path: '/job/:jobId/detail', component: JobDetail, name:'view.job.detail'},
  {path: '/employer/:employerId/detail', component: EmployerDetail, name:'view.employer.detail'},
  {
    path: '/employer/:employerId/create/job',
    component:  EmployerPostJob,
    name:'employer.post.job',
    beforeEnter: (to, from, next) => {
      const intenedURL = 'employer.post.job'
      if (store.state.isEmployerLoggedIn) {
        next()
      } else {
         if (intenedURL) {
          next({name: 'employer.login', query: {redirect: intenedURL}})
         } else {
          next({name: 'employer.login'})
         }
      }
    }
  },
  {
    path: '/employer/:employerId/edit/:jobId/job',
    component:  EditEmployerJob,
    name:'edit.employer.job',
    beforeEnter: (to, from, next) => {
      if (store.state.isEmployerLoggedIn) {
        next()
      } else {
        next({name: 'employer.login'})
      }
    }
  },
  {
    path: '/employer/:employerId/delete/job',
    name:'delete.employer.job',
    beforeEnter: (to, from, next) => {
      if (store.state.isEmployerLoggedIn) {
        next()
      } else {
        next({name: 'employer.login'})
      }
    }
},
{
    path: '/employer/:employerId/view/applicants',
    component: ViewApplicants,
    name:'view.job.applicants',
    beforeEnter: (to, from, next) => {
      const intendedURL = 'view.job.applicants';
      if (store.state.isEmployerLoggedIn) {
        next()
      } else {
        if (intendedURL) {
         next({name: 'employer.login', query:{redirect: intendedURL}});
       } else {
         next({name: 'employer.login'})
       }
      }
    }
  }
]

export default routes
