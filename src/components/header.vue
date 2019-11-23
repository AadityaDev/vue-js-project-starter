<template>
  <div>
      <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String,
    showBackButton: Boolean,
    showSideMenu: Boolean,
    logo: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
