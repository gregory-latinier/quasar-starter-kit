<script>
import { mapActions } from 'vuex'

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
    ...mapActions('auth', ['login']),
    async submit () {
      this.submitting = true
      await this.login(this.loginForm)
      this.submitting = false
      this.$router.push({
        path: 'dashboard'
      })
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
