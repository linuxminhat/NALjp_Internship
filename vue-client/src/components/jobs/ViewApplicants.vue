<template>
  <div>
     <v-container>
        <h1 style="text-align:center;">View Applicants:</h1>
       <v-layout row wrap v-if="noApplicants">
         <v-flex>
           <h2>No Applicants at this time. Check back later.</h2>
         </v-flex>
       </v-layout>
       <v-layout row wrap v-if="!noApplicants">
            <v-flex xs12 v-for="applicant in applicants" :key="applicant.id" style="max-width: 1200px; margin: 10px auto;">
              <v-toolbar color="primary">
                  <h2><span class="white--text">{{ applicant.Jobseeker.name }} - applying for <span>{{applicant.Job.type}}</span> </span>&nbsp;<strong><span class="white--text"> <span style="text-decoration: underl">{{applicant.Job.jobTitle}}</span> position</span></strong></h2>
              </v-toolbar>
              <v-card>
              <table>
                <thead>
                  <tr class="table-row">
                    <th></th>
                    <th>Resume</th>
                    <th>Cover Letter</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                <tr class="table-row">
                  <td v-if="applicant.Jobseeker.JobseekerProfile.photo === null"><img src="http://placehold.it/180x180" alt="No Photo" style="padding: 1em; border-radius: 50%;"></td>
                   <td v-else><img :src="applicant.Jobseeker.JobseekerProfile.photo" :alt="applicant.Jobseeker.name" style="padding: 1em; border-radius: 50%; width: 200px; height: 200px;"></td>
                  <td v-if="applicant.Jobseeker.JobseekerProfile.resume"><a :href="applicant.Jobseeker.JobseekerProfile.resume" class="overflow" target="_blank">{{applicant.Jobseeker.JobseekerProfile.resume}}</a></td>
                  <td v-else>No Resume Available</td>
                  <td v-if="applicant.Jobseeker.JobseekerProfile.coverletter"> <a :href="applicant.Jobseeker.JobseekerProfile.coverletter" class="overflow" target="_blank">{{applicant.Jobseeker.JobseekerProfile.coverletter}}</a></td>
                  <td v-else>No Cover Letter Available</td>
                  <td v-if="applicant.Jobseeker.email">{{applicant.Jobseeker.email}}</td>
                  <td v-if="applicant.Jobseeker.JobseekerProfile.address">{{applicant.Jobseeker.JobseekerProfile.address}}</td>
                  <td v-if="applicant.Jobseeker.JobseekerProfile.phone">{{applicant.Jobseeker.JobseekerProfile.phone}}</td>
                  <td v-if="applicant.Jobseeker.JobseekerProfile.gender">{{applicant.Jobseeker.JobseekerProfile.gender}}</td>
                </tr>
                </tbody>
              </table>
              </v-card>
            </v-flex>
       </v-layout>

     </v-container>
  </div>
</template>
<script>
import JobService from '../../services/JobService'
export default {
  created(){
    this.getApplicants();
  },
  mounted(){
  },
  data(){
    return {
      applicants: [],
      noApplicants: true,
      search: '',
    }
  },
  methods: {

     async getApplicants(){
        const employerId = this.$store.state.route.params.employerId
        const applicants = (await JobService.getEmployerJobApplicants(employerId)).data.data;
        if (applicants.length > 0) {
          this.noApplicants = false;
          this.applicants = applicants;

        } else {

          this.noApplicants = true;
        }
     }
  }
}
</script>
<style>
.table-row >th {
  text-align: left;
  padding-left: 10px;
}
.table-row >td{
  text-align: left;
  padding: 1em;
}
.overflow{
  display: block;
  white-space: nowrap;
  width: 152px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
