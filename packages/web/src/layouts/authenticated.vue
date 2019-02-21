<script>
export default {
  name: 'layout-authenticated'
}
</script>

<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header.glossy(elevated)
      q-toolbar
        q-toolbar-title Quasar Starter Kit Web - Authenticated
        div Quasar v{{ $q.version }}

    q-page-container
      router-view
</template>
