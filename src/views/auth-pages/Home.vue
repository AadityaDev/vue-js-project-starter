<template>
  <div>
    Home
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Footer: () => import('@/components/footer.vue'),
    Header: () => import('@/components/header.vue'),
    Sidebar: () => import('@/components/sidebar.vue'),
  },
};
</script>
