<script>
import { mapActions } from 'vuex'

export default {
  name: 'page-users-create-update',
  data () {
    return {
      form: {
        _id: null,
        username: null,
        password: null
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
    ...mapActions('users', ['loadUser', 'saveUser']),
    async submit () {
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
        v-model="form.username"
        type="email"
        stack-label
        label="Email"
      )
      q-input(
        v-model="form.password"
        type="text"
        stack-label
        label="Password"
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
