<script lang="ts">
import { defineComponent } from "vue";
import InputMixin from "../mixins/validator";

export default defineComponent({
  name: "CustomInput",
  mixins: [InputMixin],
  model: {
    prop: "modelValue",
    event: "update",
  },
  emits: ["update:modelValue"],
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    errorOccured: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    fieldMismatch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      viewPwd: false,
      data: this.modelValue !== undefined ? this.modelValue : "",
    };
  },
  computed: {
    checkError() {
      if (this.type === "email") {
        return (
          this.errorOccured &&
          (!InputMixin.data().rules.isEmail(this.data) || this.fieldMismatch)
        );
      } else if (this.label.toLowerCase() === "username") {
        return (
          this.errorOccured &&
          !InputMixin.data().rules.requiredLength(this.data)
        );
      } else if (this.type === "password") {
        return (
          this.errorOccured &&
          (!InputMixin.data().rules.password(this.data) || this.fieldMismatch)
        );
      }
      return this.errorOccured && !InputMixin.data().rules.required(this.data);
    },
  },
  methods: {
    updating() {
      this.$emit("update:modelValue", this.data);
    },
  },
});
</script>

<template>
  <div class="sm:col-span-2">
    <label :for="label" class="block text-sm capitalize font-medium">{{
      label
    }}</label>

    <div class="mt-1.5 relative rounded">
      <input
        :type="type === 'password' && viewPwd ? 'text' : type"
        :id="label"
        class="block w-full sm:text-sm focus:outline-none py-2 px-2 rounded-md"
        :class="{ error: checkError }"
        :placeholder="label"
        v-model="data"
        @update:model-value="updating"
        aria-invalid="true"
        aria-describedby="email-error"
      />
      <div
        v-if="checkError"
        :class="[type === 'password' || type === 'email' ? 'pr-10' : 'pr-3']"
        class="absolute inset-y-0 right-0 flex items-center pointer-events-none"
      >
        <svg
          role="button"
          class="h-5 w-5 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <!-- icon for contact -->
      <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
        v-if="type === 'email'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- icon for password -->
      <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
        v-if="type === 'password'"
      >
        <button @click="viewPwd = !viewPwd" type="button">
          <svg
            v-if="viewPwd"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </button>
      </div>
    </div>
    <p v-if="checkError" class="mt-2 text-sm text-red-600">
      {{ errorMessage }}.
    </p>
  </div>
</template>

<style lang="scss" scoped>
label {
  color: var(--form-dark-label-color);
}

input {
  color: var(--form-dark-label-color);
  background: #404040;
}

.error {
  @apply pr-10 border-red-300 focus:ring-red-500 focus:border-red-500;
}
</style>
