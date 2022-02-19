<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalAlert",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    formDetails: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    update() {
      this.$emit("close");
    },
  },
});
</script>

<template>
  <div
    :class="{ 'fixed z-10 inset-0 overflow-y-auto': show }"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      v-show="show"
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
      >
        <div>
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
          >
            <svg
              class="h-6 w-6 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Form successful
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                email: {{ formDetails.email }}
              </p>
              <p class="text-sm text-gray-500">
                username: {{ formDetails.username }}
              </p>
              <p class="text-sm text-gray-500">
                password: {{ formDetails.password }}
              </p>
              <p class="text-sm text-gray-500">
                subscribed to email: {{ formDetails.subscribed ? "Yes" : "No" }}
              </p>
              <p class="text-sm text-gray-500">
                checked terms and policy: {{ formDetails.terms ? "Yes" : "No" }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 grid">
          <button
            @click="update"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
