<template>
  <div>
    <v-container>
       <v-card>
      <v-layout row wrap>
         <v-toolbar>
              Edit a Job
         </v-toolbar>
      </v-layout>
      <v-layout row wrap >
         <v-flex xs6>
           <div style="padding: 0.25em; margin: 0 auto; width: 70%;">
              <form action="" v-if="!contentStillLoading">
               <v-layout row wrap>
                  <v-flex xs6 pa-1>
                    <v-text-field  label="Job Title" outline v-model="employersJob.jobTitle"></v-text-field>
                 </v-flex>
                 <v-flex xs6 pa-1>
                   <v-text-field  label="Location" outline  v-model="employersJob.location"></v-text-field>
                 </v-flex>
                </v-layout>
                <v-layout row wrap>
                 <v-flex xs12>
                    <v-select label="Job Type" outline :items="jobTypes" item-text="DISTINCT"  v-model="type">

                    </v-select>
                 </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                       <v-flex xs12>
                           <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="employersJob.apply_date"
                              lazy
                              transition="scale-transition"
                              offset-y
                              full-width
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="employersJob.apply_date"
                                  label="Last Date To Apply"
                                  readonly
                                  outline
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="employersJob.apply_date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(employersJob.apply_date)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
                  </v-flex>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 pa-1>
                    <v-select outline label="Category" :items="categories" item-text="name" v-model="categoryChosen">
                    </v-select>
                  </v-flex>
                  <v-flex xs6 pa-1>
                    <v-select outline label="Status" :items="statuses" v-model="status">
                    </v-select>
                  </v-flex>
              </v-layout>
              <v-textarea label="Job Description" outline v-model="employersJob.description"></v-textarea>
              <v-btn color="primary" @click="updateJob">Update Job</v-btn>

            </form>
           </div>
         </v-flex> <!--  end of form flex-->

         <v-flex xs6 v-if="updated">
            <div justify-center>
              <h2 style="text-align:center; margin: 5% auto;"><span style="color: green;">Job Updated!</span></h2>
               <router-link :to="{name:'employer.post.job', params:{employerId: $store.state.employer.id}}" style="display: block; text-align:center; margin: 5% auto;">Back to Post a Job</router-link>
            </div>
         </v-flex>
         <v-flex xs12>
            <router-link :to="{name:'employer.post.job', params:{employerId: $store.state.employer.id}}" style="display: block; text-align:center; margin: 5% auto;">Back to Post a Job</router-link>
         </v-flex>
      </v-layout>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import JobSerivce from '../../services/JobService'
import EmployerService from '../../services/EmployerService'
export default {
  created(){
     this.getJobInfo();
  },
  mounted(){
    this.getCategories();
    this.getJobTypes();
  },
  data(){
    return {
      categoryChosen: '',
      type: '',
      updated: false,
      menu: false,
      contentStillLoading: false,
      employersJob: {
        jobTitle: '',
        location:'',
        description: '',
        apply_date: new Date().toISOString().substr(0, 10),
      },
      categories: [],
      statuses: [
        'Live',
        'Draft'
      ],
      jobTypes: [],
      jobID: '',
    }
  },
  methods: {
     async getJobInfo(){
       this.employersJob = {};
        // Get employer job ID from router parameter
        let jobId = this.$store.state.route.params.jobId;
        this.jobID = jobId;
        // Make request to JobService sending job :id
        let job = (await JobSerivce.viewJob(jobId)).data.data
        // Get response and check if job object is returned and store that in the job object if null is returned then empty job object
        if (job === null) {
            this.employersJob = {}
        } else {
            this.employersJob = job;
            this.contentStillLoading = false;
            // Update the vuex store with the currentEmployer object
            this.$store.dispatch('setJobCurrentlyBeingEditedAction', this.employersJob)
        }
    },

    async getCategories(){
       const catsReturned = await EmployerService.getJobCategories();
        this.categories = catsReturned.data.data;
    },
    async getJobTypes(){
        const jobTypes = (await EmployerService.getJobTypes()).data.data
        this.jobTypes = jobTypes;
    },

     async updateJob(){
      // declare empty object to hold job values
         let jobObj = {};
        // Check for required values and store them in job object
        if (this.employersJob.jobTitle) jobObj.jobTitle = this.employersJob.jobTitle;
        if (this.employersJob.location) jobObj.location = this.employersJob.location;
        if (this.type)jobObj.type = this.type;
        if (this.status) {
          this.status = true;
          jobObj.active = this.status;
        } else {
          this.status = false;
          jobObj.active = this.status;
        }
        if (this.employersJob.description) jobObj.description = this.employersJob.description;
        if (this.employersJob.apply_date) jobObj.job_ending = this.employersJob.apply_date;
        let employerId = this.$store.state.route.params.employerId;
        if (employerId) jobObj.EmployerId = employerId;
        for (var cat in this.categories) {
             if (this.categories[cat].name === this.categoryChosen) {
                    jobObj.JobCategoryId = this.categories[cat].id;
             }
        }
       const updatedJob = await EmployerService.updateJob(jobObj);
        if (updatedJob) {
           this.updated = true;
        }
    },
  }
}
</script>
