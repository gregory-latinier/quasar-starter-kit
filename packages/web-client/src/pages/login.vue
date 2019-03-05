<script>
import { isEmail } from 'validator'
import { mapActions } from 'vuex'
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
    ...mapActions('auth', ['login']),
    async submit () {
      if (!this.validate(this.formRules)) return
      this.submitting = true
      await this.login({
        ...this.form,
        grant_type: 'password'
      })
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
        ref="username"
        v-model="form.username"
        type="email"
        stack-label
        label="Email"
        :rules="formRules.username"
        lazy-rules
      )
      q-input(
        ref="password"
        v-model="form.password"
        :type="isPwd ? 'password' : 'text'"
        stack-label
        label="Password"
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
