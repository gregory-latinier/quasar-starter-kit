<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'page-users-list',
  data () {
    return {
      columns: [
        {
          name: 'username',
          required: true,
          label: 'Client email',
          align: 'left',
          field: row => row.username,
          sortable: true

        }
      ],
      loading: false
    }
  },
  async mounted () {
    await this.loadUsers({
      ...this.pagination
    })
  },
  methods: {
    ...mapActions('users', ['loadUsers']),
    async onRequest (props) {
      this.loading = true
      await this.loadUsers({
        ...props.pagination
      })
      this.loading = false
    }
  },
  computed: {
    ...mapGetters('users', ['users', 'pagination'])
  }
}
</script>

<template lang="pug">
q-page.q-pa-md
  q-table(
    :data="users"
    :columns="columns"
    row-key="_id"
    :pagination.sync="pagination"
    :loading="loading"
    @request="onRequest"
    binary-state-sort
  )
</template>

<style lang="stylus">

</style>
