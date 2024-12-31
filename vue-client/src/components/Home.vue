<template>
     <div >
      <v-parallax src="https://images.unsplash.com/photo-1423655156442-ccc11daa4e99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
      <v-layout
      align-left
      column
      justify-center
      style="margin-top: -150px;"
    >
      <h1 class="display-2 font-weight-thin mb-3 blue--text"><strong>Online Job Portal</strong></h1>
      <h4 class="subheading blue--text"><strong>Applicants create a Jobseeker Profile, and Submit your application today!</strong></h4>
        <h4 class="subheading blue--text"><strong>Employers create a Employer Profile, and Post a job, Find the perfect Applicant</strong></h4>
    </v-layout>
      <a style="width: 180px; display:block; margin-top:-100px;background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@anthonydelanoix?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Anthony DELANOIX"><span style="display:inline-block;padding:2px 3px;"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Anthony DELANOIX</span></a>
      </v-parallax>
     <v-container fluid style="background-color: #103856;">
         <v-layout row>
               <h2 style="margin: 0 auto; text-align: center; color: #fff;"> WHAT ARE YOU <span>LOOKING FOR?</span></h2>
          </v-layout>
        <v-layout row>
          <div style="width: 25%; margin: 0 auto;">
            <v-layout row>
              <v-flex md4 xs12>
                      <a href="javascript:void(0);" v-scroll-to="'#jobs'" style="text-decoration: none;"><v-btn color="success" style="text-decoration: none;">Jobs</v-btn></a>
                  </v-flex>
                  <v-flex md4 xs12>
                      <router-link :to="{name:'view.job.applicants', params:{employerId: 10}}" style="text-decoration: none;"><v-btn color="primary"> Resumes</v-btn></router-link>
                  </v-flex>
                  <v-flex md4 xs12>
                    <router-link :to="{name:'employer.post.job', params:{employerId: 10}}" style="text-decoration: none;"><v-btn color="danger">Post Jobs</v-btn></router-link>
                  </v-flex>
              </v-layout>
          </div>
      </v-layout>
     </v-container>

      <v-container fluid grid-list-md  ref="formContainer">
        <v-layout row wrap>
           <v-flex xs12 style="max-width: 1200px; margin: 0 auto;">
                <h2>Search Jobs</h2>
                <v-text-field outline label="Search..." append-icon ="search"
                  v-model="search">
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout column>
               <v-flex x12 justify-center style="max-width: 1200px; margin: 0 auto;">
                  <v-data-iterator
                    :items="jobs"
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"
                    content-tag="v-layout"
                    row
                    wrap
                    >
                      <template v-slot:item="props">
                          <v-flex xs12  class="job-container" id="jobs">
                              <v-toolbar color="primary" class="mobile-toolbar">
                                <div v-if="props.item.Employer.EmployerProfile">
                                  <img :src="props.item.Employer.EmployerProfile.logo" style="margin-left: -25px; display: block; padding: 1em; border-radius:50%;"/>
                                </div>
                                <div class="job-container-title">
                                  <h2><span class="white--text">{{ props.item.jobTitle}}</span></h2>
                                  <div class="white--text">at {{props.item.Employer.company}} - near {{props.item.location}}</div>
                                </div>
                                <v-spacer  class="desktop-spacer mobile-spacer"></v-spacer>
                                <div class="job-type"><span class="yellow--text"><strong>{{props.item.type}}</strong></span></div>
                              </v-toolbar>
                                <v-card>
                                  <div style="padding: 1em;">
                                    <span >{{props.item.description.substring(0, (props.item.description.length/4))}}...</span>
                                  </div>
                                  <v-layout justify-end>
                                    <v-card-actions justify-right>
                                        <router-link v-bind:to="{name:'view.job.detail', params: {jobId: props.item.id}}" style="text-decoration: none;" v-if="!$store.state.isEmployerLoggedIn"><v-btn color="success">Apply</v-btn></router-link>
                                      </v-card-actions>
                                  </v-layout>
                                </v-card>
                            </v-flex><!-- end of job-container -->
                        </template>
                      </v-data-iterator>
               </v-flex>


        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                        <h2>Featured Companies</h2>
                        <v-layout row wrap>
                            <v-flex xs12 md4 v-for="company in featured_companies" :key="company.id">
                                <v-card>
                                  <div v-if="company.coverphoto">
                                    <v-img
                                    :src="company.coverphoto"
                                    aspect-ratio="2.75"
                                  ></v-img>
                                  </div>
                                  <div v-else>
                                    <v-img
                                    src="http://placehold.it/450x450"
                                    aspect-ratio="2.75"
                                  ></v-img>
                                  </div>


                                  <v-card-title primary-title>
                                    <div>
                                      <h1 class="headline mb-0">{{company.company}}</h1>
                                    </div>
                                  </v-card-title>

                                  <v-card-actions>
                                    <router-link :to="{name:'view.employer.detail', params:{employerId: company.id}}" style="text-decoration: none;"><v-btn color="orange" >View Company</v-btn></router-link>
                                  </v-card-actions>
                                </v-card>
                            </v-flex>

                        </v-layout>
                </v-flex><!--  end of companies-->
        </v-layout>
    </v-container>
    </div>
</template>
<script>
// import data from '../data'
import Vue from 'vue'
import JobService from '../services/JobService'
import EmployerService from '../services/EmployerService'
import LoadingOverlay from 'vue-loading-overlay'
import _ from 'lodash'
Vue.use(LoadingOverlay)
export default {
  created () {
    this.getAllJobs();
    this.getFeaturedCompanies();
  },
  mounted () {
  },
  data: function () {
    return {
      search: '',
      isLoading: false,
      fullPage: false,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 8
      },
      jobs: [],
      card_text: 'Sample Text',
      featured_companies: [],
    }
  },
  methods: {
    async getFeaturedCompanies(){
       this.featured_companies = [];
       this.featured_companies = (await EmployerService.getFeaturedCompanies()).data.data
    },
    async getAllJobs(){
          this.jobs = [];
          this.jobs = (await JobService.viewAllJobs()).data.data;
    },
    async searchJobs () {
      if (this.search.length > 3) {
      }
      if (this.search.length < 4) {
          this.getAllJobs();
      }
    }
  },
  computed: {

  },
  watch: {
     search: _.debounce(async function(value){
      if (value.length > 2) {
           let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: true,
                  onCancel: this.onCancel,
          });
          this.jobs = (await JobService.searchJob(this.search)).data.data;
          if (this.jobs) {
             loader.hide()
          } else {
              loader.hide()
          }
      }
    })


  }
}
</script>
<style>
.job-container{
  margin: 7px;
}
 .desktop-spacer{
    width: 50%;
}
@media screen and (max-width: 825px) {
  .mobile-toolbar{
    height: 75px;
  }
  .job-container-title{
    width: 65%;
  }
  .job-container-title h2{
    font-size: 1em;
  }
  .mobile-spacer{
    width: 15%;
  }
  .job-type{
    width: 29%;
  }
}

</style>
