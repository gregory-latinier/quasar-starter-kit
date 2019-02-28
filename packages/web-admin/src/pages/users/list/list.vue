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

        },
        {
          name: 'actions',
          align: 'right'
        }
      ],
      loading: false,
      inlineForm: {
        field: null,
        value: null,
        id: null
      }
    }
  },
  async mounted () {
    if (this.users.length === 0) {
      await this.loadUsers({
        ...this.pagination
      })
    }
  },
  methods: {
    ...mapActions('users', ['loadUsers', 'updateField']),
    async onRequest (props) {
      this.loading = true
      await this.loadUsers({
        ...props.pagination
      })
      this.loading = false
    },
    async saveField () {
      this.loading = true
      await this.updateField(this.inlineForm)
      this.loading = false
      this.resetInlineForm()
    },
    resetInlineForm () {
      this.inlineForm.value = this.inlineForm.field = this.inlineForm.id = null
    }
  },
  computed: {
    ...mapGetters('users', ['users', 'pagination'])
  }
}
</script>

<template lang="pug">
q-page.q-pa-md.column.items-end
  q-btn(
    color="primary"
    label="New client"
    to="/users/new"
  )
  q-table.q-mt-md.full-width(
    :data="users"
    :columns="columns"
    row-key="_id"
    :pagination="pagination"
    :loading="loading"
    @request="onRequest"
    binary-state-sort
  )
    template(v-slot:body="props")
      q-tr(:props="props")
        q-td(key="username", :props="props")
          | {{ props.row.username }}
          q-popup-edit(
            v-model="inlineForm.value"
            buttons
            label-set="Save"
            label-cancel="Close"
            @show="() => {inlineForm.value = props.row.username; inlineForm.field = 'username'; inlineForm.id = props.row._id}"
            @cancel="resetInlineForm"
            @save="saveField"
          )
            q-input(
              v-model="inlineForm.value"
              dense
              autofocus
            )
        q-td(key="actions", :props="props")
          q-btn(
            color="primary"
            icon="edit"
            :to="{ path: `/users/${props.row._id}` }"
            dense
            flat
          )
          q-btn(
            color="red"
            icon="delete"
            dense
            flat
          )
</template>

<style lang="stylus">

</style>
