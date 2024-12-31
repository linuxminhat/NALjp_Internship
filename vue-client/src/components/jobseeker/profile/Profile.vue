<template>
  <v-container>
     <v-layout row wrap>
    <v-flex lg3 md3 xs12  class="section-container">
        <file-upload
         upload_header="Update Your Profile Photo"
         file_type="image"
         upload_label="Choose Photo"
         upload_name="profilephoto"
         profileType="jobseeker"
         allowedTypes=".jpeg .jpg .png .gif"
         :profileID="this.$store.state.route.params.jobseekerId"
         >
      </file-upload>
      <br/>
      <file-upload
         upload_header="Update Your Resume"
         file_type="document"
         upload_label="Choose File"
         upload_name="resume"
         profileType="jobseeker"
         allowedTypes=".pdf .doc .docx"
         :profileID="this.$store.state.route.params.jobseekerId"
         >
      </file-upload>
      <br/>
       <file-upload
         upload_header="Update Your Cover Letter"
         file_type="document"
         upload_label="Choose File"
         upload_name="coverletter"
         profileType="jobseeker"
         allowedTypes=".pdf .doc .docx"
         :profileID="this.$store.state.route.params.jobseekerId"
         >
      </file-upload>
      <br/>
    </v-flex>


    <v-flex lg5 md5 xs12  class="section-container">
      <v-card class="form-container">
        <v-toolbar>
         <h2 class="profile-header">Update Your Profile Information</h2>
        </v-toolbar>
        <v-list two-line>

          <form action="" class="form">
            <v-flex xs12 d-flex>
                <v-text-field label="Address" outline v-model="joBSeeker.address" @change="inputChange(joBSeeker.address)"></v-text-field>
            </v-flex>

            <v-flex xs12 d-flex>
               <v-text-field label="Phone" outline v-model="joBSeeker.phone" @change="inputChange(joBSeeker.phone)"></v-text-field>

            </v-flex>



            <v-flex xs12  d-flex>
                <v-select
                :items="genders"
                outline
                label="Gender"
                v-model="joBSeeker.gender"
                @change="inputChange(joBSeeker.gender)"
                solo
                >
                </v-select>

            </v-flex>
             <v-flex xs12 d-flex>
               <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="joBSeeker.dob"
                  @change="inputChange(joBSeeker.dob)"
                  label="Birthday date"
                  readonly
                  outline
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="joBSeeker.dob"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
              </v-menu>
            </v-flex>
             <v-flex xs12  d-flex>
               <v-textarea
                 maxlength="300"
                 outline
                 textarea
                 label="Short Bio"
                 v-model="joBSeeker.bio"
                 value=""
               ></v-textarea>

             </v-flex>
              <v-flex xs12>
               <p>Max Length 130 Characters</p>
              </v-flex>
             <v-flex xs12>
                <v-btn flat color="orange" @click="updateProfile" ref="updateJobSeeker">Update</v-btn>
             </v-flex>

              <v-flex xs12>
                 <span v-if="alertSubmit"><strong style="color: red;">Please submit your information</strong></span>
              </v-flex>
          </form>
        </v-list>
      </v-card>
    </v-flex>


    <v-flex lg4 md4 xs12 class="section-container" style="max-width: 650px;">
          <v-card>
            <v-toolbar>
              <h2 class="profile-header"><span v-if="this.$store.state.jobseeker">{{this.$store.state.jobseeker.name}}'s Profile information</span></h2>
          </v-toolbar>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Address: <span v-if="this.$store.state.currentJobSeeker">{{this.$store.state.currentJobSeeker.address}}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>


            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Phone: <span v-if="this.$store.state.currentJobSeeker">{{this.$store.state.currentJobSeeker.phone}}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>




            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Gender: <span v-if="this.$store.state.currentJobSeeker">{{ this.$store.state.currentJobSeeker.gender }}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>


            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Birthdate: <span v-if="this.$store.state.currentJobSeeker">{{ this.$store.state.currentJobSeeker.dob }}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>



            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Resume: <a :href="this.$store.state.currentJobSeeker.resume" v-if="this.$store.state.currentJobSeeker"><span>{{ this.$store.state.currentJobSeeker.resume | shortenURL }}</span></a></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Cover Letter: <a :href="this.$store.state.currentJobSeeker.coverletter" v-if="this.$store.state.currentJobSeeker"><span>{{ this.$store.state.currentJobSeeker.coverletter | shortenURL }}</span></a></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>


             <div style="padding: 0.3em;  word-wrap: break-word;">
               <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Bio:</v-list-tile-title>
                     </v-list-tile-content>
                </v-list-tile>
                    <p v-if="this.$store.state.currentJobSeeker" style="padding: 1em;"> {{this.$store.state.currentJobSeeker.bio | shortenString}}...</p>
             </div>
          </v-card>
          <br/>
          <v-card>
          <v-toolbar>
            <h2 class="profile-header">Profile Completion Status</h2>
          </v-toolbar>
            <v-layout row wrap>
            <v-flex xs3 >
              <div style="padding: 1.3em;">
              <v-progress-circular
                :rotate="-90"
                :size="100"
                :width="15"
                :value="progressStatus"
                color="primary"
              >
                {{ progressStatus.toFixed(0) }}%
              </v-progress-circular>
              </div>
            </v-flex>

          <v-flex xs9 justify-center>
            <h3>Steps to Complete:</h3>
            <div v-for="step in stepsToComplete" :key="step">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ step }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            </div>
             <div v-if="allStepsComplete"><router-link :to="{name:'home'}" style="text-decoration:none;"><v-btn color="success" style="width: 250px;">Apply For Jobs</v-btn></router-link></div>
            </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <br/>
        <br/>
        <v-flex xs12 class="section-container">
          <v-card>
              <v-toolbar>
                <h2>Jobs You've Applied To</h2>
              </v-toolbar>
                  <v-data-table
                    :headers="tableHeaders"
                    :items="jobApplications"
                    hide-actions
                    :pagination.sync="pagination"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.Job.jobTitle }}<br/>&nbsp;&nbsp;&nbsp;{{ props.item.type }}</td>
                         <td>{{ props.item.Job.location }}</td>
                         <td>{{ props.item.Job.date_posted | formateDate}}</td>
                          <td>{{ props.item.Job.date_applied | formateDate }}</td>
                    </template>
                  </v-data-table>
          </v-card>
        </v-flex>

        <v-flex xs12 class="section-container">
            <v-card>
              <v-toolbar>
                <h2>Favorite Jobs</h2>
              </v-toolbar>
                <v-data-table
                    :headers="tableHeaders"
                    :items="favorites"
                    hide-actions
                    :pagination.sync="pagination"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.Job.jobTitle }}<br/>&nbsp;&nbsp;&nbsp;{{ props.item.type }}</td>
                         <td>{{ props.item.Job.location }}</td>
                         <td>{{ props.item.Job.date_posted | formateDate}}</td>
                          <td>{{ props.item.Job.date_applied | formateDate }}</td>
                    </template>
                  </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ProfileService from '../../../services/ProfileService.js'
