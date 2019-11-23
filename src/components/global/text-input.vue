<template>
  <div class="my-5 relative">
    <label v-if="label" class="block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase" :for="id">
      {{ label }}
    </label>
    <input
      :id="id"
      :ref="id"
      :class="[
        inputClass ? inputClass : `
          block
          appearance-none
          w-full
          bg-gray-100
          border
          border-gray-400
          hover:border-gray-500
          px-4
          py-2
          rounded
          leading-tight
          focus:outline-none
      `]"
      type="tel"
      :placeholder="placeholder"
    >
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    loading: {
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
  },
};
</script>
