<template>
  <div
    class="
      flex
      max-w-sm
      w-full
      justify-center
      bg-white
      shadow-md
      rounded-lg
      overflow-hidden
      mx-auto
      flex flex-col
      p-6
    "
  >
    <h3 class="text-2xl font-bold mb-4">Login already</h3>
    <form>
      <div class="relative h-10 input-component mb-5">
        <input
          id="iEmail"
          type="text"
          name="iEmail"
          bind:value="{iEmail}"
          class="
            h-full
            w-full
            border-gray-300
            px-3
            transition-all
            border-blue
            rounded-sm
          "
        />
        <label for="iEmail" class="absolute left-1 transition-all bg-white px-1"
          >Email</label
        >
      </div>
      <div class="relative h-10 input-component mb-5">
        <input
          id="iPassword"
          type="text"
          name="iPassword"
          placeholder="Password-of-Life"
          bind:value="{iPassword}"
          class="
            h-full
            w-full
            border-gray-300
            px-2
            transition-all
            border-blue
            rounded-sm
          "
        />
        <label
          for="iPassword"
          class="absolute left-2 transition-all bg-white px-1"
        >
          Ridiculously Complicated Password
        </label>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <!-- on:click={addBook} -->
          <button
            class="
              shadow
              bg-purple-500
              hover:bg-purple-400
              focus:shadow-outline focus:outline-none
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
            type="button"
          >
            Request Entry
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
let iEmail = "bubba@texas.com";
// eslint-disable-next-line no-unused-vars
let iPassword = "1234";
</script>

<style style lang="postcss">
main {
  @apply text-left;
  @apply p-4;
  @apply mx-auto;
}

h1 {
  @apply text-red-600;
  @apply uppercase;
  @apply text-6xl;
  @apply font-thin;
  @apply leading-tight;
  @apply my-16 mx-auto;
  @apply max-w-xs;
}

h2 {
  @apply text-red-600;
  @apply uppercase;
  @apply text-3xl;
  @apply font-thin;
  @apply leading-tight;
  @apply my-8 mx-auto;
  @apply max-w-xs;
}

p {
  @apply max-w-xs;
  @apply my-8 mx-auto;
  @apply leading-snug;
}

@screen sm {
  h1 {
    @apply max-w-none;
  }

  h2 {
    @apply max-w-none;
  }

  p {
    @apply max-w-none;
  }
}

label {
  top: 0%;
  transform: translateY(-50%);
  font-size: 11px;
  color: rgba(37, 99, 235, 1);
}

.empty input:not(:focus) + label {
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
}

input:not(:focus) + label {
  color: rgba(70, 70, 70, 1);
}

input {
  border-width: 1px;
}

input:focus {
  outline: none;
  border-color: rgba(37, 99, 235, 1);
}
</style>
