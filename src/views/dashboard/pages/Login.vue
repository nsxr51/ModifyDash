<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="handleSubmit()">
                  <v-text-field
                    v-model="username"
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="username"
                    required
                  />

                  <v-text-field
                    v-model="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="password"
                    required
                  />
                  <v-btn type="submit"
                         class="mt-4"
                         color="primary"
                         value="log in"
                  >
                    Login
                  </v-btn>
                </form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        password: '',
      }
    },
    computed: {
      ...mapState('account', ['status']),
    },
    methods: {
      ...mapActions('account', ['login', 'logout']),
      handleSubmit  () {
        const { username, password } = this
        if (username && password) {
          this.login({ username, password })
        }
      },
    },
  }
</script>
