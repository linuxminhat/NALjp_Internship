<template>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Employer Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <!-- <v-btn :href="source" icon large target="_blank" v-on="on">
                      <v-icon large>code</v-icon>
                    </v-btn> -->
                  </template>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                  </template>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="email" label="Email" type="text" v-model="email" v-validate="'required|email'" :error-messages="errors.collect('email')"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"  v-validate="'required'" :error-messages="errors.collect('password')"></v-text-field>
                </v-form>
              </v-card-text>
              <div v-if="this.$store.state.route.params"><strong><span style="color: green; padding: 6px;">{{ this.$store.state.route.params.message}}</span></strong></div>
              <v-card-actions>
                <div><strong>Email:</strong> <span style="color:green">rfairfoot9@tiny.cc</span> <br/><strong>Password:</strong>   <span style="color:green">password</span></div>
                <div style="padding: 1em;" v-if="invalidPassword"><strong><span style="color: red;">Incorrect Username and/or Password</span></strong></div>
                 <div style="padding: 1em;" v-if="missingCredentials"><strong><span style="color: red;">Please enter a Username and Password</span></strong></div>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>
<script>
import AuthenticationSerivce from '../../services/AuthtenicationService'
import { Validator } from 'vee-validate';
const dict = {
        custom: {
            email: {
                required: 'Please enter your email'
            },
            password:{
                required: 'Please enter your password'
            },

   }
};
Validator.localize('en', dict);
export default {
  created () {
   this.resetForm();
  },
  mounted () {

  },
  props: {
    source: String
  },
  data: function () {
    return {
      email:'',
      password:'',
      invalidPassword: false,
      emptyCredentials: false,
      missingCredentials: false,
    }
  },
  methods: {
    async login(){
      this.missingCredentials = false;
      this.$validator.validate().then(valid => {
          if (!valid) {
          // do stuff if not valid.
            this.missingCredentials = true;
          } else {
             this.sendCredentials();
          }
     });
    },
    clearInvalid(){
        this.invalidPassword = false;
    },
    async sendCredentials(){
      try {
        const response = await AuthenticationSerivce.employerLogin({
            email: this.email.trim(),
            password: this.password.trim()
          })
          if (response.status === 200) {
                this.$store.dispatch('setEmployerTokenAction', response.data.token);
                this.$store.dispatch('setEmployerAction', response.data.employer);
                this.$router.push({name: this.$store.state.route.query.redirect || 'view.employer.profile', params: {employerId: this.$store.state.employer.id}})
          }
           if (response.status === 403) {
              this.invalidPassword = true;
              this.email = '';
              this.password = '';
          }
      } catch (error){
          // confirm(`An erorr occurred ${error}`);
          this.invalidPassword = true;
      }
    },
    resetForm(){
      this.email = '';
      this.password = '';
      this.invalidPassword = false;
      this.emptyCredentials = false;
    }
  },
  computed: {

  }
}
</script>
<style>

</style>
