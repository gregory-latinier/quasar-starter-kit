<script>
import jwt from 'jsonwebtoken'
import { mapMutations } from 'vuex'
import { Cookies } from 'quasar'
import { isEmail } from 'validator'
import { validation } from 'src/mixins/validation'

export default {
  name: 'page-login',
  mixins: [validation],
  data () {
    return {
      form: {
        username: null,
        password: null
      },
      formRules: {
        username: [
          val => !!val || this.$t('validations.errors.required'),
          val => isEmail(val) || this.$t('validations.errors.email')
        ],
        password: [val => !!val || this.$t('validations.errors.required')]
      },
      isPwd: true,
      submitting: false
    }
  },
  methods: {
    ...mapMutations('auth', ['setUsername']),
    async submit () {
      if (!this.validate(this.formRules)) return
      this.submitting = true
      try {
        const response = await this.$axios({
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          url: `${process.env.API}/oauth/token`,
          method: 'post',
          data: this.form
        })

        const { access_token: accessToken, refresh_token: refreshToken } = response
        const token = jwt.decode(accessToken)
        // Only users can connect to the app, it will prevent admin accounts to use the app
        if (token.scopes.includes('user')) {
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
        if (err.response.status === 400) {
          let message = ''
          err.response.data.forEach((error) => {
            message += this.$t(`form.errors.${error.message}`, { field: this.$t(`form.fields.${error.field}`) }) + '\n'
          })
          this.$q.notify({
            message,
            color: 'negative',
            icon: 'warning',
            position: 'bottom-right'
          })
        }
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
        ref="username"
        v-model="form.username"
        type="email"
        stack-label
        :label="$t('form.fields.username')"
        :rules="formRules.username"
        lazy-rules
      )
      q-input(
        ref="password"
        v-model="form.password"
        :type="isPwd ? 'password' : 'text'"
        stack-label
        :label="$t('form.fields.password')"
        :rules="formRules.password"
        lazy-rules
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
