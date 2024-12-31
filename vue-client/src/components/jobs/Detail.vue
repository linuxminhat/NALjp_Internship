<template>
  <div>
      <v-container>
         <v-layout row wrap>
           <v-flex xs12 md9 pa-2>
              <v-card>
                <v-toolbar color="primary">
                <div>
                 <h2 v-if="job" class="white--text">{{job.jobTitle}}</h2>
                   <div class="white--text">at {{ company.company }} - {{job.location}}</div>
                </div>
                </v-toolbar>

                <div style="padding: 1em;">
                  <h2>Description</h2>
                 <p v-if="job" >{{job.description}}</p>
                </div>
              </v-card>
           </v-flex>
             <v-flex xs12 md3 pa-2>
               <v-card>
                <v-toolbar color="primary" class="white--text">
                 Job Details
                </v-toolbar>
                  <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title><router-link :to="{name:'view.employer.detail', params: {employerId: company.id}}" v-if="company.id"><span>Visit Company Page</span></router-link></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                  <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Location: <span v-if="job">{{job.location}}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                  <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Type: <span v-if="job">{{job.type}}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

                 <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Job Posted: <span v-if="job">{{job.createdAt | formateDate }}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>



                  <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Last Date To Apply: <span v-if="job">{{job.job_ending | formateDate }}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>


                 <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{company.company}} Representative: <span>{{ company.representative }}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>


                  <div>
                   <v-layout row wrap>
                      <v-flex xs6>
                           <v-list-tile v-if="!this.$store.state.isJobseekerLoggedIn && !this.$store.state.isEmployerLoggedIn">
                  <v-list-tile-content>
                    <v-list-tile-title><span style="color: red; font-size: 0.911em;"><strong>To Apply Please Login In</strong></span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

                <div v-if="this.$store.state.isJobseekerLoggedIn && !alreadyApplied">
                 <v-list-tile>
                    <v-list-tile-content>
                        <div  class="justify-center text-xs-center">
                          <a href="javascript:void(0);" style="text-decoration: none;" justify-center @click="applyForJob"><v-btn color="success" style="min-width: 200px;">Apply</v-btn></a>
                        </div>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </div>


                 <v-list-tile v-if="this.$store.state.isJobseekerLoggedIn && alreadyApplied">
                  <v-list-tile-content>
                    <div class="green--text">
                       <v-list-tile-title class="text-xs-center"><strong><span>You've Already Applied</span></strong></v-list-tile-title>
                    </div>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                      </v-flex>
                       <v-flex xs6>
                          <div style="padding: 0.1em;" v-if="this.$store.state.isJobseekerLoggedIn">
                               <span v-if="isFavorited"><a href="#"  @click.prevent="unFavorite" class="favorites">
                                 <v-icon color="red darken-2">fas fa-heart</v-icon>
                              </a>&nbsp;&nbsp;Remove from Favorites</span>
                              <span v-else><a href="#"  @click.prevent="favorite" class="favorites">
                                <v-icon color="red darken-2">far fa-heart</v-icon>
                              </a>&nbsp;&nbsp;Mark as Favorite</span>
                          </div>
                      </v-flex>
                   </v-layout>
                  </div>

                </v-card>
           </v-flex>
         </v-layout>
      </v-container>
  </div>
</template>
<script>
import JobService from '../../services/JobService'
import moment from 'moment'
export default {
  created(){
    this.getJobInfo();
    this.checkExisitingJobApplication();
    this.checkFavoritedJob();
  },
  mounted(){
  },
  data(){
    return {
      job: {},
      company: {},
      alreadyApplied: false,
      isFavorited: false,
    }
  },
  methods: {
    async unFavorite(){
      this.isFavorited = !this.isFavorited;
      let jobseekerID = this.$store.state.jobseeker.id;
      let jobID = this.$store.state.route.params.jobId;
       let jobResponse = (await JobService.removeJobFromFavorites(jobID, jobseekerID)).data.data;
       if (jobResponse) {
        // The favorite was removed
       }
    },
    async favorite(){
      this.isFavorited = !this.isFavorited;
      let jobseekerID = this.$store.state.jobseeker.id;
      let jobID = this.$store.state.route.params.jobId;
      let jobResponse = (await JobService.addJobToFavorites(jobID, jobseekerID)).data.data;
      if (jobResponse) {
       // The favorite was added
      }
    },
    async getJobInfo(){
      this.job = {};
       const jobId = this.$store.state.route.params.jobId;
       let job = (await JobService.viewJob(jobId)).data.data;
       this.job = job;
       this.getCompanyInfo(job.EmployerId);
    },
    async getCompanyInfo(employerID){
      this.company = {}
      const company = (await JobService.employerJob(employerID)).data.data
      this.company = company;
    },
    async applyForJob(){
      let jobseekerId = this.$store.state.jobseeker.id;
      let jobId = this.$store.state.route.params.jobId;
      const applied = (await JobService.applyForJob(jobseekerId, jobId))
          if (applied) {
            // Application sent
          } else {
               // Application was not sent
          }
          this.checkExisitingJobApplication();
    },
    async checkExisitingJobApplication(){
      let jobId = this.$store.state.route.params.jobId;
      if (this.$store.state.jobseeker) {
       let jobseekerId = this.$store.state.jobseeker.id;
       const applied = (await JobService.checkJobApplication(jobseekerId, jobId)).data.data
          if (applied && applied !== null) {
              this.alreadyApplied = true;
          } else {
            // Never applied
          }
      }
    },
    async checkFavoritedJob(){
      let jobId = this.$store.state.route.params.jobId;
      if (this.$store.state.jobseeker) {
       let jobseekerId = this.$store.state.jobseeker.id;
       const markedAsFavorite = (await JobService.checkFavoritedJob(jobId, jobseekerId)).data.data
          if (markedAsFavorite && markedAsFavorite !== null) {
              this.isFavorited = true;
          } else {
              this.isFavorited = false;
          }
      }
    }
  },
  computed: {

  },

  filters: {
    formateDate(date){
      return moment(date).format('MMMM Do YYYY');
    }
  }

}
</script>
<style scoped>
  .favorites{
    text-decoration: none !important;
  }
</style>
