<script>
export default {
  name: 'layout-anonymous'
}
</script>

<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header.glossy(elevated)
    q-toolbar
      q-toolbar-title Quasar Starter Kit
      div Quasar v{{ $q.version }}

  q-page-container
    router-view
</template>
