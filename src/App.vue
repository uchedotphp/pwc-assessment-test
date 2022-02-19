<script setup lang="ts"></script>

<template>
  <div class="page-container">
    <div class="form-container">
      <div class="flex justify-end">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-white p-1.5 rounded-full hover:bg-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <!-- main form resides in here-->
      <div>main form</div>
    </div>
  </div>
</template>

<style lang="scss">
.page-container {
  @apply min-h-screen grid place-content-center;
  background: #575757;
}

.form-container {
  background: #202020;
  border-radius: 12px;
  width: 70vw;
}
</style>
