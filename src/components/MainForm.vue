<script lang="ts">
import { defineComponent } from "vue";
import CustomInput from "./CustomInput.vue";
import ModalAlert from "./ModalAlert.vue";
import InputMixin from "../mixins/validator";

export default defineComponent({
  name: "MainForm",
  mixins: [InputMixin],
  components: {
    CustomInput,
    ModalAlert,
  },
  data() {
    return {
      formError: false,
      showModal: false,
      subscribed: true,
      terms: false,
      form: {
        email: "",
        confirmEmail: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    isFormEmpty() {
      const values = Object.values(this.form);
      const fieldsWithValues = values.filter(Boolean);
      if (fieldsWithValues.length !== values.length) {
        return true;
      }
      return false;
    },
    emailFieldMismatch() {
      const form = this.form as { email: string; confirmEmail: string };
      return form.email !== form.confirmEmail;
    },
    passwordFieldMismatch() {
      const form = this.form as { password: string; confirmPassword: string };
      return form.password !== form.confirmPassword;
    },
  },
  methods: {
    processForm() {
      if (this.isFormEmpty || this.emailFieldMismatch || this.passwordFieldMismatch || !this.subscribed) {
        this.formError = true;
        return;
      }
      this.showModal = true;
    },
  },
});
</script>

<template>
  <form class="form-area" @submit.prevent="processForm">
    <h2 class="heading">Create a new account</h2>
    <div class="mt-4 grid grid-cols-1 gap-y-6">
      <custom-input
        label="email"
        v-model="form.email"
        type="email"
        autocomplete="off"
        :errorOccured="formError"
        :errorMessage="
          !form.email.length ? 'Field is required' : 'Please enter an email address'
        "
      />
      <custom-input
        label="confirm email"
        type="email"
        v-model="form.confirmEmail"
        :fieldMismatch="emailFieldMismatch"
        :errorOccured="formError"
        :errorMessage="
          !form.confirmEmail.length
            ? 'Field is required'
            : emailFieldMismatch
            ? 'This email does not match the email above'
            : 'Please enter an email address'
        "
      />
      <custom-input
        label="username"
        v-model="form.username"
        :errorOccured="formError"
        :errorMessage="
          !form.username.length
            ? 'Field is required'
            : 'Username requires 3 to 20 characters using letters, digits and optionally a single punctuation_character.'
        "
      />
      <custom-input
        label="password"
        type="password"
        v-model="form.password"
        :errorOccured="formError"
        :errorMessage="
          !form.password.length
            ? 'Field is required'
            : 'Password must be at least 8 characters long, contain one lowercase letter, contain one uppercase letter and include at least one number (0-9)'
        "
      />
      <custom-input
        label="confirm password"
        type="password"
        :fieldMismatch="passwordFieldMismatch"
        :errorOccured="formError"
        :errorMessage="
          !form.confirmPassword.length
            ? 'Field is required'
            : passwordFieldMismatch
            ? 'Confirm password does not match password above'
            : 'Password must be at least 8 characters long, contain one lowercase letter, contain one uppercase letter and include at least one number (0-9)'
        "
        v-model="form.confirmPassword"
      />
    </div>

    <!-- agreement area -->
    <div class="agreement">
      <div class="mt-6 flex space-x-2">
        <div class="flex items-center h-5">
          <input
            id="subscribeer-mail"
            name="subscribeer-mail"
            type="checkbox"
            v-model="subscribed"
            class="h-4 w-4 rounded"
          />
        </div>
        <label for="subscribeer-mail" class="text-sm font-medium"
          >I want to receive emails from VenewLive and its partners about
          upcoming shows and information. <span v-if="formError && !subscribed" class="text-xs text-red-600">Required</span> </label
        >
      </div>

      <div class="mt-6 flex space-x-2">
        <div class="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            v-model="terms"
            class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <label for="terms" class="text-sm font-medium"
          >By submiting this form i agree to the
          <a href="#">Terms of Service</a> and
          <a href="#">Privacy Notice</a></label
        >
      </div>
    </div>

    <!-- submit button -->
    <div class="grid justify-center pt-3 space-y-5">
      <button class="submit" type="submit">Submit</button>

      <a href="#" class="login"> Go to Log in </a>
    </div>
  </form>

  <!-- modal -->
  <modal-alert
    :show="showModal"
    :formDetails="{ ...form, terms, subscribed }"
    @close="showModal = false"
  />
</template>

<style lang="scss" scoped>
.form-area {
  @apply grid lg:gap-x-12;
  color: var(--form-dark-label-color);

  .heading {
    @apply text-center;
  }

  .agreement {
    max-width: 600px;
    a {
      text-decoration: underline;
    }
  }

  .submit {
    @apply rounded-md px-5 py-2.5;
    background: #6d2085;
    color: var(--form-dark-label-color);
  }

  .login {
    @apply text-sm text-center;
    color: rgb(109, 106, 106);
  }
}
</style>
