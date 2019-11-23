<template>
  <div>
      <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    title: String,
    copyrightText: String,
    brandingText: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