import FileUpload from '../../fileupload/FileUpload'
import EventBus from '../../../main'
import { setTimeout } from 'timers'
import moment from 'moment'
export default {
  components: {
    'file-upload': FileUpload
  },
  created(){
    let $this = this;
    this.getProfileInfo();
    setTimeout(function(){
      $this.checkJobsAppliedTo();
    }, 2500);
      this.getProfileInfo();
    setTimeout(function(){
       $this.getFavoritedJobs();
    }, 2500);
  },
  mounted(){
   let $this = this;
    EventBus.$on('update-jobseeker-progress', function(){
      $this.getProfileInfo();
    })
  },
  data: function(){
    return {
      alertSubmit: false,
      date: null,
      menu: false,
      genders: [
        'male',
        'female'
      ],
      progressStatus: 1,
      value: '50%',
      stepsToComplete: [],
      joBSeeker: {},
      allStepsComplete: false,
      jobApplications: [],
      favorites: [],
        tableHeaders: [
        {text: 'Position/Type', value:'Position/Type'},
        {text: 'Location', value: 'Location'},
        {text: 'Date Posted', value:'Date Posted'},
         {text: 'Date Applied', value:'Date Applied'},
      ],
       pagination: {
        pages: 1
      },
    }
  },
  filters: {
    capitalize(word){
       return word.charAt(0).toUpperCase() + word.slice(1);
    },
     formateDate(date){
      return moment(date).format('MMMM Do YYYY');
    },
    shortenString(string){
     if (string && string !== null) {
      if (string.length > 120) {
          return string.substring(0, (string.length / 2)) + '...'
        }
     } else {
        return string
     }
    },
    shortenURL(url){
      if (url && url !== null) {
       if (url.length > 75) {
          return url.substring(0, (url.length / 2)) + '...'
        } else {
          return url;
        }
      }
    }
  },
  methods: {
    inputChange: function(input){
      if (input && !this.alertSubmit) {
        this.alertSubmit = true;
      }
    },
    async updateProfile(){
        let obj = {};

        if (this.$store.state.jobseeker) obj.id = this.$store.state.route.params.jobseekerId
        if (this.joBSeeker.address)obj.address = this.joBSeeker.address
        if (this.joBSeeker.phone) obj.phone = this.joBSeeker.phone
        if (this.joBSeeker.gender) obj.gender = this.joBSeeker.gender
        if (this.joBSeeker.bio) obj.bio = this.joBSeeker.bio
         if (this.joBSeeker.dob) obj.dob = this.joBSeeker.dob
        if (this.joBSeeker.photo) obj.photo = this.joBSeeker.photo
        if (this.joBSeeker.resume) obj.resume = this.joBSeeker.resume
        if (this.joBSeeker.coverletter) obj.coverletter = this.joBSeeker.coverletter
         const updated = await ProfileService.updateJobSeekerProfile(obj);
         if (updated) {
            this.alertSubmit = false;
            this.getProfileInfo();
         }
    },

    photoUpload: (e) => {
      this.joBSeeker.photo = e.target.files || e.dataTransfer.files;
    },
    resumeUpload: (e) => {
      this.joBSeeker.resume = e.target.files || e.dataTransfer.files;
    },
    coverLetterUpload: (e) => {
      this.joBSeeker.coverletter = e.target.files || e.dataTransfer.files;
    },
    save (date) {
        this.$refs.menu.save(date)
        this.inputChange(this.joBSeeker.dob);
    },
    async getProfileInfo() {
       this.joBSeeker = {};
       const seekerId = this.$store.state.route.params.jobseekerId;
       let seeker = (await ProfileService.getJobseekerProfile(seekerId)).data.jobseeker;
       if (seeker === null) {
         this.joBSeeker = {};
       } else {
        this.joBSeeker = seeker;
       }
       this.$store.dispatch('setCurrentJobseekerAction', this.joBSeeker)
       this.updateProgressStatus(this.joBSeeker);
    },
    updateProgressStatus(joBSeeker){
     this.stepsToComplete = [];
     this.progressStatus = 1;
     this.allStepsComplete = false;
     if (joBSeeker) {
      let requireValues = joBSeeker;
      for (var key in requireValues) {
           if (key !== 'jobseekerId' || key !== 'createdAt' || key !== 'updatedAt'){
              if (requireValues[key] !== null) {
                this.progressStatus = this.progressStatus + 8.29;
                if (this.progressStatus > 100) {
                  this.progressStatus = 100;
                  if (this.progressStatus === 100) {
                      this.allStepsComplete = true;
                  }
                }
              } else {
                    if (key === 'address') {
                        this.stepsToComplete.push('Enter your Address');
                    }
                    if (key === 'phone') {
                         this.stepsToComplete.push('Enter your Phone Number');
                     }
                    if (key === 'gender') {
                        this.stepsToComplete.push('Enter your Gender');
                     }
                    if (key === 'dob') {
                        this.stepsToComplete.push('Enter your Birthdate');
                     }
                    if (key === 'bio') {
                        this.stepsToComplete.push('Enter your Bio');
                     }
                    if (key === 'photo') {
                        this.stepsToComplete.push('Upload your Photo');
                    }
                    if (key === 'resume') {
                        this.stepsToComplete.push('Upload your Resume');
                     }
                    if (key === 'coverletter') {
                        this.stepsToComplete.push('Upload your Cover Letter');
                    }
              }
         }
      }
     } else {
         this.stepsToComplete = [];
         this.stepsToComplete.push('Enter your Address');
         this.stepsToComplete.push('Enter your Phone Number');
         this.stepsToComplete.push('Enter your Gender');
         this.stepsToComplete.push('Enter your Birthdate');
         this.stepsToComplete.push('Enter your Bio');
         this.stepsToComplete.push('Upload your Photo');
         this.stepsToComplete.push('Upload your Resume');
         this.stepsToComplete.push('Upload your Cover Letter');
     }
    },

    async checkJobsAppliedTo(){
       if (this.$store.state.route.params) {
        let jobseekerId = this.$store.state.route.params.jobseekerId;
           const applications = (await ProfileService.checkJobsAppliedTo(jobseekerId)).data;
           if (applications) {
             this.jobApplications = applications;
           }
       }
    },

    async getFavoritedJobs(){
        if (this.$store.state.route.params) {
        let jobseekerId = this.$store.state.route.params.jobseekerId;
        if (jobseekerId) {
           const favorites = (await ProfileService.getFavoritedJobs(jobseekerId)).data.data;
           if (favorites) {
             this.favorites = favorites;
           }
        }
      }
    }
  },
   watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
  },
}
</script>
<style>
.form{
  padding: 1em;
}
  .section-container{
    padding: 0.2em;
  }
  .content-item{
    padding: 1em;
    border-bottom: 1px solid #eee;
  }
@media screen and (max-width: 825px) {
.profile-header{
  font-size: 1em;
 }
 .v-progress-circular{
   width: 78px !important;
   height: 78px !important;
 }
   .v-datatable thead th{
    padding: 0 !important;
   }
  .v-datatable tbody td{
    padding: 0 !important;
   }
}
</style>
