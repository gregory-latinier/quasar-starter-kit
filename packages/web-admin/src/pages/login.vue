<script>
import jwt from 'jsonwebtoken'
import { mapMutations } from 'vuex'
import { Cookies } from 'quasar'

export default {
  name: 'page-login',
  data () {
    return {
      loginForm: {
        username: null,
        password: null
      },
      isPwd: true,
      submitting: false
    }
  },
  methods: {
    ...mapMutations('auth', ['setUsername']),
    async submit () {
      this.submitting = true
      try {
        const response = await this.$axios({
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          url: `${process.env.API}/oauth/token`,
          method: 'post',
          data: this.loginForm
        })

        const { access_token: accessToken, refresh_token: refreshToken } = response
        const token = jwt.decode(accessToken)
        // Only users can connect to the app, it will prevent admin accounts to use the app
        if (token.scopes.includes('admin')) {
          let domain = window.location.hostname
          domain = domain.substring(domain.lastIndexOf('.', domain.lastIndexOf('.') - 1) + 1)

          Cookies.set('access_token', accessToken, {
            path: '/',
            domain
          })
          Cookies.set('refresh_token', refreshToken, {
            path: '/',
            domain
          })
          this.setUsername(token.username)
          this.$router.push({
            path: 'authenticated'
          })
        }
      } catch (err) {
        // TODO handle wrong username / password
        console.log(err)
      }
      this.submitting = false
    }
  }
}
</script>

<template lang="pug">
q-page.flex.flex-center
  q-card.login-form
    q-card-section
      q-input(
        v-model="loginForm.username"
        type="email"
        stack-label
        label="Email"
      )
      q-input(
        v-model="loginForm.password"
        :type="isPwd ? 'password' : 'text'"
        stack-label
        label="Password"
      )
        q-icon(
          slot="append"
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        )
    q-card-actions
      q-btn.full-width(
        color="primary"
        label="Login"
        @click.native="submit"
        :loading="submitting"
      )
</template>

<style lang="stylus">

</style>
