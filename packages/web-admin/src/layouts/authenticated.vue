<script>
import LayoutMenu from 'src/components/layout/menu'

export default {
  name: 'layout-authenticated',
  components: {
    LayoutMenu
  },
  data () {
    return {
      menu: false
    }
  }
}
</script>

<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header.glossy(elevated)
      q-toolbar
        q-btn(
          flat
          @click="menu = !menu"
          round
          dense
          icon="menu"
        )
        q-toolbar-title Quasar Starter Kit Admin - Authenticated
    q-drawer(
      v-model="menu"
      :width="250"
      :breakpoint="700"
      show-if-above
      elevated
      content-class="bg-primary text-white"
    )
      layout-menu
    q-page-container
      router-view
</template>

<style lang="stylus">
.menu
  text-decoration none
  color white
  margin-right 10px
</style>
