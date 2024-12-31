



<template>
      <v-container>
        <v-layout row wrap>
                <v-flex x12 justify-center>
                    <h2>Jobseeker Registration</h2>
                    <v-card-actions class="justify-center">
                    <form style="width: 50%;" autocomplete="off">
                      <v-text-field
                        v-model="jobSeekerRegistration.name"
                        name="name"
                        v-validate="'required|max:35'"
                        :counter="35"
                        :error-messages="errors.collect('name')"
                        label="Name"
                        data-vv-name="name"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="jobSeekerRegistration.email"
                        v-validate="'required|email'"
                        :error-messages="errors.collect('email')"
                        label="E-mail"
                        data-vv-name="email"
                        name="email"
                        required
                      ></v-text-field>
                      <v-text-field
                            name="password"
                            label="Password"
                            v-model="jobSeekerRegistration.password"
                            :error-messages="errors.collect('password')"
                           v-validate="'required'"
                            autocomplete="new-password"
                            ref="password"
                      ></v-text-field>
                      <v-text-field
                            name="confirm"
                            v-model="jobSeekerRegistration.confirmPassword"
                            label="Confirm Password"
                            v-validate="'required|confirmed:password'"
                            :error-messages="errors.collect('confirm')"
                            data-vv-name="password"
                      ></v-text-field>
                      <div style="padding: 1em;" v-if="missingCredentials"><strong><span style="color: red;">Please enter missing information</span></strong></div>
                       <div style="padding: 1em;" v-if="passwordMatch"><strong><span style="color: red;">Passwords do not match</span></strong></div>
                      <v-btn @click="submit">submit</v-btn>
                      <v-btn @click="clear">clear</v-btn>
                    </form>
                    </v-card-actions>
                </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import RegisterService from '../../services/RegistrationService'
import { Validator } from 'vee-validate';
const dict = {
        custom: {
            email: {
                required: 'Please enter your email'
            },
            name: {
              required: 'Please enter your name'
            },
            password:{
                required: 'Please enter your password'
            },
            confirm: {
              required: 'Please re-enter your password',
              confirmed: 'Passwords do not match'
            }

        }
};

Validator.localize('en', dict);
export default {
  inject: ['$validator'],
    created(){

    },
    mounted(){

    },
    data: function() {
        return {
          missingCredentials: false,
          passwordMatch: false,
          jobSeekerRegistration:{
            name: '',
            email:'',
            password:'',
            confirmPassword:''
          }
        }
    },
    methods: {
        async submit() {
          this.$validator.validate().then(valid => {
                if (!valid) {
                // do stuff if not valid.
                  this.missingCredentials = true;
                } else {
                  this.submitFormValues();
                }
           });
        },
        clear(){
          this.name = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
        },
        async submitFormValues(){
              try {
                const res = await RegisterService.jobseekerRegister({
                  name: this.jobSeekerRegistration.name,
                  email: this.jobSeekerRegistration.email,
                  password: this.jobSeekerRegistration.password
                })
                if (res.status === 200){
                   this.$store.dispatch('setSuccessMessageAction', res.data.message)
                   this.$router.push({name: 'jobseeker.login', params: {message: res.data.message}});
                }
                if (res.status === 403){
                    confirm('You are unauthorized to peform this action');
                }
                if (res.status === 500){
                   confirm('There was an error trying to perform this action');
                }
              } catch (error) {
                  confirm(`There was an error trying to register: ${error}`);
              }
        }
    },
    computed: {

    }
}
</script>
<style>

</style>
