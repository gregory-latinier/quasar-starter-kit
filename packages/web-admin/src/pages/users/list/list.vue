<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'page-users-list',
  async mounted () {
    await this.loadUsers({
      ...this.pagination
    })
  },
  methods: {
    ...mapActions('users', ['loadUsers'])
  },
  computed: {
    ...mapGetters('users', ['users', 'pagination'])
  }
}
</script>

<template lang="pug">
q-page
  div(v-for="user in users")
    span {{ user.username }}
</template>

<style lang="stylus">

</style>
