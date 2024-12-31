<template>
  <v-container>
     <v-layout>
    <v-flex lg3 md3 xs12  class="section-container">
      <file-upload
         upload_header="Upload Company Logo"
         file_type="image"
         upload_label="Choose Logo"
         upload_name="company_logo"
         profileType="employer"
          allowedTypes=".jpeg .jpg .png .gif"
         :profileID="this.$store.state.route.params.employerId"
         >
      </file-upload>
      <br/>
      <file-upload
      upload_header="Upload Company Photo"
      file_type="image"
      upload_label="Choose Photo"
      upload_name="company_photo"
      profileType="employer"
       allowedTypes=".jpeg .jpg .png .gif"
      :profileID="this.$store.state.route.params.employerId"
      ></file-upload>
    </v-flex>


    <v-flex lg5 md5 xs12 class="section-container">
      <v-card class="form-container">
        <v-toolbar>
          Update Your Company Information
        </v-toolbar>
        <v-list two-line>

          <form action="" class="form">
            <v-text-field label="Address" outline v-model="employer.address"  @change="inputChange(employer.address)"></v-text-field>
            <v-text-field label="Phone" outline v-model="employer.phone" @change="inputChange(employer.phone)"></v-text-field>
             <v-text-field label="Website" outline v-model="employer.website" @change="inputChange(employer.website)"></v-text-field>
              <v-text-field label="Slogan" outline v-model="employer.slogan" @change="inputChange(employer.slogan)"></v-text-field>
               <v-textarea
                  outline
                  textarea
                  label="Description"
                  v-model="employer.description"
                  @change="inputChange(employer.description)"
               ></v-textarea>
              <v-flex 12>
                <v-btn flat color="orange" @click="updateEmployerProfile">Update</v-btn>
             </v-flex>
          </form>

        </v-list>
      </v-card>
    </v-flex>


        <v-flex lg4 md4 xs12  class="section-container">
          <v-card>
            <v-toolbar>
            About your company
          </v-toolbar>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Address: <span v-if="this.$store.state.currentEmployer">{{this.$store.state.currentEmployer.address}}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Phone: <span v-if="this.$store.state.currentEmployer && this.$store.state.currentEmployer.phone !== null">{{this.$store.state.currentEmployer.phone}}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>

              <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Website: <span v-if="this.$store.state.currentEmployer && this.$store.state.currentEmployer.website !== null">{{this.$store.state.currentEmployer.website | shortenURL }}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>


            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Slogan: <span v-if="this.$store.state.currentEmployer && this.$store.state.currentEmployer.slogan !== null">{{this.$store.state.currentEmployer.slogan }}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>

            <div style="padding: 0.3em;">
               <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Company Description:</v-list-tile-title>
                     </v-list-tile-content>
                </v-list-tile>
                    <p v-if="this.$store.state.currentEmployer && this.$store.state.currentEmployer.description !== null" style="padding: 1em;"> {{this.$store.state.currentEmployer.description | shortenString }}</p>
             </div>
          </v-card>
          <br/>
          <v-card>
          <v-toolbar>
           Profile Completion Status
          </v-toolbar>
            <v-layout row wrap>
            <v-flex xs3 >
              <div style="padding: 1em;">
              <v-progress-circular
                :rotate="-90"
                :size="100"
                :width="15"
                v-model="progressStatus"
                color="primary"
              >
                {{ progressStatus.toFixed(0) }} %
              </v-progress-circular>
              </div>
            </v-flex>

             <v-flex xs9 justify-center>
            <h2>Steps to Complete:</h2>
            <div v-for="step in stepsToComplete" :key="step">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ step }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            </div>
            </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ProfileService from '../../../services/ProfileService';
