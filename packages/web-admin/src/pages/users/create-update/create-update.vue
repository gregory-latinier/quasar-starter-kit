<script>
import { isEmail } from 'validator'
import { mapActions } from 'vuex'
import { validation } from 'src/mixins/validation'

export default {
  name: 'page-users-create-update',
  mixins: [validation],
  data () {
    return {
      form: {
        _id: null,
        firstName: null,
        lastName: null,
        username: null,
        password: null
      },
      formRules: {
        username: [
          val => !!val || this.$t('validations.errors.required'),
          val => isEmail(val) || this.$t('validations.errors.email'),
          async val => await this.isEmailUsed({ _id: this.form._id, username: val }) || this.$t('validations.errors.emailUsed')
        ],
        firstName: [val => !!val || this.$t('validations.errors.required')],
        lastName: [val => !!val || this.$t('validations.errors.required')]
      },
      submitting: false
    }
  },
  async mounted () {
    if (this.$route.params.id) {
      this.form = await this.loadUser(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions('users', ['loadUser', 'saveUser', 'isEmailUsed']),
    async submit () {
      if (!this.validate(this.formRules)) return
      this.submitting = true
      const user = await this.saveUser(this.form)
      if (!this.$route.params.id) {
        this.$router.push({ path: `/users/${user._id}` })
      } else {
        this.form = user
      }
      this.submitting = false
    }
  },
  watch: {
    '$route.params.id' (val) {
      if (!val) {
        this.form = {
          _id: null,
          firstName: null,
          lastName: null,
          username: null,
          password: null
        }
      }
    }
  }
}
</script>

<template lang="pug">
q-page.flex.flex-center
  q-card.form-user
    q-card-section
      q-input(
        ref="username"
        v-model="form.username"
        type="email"
        stack-label
        label="Email"
        debounce="300"
        :rules="formRules.username"
        lazy-rules
      )
      q-input(
        ref="password"
        v-model="form.password"
        type="text"
        stack-label
        label="Password"
      )
      q-input(
        ref="firstName"
        v-model="form.firstName"
        type="text"
        stack-label
        label="First name"
        :rules="formRules.firstName"
        lazy-rules
      )
      q-input(
        ref="lastName"
        v-model="form.lastName"
        type="text"
        stack-label
        label="Last name"
        :rules="formRules.lastName"
        lazy-rules
      )
    q-card-section.flex.justify-between
      q-btn(
        color="primary"
        label="Save"
        @click.native="submit"
        :loading="submitting"
      )
      q-btn(
        label="Cancel"
        to="/users/list"
      )
</template>

<style lang="stylus">
.form-user
  min-width 300px
</style>
