import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null,
    employer: null,
    jobseeker: null,
    currentJobSeeker: null,
    currentEmployer: null,
    job: null,
    isEmployerLoggedIn: false,
    isJobseekerLoggedIn: false,
    createdJob: null,
    currentlyBeingEdited: null,
    successMessage: '',
    currentProfileImagUrl: null,
  },
  plugins: [createPersistedState()],
  mutations: {
    setSuccessMessageMutation(state, message){
      state.successMessage = message;
    },
    setEmployerTokenMutation(state, token){
      state.token = token;
      if (token){
        state.isEmployerLoggedIn = true;
      } else {
        state.isEmployerLoggedIn = false;
      }
    },
    setJobseekerTokenMutation(state, token){
      state.token = token;
      if (token){
        state.isJobseekerLoggedIn = true;
      } else {
        state.isJobseekerLoggedIn = false;
      }
    },
    setEmployerMutation(state, employer){
      state.employer = employer;
    },
    setJobseekerMutation(state, jobseeker){
      state.jobseeker = jobseeker;
    },
    setCurrentJobseekerMutation(state, jobseeker){
      state.currentJobSeeker = jobseeker;
    },
    setCurrentEmployerMutation(state, employer){
      state.currentEmployer = employer;
    },
    setEmployerLogOutMutation(state){
      state.isEmployerLoggedIn = false;
      state.currentEmployer = null;
      state.employer = null;
      state.token = null;
    },
    setJobseekerLogOutMutation(state){
      state.isJobseekerLoggedIn = false;
      state.jobseeker = null;
      state.token = null;
      state.currentJobSeeker = null;
    },
    setCreatedJobMutation(state, job){
      state.createdJob = job;
    },

    setJobCurrentlyBeingEditedMutation(state, job){
      state.currentlyBeingEdited = job;
    },
    setCurrentUploadedProfilePhotoMutation(state, url){
      state.currentProfileImagUrl = url;
    }
  },
  getters: {

  },
  actions: {
    setSuccessMessageAction(context, message){
     context.commit('setSuccessMessageMutation', message);
    },
    setEmployerTokenAction(context, token){
      context.commit('setEmployerTokenMutation', token)
    },
    setJobseekerTokenAction(context, token){
      context.commit('setJobseekerTokenMutation', token)
    },
    setEmployerAction(context, employer){
      context.commit('setEmployerMutation', employer)
    },
    setJobseekerAction(context, jobseeker){
      context.commit('setJobseekerMutation', jobseeker)
    },
    setCurrentJobseekerAction(context, jobseeker){
      context.commit('setCurrentJobseekerMutation', jobseeker)
    },
    setCurrentEmployerAction(context, employer){
      context.commit('setCurrentEmployerMutation', employer)
    },
    setEmployerLogOutAction(context){
      context.commit('setEmployerLogOutMutation');
    },
    setJobseekerLogOutAction(context){
      context.commit('setJobseekerLogOutMutation');
    },
    setCreatedJobAction(context, job){
      context.commit('setCreatedJobMutation', job)
    },
    setJobCurrentlyBeingEditedAction(context, job){
      context.commit('setJobCurrentlyBeingEditedMutation', job)
    },
    setCurrentUploadedProfilePhotoAction(context, url){
      context.commit('setCurrentUploadedProfilePhotoMutation', url)
    }
  }

})
export default store