import FileUpload from '../../fileupload/FileUpload'
import EventBus from '../../../main'
export default {
  components: {
    'file-upload': FileUpload
  },
  created(){
    this.getProfileInfo();
  },
  mounted(){
     let $this = this;
     EventBus.$on('update-employer-progress', function(){
      $this.getProfileInfo();
    })
  },
  data: function(){
    return {
      progressStatus: 1,
      employer: {
        address: '',
        phone: '',
        website: '',
        slogan: '',
        description: '',
      },
      alertSubmit: false,
      stepsToComplete: [],
    }
  },

  filters: {
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
  methods:{
    inputChange: function(input){
      if (input && !this.alertSubmit) {
        this.alertSubmit = true;
      }
    },
    async getProfileInfo(){
        // Get employer profile ID from router parameter
        let employerId = this.$store.state.route.params.employerId;
        // Make request to ProfileService sending employer :id
        let employer = (await ProfileService.getEmployerProfile(employerId)).data.data
        // Get response and check if employer object is returned and store that in the employer object if null is returned then empty employer object
        if (employer === null) {
            this.employer = {}
        } else {
            this.employer = employer;
            // Update the vuex store with the currentEmployer object
             this.$store.dispatch('setCurrentEmployerAction', this.employer)
            // Call a function that updates the progress status passing in the employer object
            // It will recalculate after every update
             this.updateProgressStatus(this.employer);
        }
    },
    async updateEmployerProfile(){
        // Declare empty object to store the employer information
        let emplObj = {};
        // Check if each required input has a value and store in the newly created object
         if (this.employer.address) emplObj.address = this.employer.address
         if (this.employer.phone) emplObj.phone = this.employer.phone
         if (this.employer.website) emplObj.website = this.employer.website
         if (this.employer.slogan) emplObj.slogan = this.employer.slogan
         if (this.employer.description) emplObj.description = this.employer.description
        // Make request to ProfileService sending the employer object
        const updatedEmployer = await ProfileService.updateEmployerProfile(emplObj)
        // Check response and if updated employer object is retured
        if (updatedEmployer) {
           // If updated employer object is returned then call getProfileInfo function to pull down updated info
            this.alertSubmit = false;
            this.getProfileInfo();
        } else {
          // Alert user there was no info returned
          confirm('There was an error handling your request')
        }
    },
    updateProgressStatus(employerObj){
      // Declare empty array to store steps to complete
      this.stepsToComplete = [];
      // Set the progress status  = 1
      this.progressStatus = 1;
      // Check if employer Object is empty
      if (employerObj) {
         let reqValuesObj = employerObj;
        // Loop through employer object ignoring keys with null values and foreach key increase the progress status by 6.999
         for (let key in reqValuesObj) {
           if (reqValuesObj[key] !== null) {
              this.progressStatus = this.progressStatus + 8.99
              // Check if progress status is greater than 100 if so set it to 100
              if (this.progressStatus > 100) {
                  this.progressStatus = 100;
              }
           } else {
              // If the key's value is null
              // Check the name and push correlating message to stepTocomplete array
              if (key === 'address') this.stepsToComplete.push('Enter Company Address')
              if (key === 'phone') this.stepsToComplete.push('Enter Company Phone')
              if (key === 'wesite') this.stepsToComplete.push('Enter Company Website')
              if (key === 'slogan') this.stepsToComplete.push('Enter Company Slogan')
              if (key === 'description') this.stepsToComplete.push('Enter Company Description')
              if (key === 'logo') this.stepsToComplete.push('Upload Company Logo')
              if (key === 'coverphoto') this.stepsToComplete.push('Upload Company Photo')
           }
         }
      } else {
        // If employer object is empty push to stepToComplete array all steps
        this.stepsToComplete.push('Enter Company Address');
        this.stepsToComplete.push('Enter Company Phone');
        this.stepsToComplete.push('Enter Company Website');
        this.stepsToComplete.push('Enter Company Slogan');
        this.stepsToComplete.push('Enter Company Description');
        this.stepsToComplete.push('Upload Company Logo');
        this.stepsToComplete.push('Upload Company Photo');
      }
    },
  }
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
