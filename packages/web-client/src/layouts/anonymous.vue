<script>
export default {
  name: 'layout-anonymous'
}
</script>

<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header.glossy(elevated)
    q-toolbar
      q-toolbar-title Quasar Starter Kit Web - Guest
      router-link.menu(to="/login") Login page
      router-link.menu(to="/authenticated") Authenticated page

  q-page-container
    router-view
</template>

<style lang="stylus">
.menu
  text-decoration none
  color white
  margin-right 10px
</style>
