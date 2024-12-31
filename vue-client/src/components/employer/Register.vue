<template>
      <v-container>
        <v-layout row wrap>
                <v-flex x12 justify-center>
                    <h2>Employer Registration</h2>
                    <v-card-actions class="justify-center">
                    <form style="width: 50%;" autocomplete="off">
                          <v-text-field
                            v-model="employerRegistration.companyName"
                            name="company"
                            v-validate="'required|max:75'"
                            :counter="35"
                            :error-messages="errors.collect('company')"
                            label="Company Name"
                            data-vv-name="company"
                            required
                          ></v-text-field>
                          <v-text-field
                            v-model="employerRegistration.email"
                            v-validate="'required|email'"
                            :error-messages="errors.collect('email')"
                            label="E-mail"
                            data-vv-name="email"
                            name="email"
                            required
                          ></v-text-field>
                          <v-text-field
                          v-model="employerRegistration.representative"
                          v-validate="'required'"
                          label="Your Name"
                          :error-messages="errors.collect('representative')"
                          data-vv-name="representative"
                          name="representative"
                          required
                        ></v-text-field>
                          <v-text-field
                            name="password"
                            label="Password"
                            v-model="employerRegistration.password"
                            v-validate="'required'"
                            :error-messages="errors.collect('password')"
                            autocomplete="new-password"
                            ref="password"
                          ></v-text-field>
                          <v-text-field
                            name="confirm"
                            v-model="employerRegistration.confirmPassword"
                            label="Confirm Password"
                            v-validate="'required|confirmed:password'"
                            :error-messages="errors.collect('confirm')"
                            data-vv-name="password"
                          ></v-text-field>
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
            company: {
              required: 'Please enter your company name'
            },
            representative: {
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
          employerRegistration:{
            companyName: '',
            representative: '',
            email:'',
            password:'',
            confirmPassword:'',

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
          this.employerRegistration.companyName = '';
          this.employerRegistration.representative = '';
          this.employerRegistration.email = '';
          this.employerRegistration.password = '';
          this.employerRegistration.confirmPassword = '';
        },

        async submitFormValues(){
              try {
                const res = await RegisterService.employerRegister({
                  company: this.employerRegistration.companyName,
                  email: this.employerRegistration.email,
                  representative: this.employerRegistration.representative,
                  password: this.employerRegistration.password
                })
                if (res.status === 200){
                      this.$router.push({name: 'employer.login', params: {message: res.data.message}});
               }
               if (res.status === 403) {
                   confirm('You are unauthorized to peform this action');
               }
               if (res.status === 500) {
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
