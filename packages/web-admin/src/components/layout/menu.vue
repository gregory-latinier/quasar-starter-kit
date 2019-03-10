<script>
import { mapActions } from 'vuex'

export default {
  name: 'layout-menu',
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>

<template lang="pug">
q-scroll-area.fit
  q-expansion-item(
    dark
    expand-separator
    icon="account_circle"
    label="Clients"
  )
    q-list.sub-menu(separator)
      q-item(
        to="/users/new"
        dense
        exact
        active-class="sub-menu-active"
      )
        q-item-section(avatar)
          q-icon(color="white" name="add_circle")
        q-item-section New client
      q-item(
        to="/users/list"
        dense
        exact
        active-class="sub-menu-active"
      )
        q-item-section(avatar)
          q-icon(color="white" name="list")
        q-item-section Clients list
  q-list
    q-item(
      dense
      clickable
      @click="logout"
    )
      q-item-section(avatar)
        q-icon(color="white" name="exit_to_app")
      q-item-section Log out
</template>

<style lang="stylus">
@import '~quasar-variables'
.sub-menu
  margin-left 10px
  .sub-menu-active
    color $white
    font-weight 600
</style>
