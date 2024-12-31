<template>
  <div>
      <v-card>
        <v-toolbar>
           <h2 class="profile-header">{{  upload_header }}</h2>
           <br/>

        </v-toolbar>
        <div v-if="url !== null && this.file_type !== 'document'">
          <v-img
            :src="fullImageSrc"
            aspect-ratio="1"
            v-model="url"
          ></v-img>
        </div>
        <v-card-actions>
          <form @submit.prevent="onSubmit" enctype="multipart/form-data">
            <label>{{ upload_label }}</label>
            <input type="file" ref="file"  @change="onSelect">
          <v-btn flat color="orange" @click="onSubmit">Update</v-btn>
          </form>
        </v-card-actions>
         <v-card-actions>
            <div>
              <h5>Allowed file types: {{allowedTypes}}</h5>
            </div>
             &nbsp;
            <div v-if="uploadError">
              <h5 style="color:red;">{{message}}</h5>
            </div>
             &nbsp;
             <div v-if="uploadSuccess">
              <h5 style="color:green;">{{message}}</h5>
            </div>
        </v-card-actions>
      </v-card>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
import Vue from 'vue'
import ProfileService from '../../services/ProfileService'
import EventBus from '../../main'
import LoadingOverlay from 'vue-loading-overlay'
Vue.use(LoadingOverlay)

export default {
  props:['upload_header', 'file_type', 'upload_label', 'upload_name', 'profileID', 'profileType', 'allowedTypes'],
  created(){
    this.getImageUrl(this.upload_name);
  },
  data(){
    return {
      message: '',
      selectedFile: null,
      uploadError: false,
      uploadSuccess: false,
      url: '',
      noURL: true,
      urlLoaded: false,
    }
  },
  computed: {
      fullImageSrc: function(){
        return this.url;
      }
  },
  watch: {
  },
  methods: {
    onSelect: function(e){
        this.selectedFile = e.target.files[0]
        if (this.selectedFile) {
          // File is selected
        }
    },

    async getImageUrl(uploadName){
      if (this.profileID && this.profileType === 'employer') {
        // Pull down url from backend
         let employer = (await ProfileService.getEmployerProfile(this.profileID)).data.data
          // Check for result
          if (employer){
            // Check name of component
             if (uploadName === 'company_logo') {
               // If the url is not null set new url
               if (employer.logo !== null) {
                this.url = employer.logo;
                this.noURL = false;
               }
            }
            if (uploadName === 'company_photo') {
              if (employer.coverphoto !== null) {
               this.url = employer.coverphoto;
               this.noURL = false;
              }
           }
          }
      }
      if (this.profileID && this.profileType === 'jobseeker') {
        this.url = null
       let seeker = (await ProfileService.getJobseekerProfile(this.profileID)).data.jobseeker;
           if (seeker.photo !== null){
                this.url = seeker.photo;
           } else {
              this.url = 'https://placehold.it/300x300'
           }
           if (seeker.coverletter !== null && this.filetype === 'document'){
            // do nothing with url
           }
           if (seeker.resume !== null && this.filetype === 'document'){
            // do nothing with url
           }
      }
    },
    async onSubmit(){
      // Check thew upload name
        if (this.upload_name === 'company_logo') {
            try {
              // Upload File
               this.message = '';
              const fileUploadSuccesFull = (await ProfileService.uploadCompanyLogo(this.$store.state.route.params.employerId, this.selectedFile)).data
              if (fileUploadSuccesFull.error) {
                this.uploadError = true;
                 this.uploadSuccess = false;
                this.message = 'There was an error uploading the file.'
              } else {
                 // If file success change image url
                  this.getImageUrl(this.upload_name);
                  this.uploadError = false;
                  this.uploadSuccess = true;
                  this.selectedFile = null;
                  this.message = 'Successful file upload';
                  // Emit event to EmployerProfile to update progress status
                  EventBus.$emit('update-employer-progress');
              }
            } catch (error) {
              this.uploadError = true;
              this.uploadSuccess = false;
              this.message = 'There was an error uploading the file.'
            }
        }
        if (this.upload_name === 'company_photo') {
           try {
          this.message = '';
          const fileUploadSuccesFull = (await ProfileService.uploadCompanyPhoto(this.$store.state.route.params.employerId, this.selectedFile)).data
           if (fileUploadSuccesFull.success) {
                 this.getImageUrl(this.upload_name);
                  this.uploadError = false;
                  this.uploadSuccess = true;
                  this.selectedFile = null;
                  this.message = 'Successful file upload';
                  EventBus.$emit('update-employer-progress');
           } else {
                 this.uploadError = true;
                 this.uploadSuccess = false;
                 this.message = 'There was an error uploading the file.'
           }
           } catch (error){
              this.uploadError = true;
              this.uploadSuccess = false;
              this.message = 'There was an error uploading the file.'
           }
        }
        if (this.upload_name === 'profilephoto') {
          try {
            this.message = '';
            const fileUploadSuccesFull = (await ProfileService.uploadJobseekerPhoto(this.$store.state.route.params.jobseekerId, this.selectedFile)).data
             if (fileUploadSuccesFull.success) {
                  let $this = this;
                  setTimeout(function(){
                     $this.getImageUrl(this.upload_name);
                  }, 2000)
                  setTimeout(function(){
                  $this.uploadError = false;
                  $this.uploadSuccess = true;
                  $this.selectedFile = '';
                  $this.message = 'Successful file upload';
                  EventBus.$emit('update-jobseeker-progress');
                  }, 2000)
           } else {
                this.uploadError = true;
                this.uploadSuccess = false;
                this.message = 'There was an error uploading the file.'
           }
          } catch (error){
              this.uploadError = true;
              this.uploadSuccess = false;
              this.message = 'There was an error uploading the file.'
          }
        }
        if (this.upload_name === 'resume') {
          try {
            this.message = '';
              const fileUploadSuccesFull = (await ProfileService.uploadResume(this.$store.state.route.params.jobseekerId, this.selectedFile)).data
             if (fileUploadSuccesFull.error) {
                this.uploadError = true;
                this.uploadSuccess = false;
                this.message = 'There was an error uploading the file.'
             } else {
                  this.uploadError = false;
                  this.uploadSuccess = true;
                  this.selectedFile = null;
                  this.message = 'Successful file upload';
                 EventBus.$emit('update-jobseeker-progress');
             }
          } catch (error){
              this.uploadError = true;
              this.uploadSuccess = false;
              this.message = 'There was an error uploading the file.'
          }
        }
        if (this.upload_name === 'coverletter') {
           try {
              this.message = '';
              const fileUploadSuccesFull = (await ProfileService.uploadCoverLetter(this.$store.state.route.params.jobseekerId, this.selectedFile)).data
              if (fileUploadSuccesFull.error) {
              // There was an error
              } else {
                  this.uploadError = false;
                  this.uploadSuccess = true;
                  this.selectedFile = null;
                  this.message = 'Successful file upload';
                 EventBus.$emit('update-jobseeker-progress');
              }
          } catch (error){
              this.uploadError = true;
              this.uploadSuccess = false;
              this.message = 'There was an error uploading the file.'
          }
        }
    },
  }
}
</script>
<style scoped>
@media screen and (max-width: 825px) {
.profile-header{
  font-size: 1em;
 }
}
</style>
