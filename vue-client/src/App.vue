<template>
  <div id="app">
    <v-app style="background-color:#E1F5FE">
      <v-content style="height: 100%;  overflow-y: hidden;">
        <app-header></app-header>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    'app-header': Header
  },
  data: () => {
    return {

    }
  }

}
</script>

<style>
</style>
