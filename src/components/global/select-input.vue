<template>
  <div class="relative">
    <label v-if="label" class="block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase" :for="id">
      {{ label }}
    </label>
    <div v-if="id && options.length" class="relative">
      <select
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
            pr-8
            rounded
            leading-tight
            focus:outline-none
        `]"
      >
        <option value="">
          {{ placeholder }}
        </option>
        <option v-for="(option, i) in options" :key="`${id}-option-${i}`" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
    <div v-else>
      Please provide `id` and `options` props.
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    id: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: '---',
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
