<template>
  <div class="search-cont relative flex">
    <input
      :id="id"
      :ref="id"
      v-model="searchQuery"
      :class="[
        withSearchButton ? 'border-r-0 rounded-r-none pl-4 pr-8' : 'pl-10 pr-4',
        inputClass ? inputClass : `
          appearance-none
          block
          w-full
          border
          border-gray-400
          rounded
          py-2
          leading-tight
          focus:outline-none
          bg-gray-100
          text-gray-600
          focus:bg-white
          focus:border-gray-500
      `]"
      type="search"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      @input="$emit('inputUpdate', searchQuery)"
      @change="$emit('inputChange', searchQuery)"
    >
    <button v-if="!withSearchButton" class="absolute left-0 inset-y-0 px-3 flex items-center text-gray-600 outline-none focus:outline-none">
      <i class="fas fa-search" />
    </button>
    <transition name="search-close-fade">
      <button
        v-if="searchQuery"
        class="absolute flex items-center right-0 inset-y-0 px-3 text-gray-600"
        :class="{ 'mr-10' : withSearchButton}"
        @click="clearSearch"
      >
        <i class="fas fa-times-circle" />
        <transition name="search-close-fade">
          <ring-loader
            v-show="loading"
            class="absolute pin-abs-center"
            thickness="2px"
            color="#606f7b"
            width="20px"
            height="20px"
          />
        </transition>
      </button>
    </transition>
    <button
      v-if="withSearchButton"
      class="px-3 flex items-center text-white bg-brand-color border-red-600 border rounded-r-lg"
      @click.prevent="$emit('inputChange', searchQuery)"
    >
      <i class="fas fa-search" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    withSearchButton: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    autofocusTime: {
      type: Number,
      default: 0,
    },
    inputClass: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Quick search',
    },
    id: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  mounted() {
    this.searchQuery = this.text;
    setTimeout(() => {
      if (this.autofocus) this.$refs[this.id].focus();
    }, this.autofocusTime);
  },
  methods: {
    clearSearch() {
      this.searchQuery = '';
      this.$emit('inputUpdate', '');
      if (this.autofocus) this.$refs[this.id].focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.search-close-fade-enter-active {
  animation: fade 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.search-close-fade-leave-active {
  animation: fade 0.1s ease-out reverse;
}
</style>
