<script setup>
//To add authentication function here
</script>

<template>
  <div class="h-screen w-screen flex justify-center sm:mt-20">
    <div class="w-4/5 sm:w-1/3">
      <div class="ml-6 mb-6 sm:absolute left-10 md:mt-4">
        <h1 class='text-4xl text-white'>Welcome back to the <br> community.</h1>
        <p class='text-sm text-white'> Login to start spreading the words. </p>
      </div>
      <div
        class="rounded bg-white rounded overflow-hidden shadow-xl p-5 sm:absolute right-10"
      >
        <form class="space-y-4" action="/post">
          <div class="rounded-md space-y-px px-3">
            <div class="grid gap-6">
              <div class="col-span-12">
                <label
                  for="email_address"
                  class="ml-1 block text-sm font-medium text-gray-700"
                  >Email address</label
                >
                <input
                  id="email_address"
                  type="text"
                  name="email_address"
                  autocomplete="email"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-12 m-2">
                <label
                  class="block ml-1 text-sm font-medium text-gray-700"
                  for="password"
                  >Password</label
                >
                <input
                  id="password"
                  type="password"
                  name="password"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-5">
            <div class="text-xs absolute right-24 sm:right-8">
              <a
                href="#"
                class="font-small text-green-600 hover:text-green-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div class="pt-4">
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Log in
            </button>
          </div>
        </form>
        <div class="flex items-center justify-center pt-5">
          <p class="text-xs">
            Not a member yet?
            <span>
              <a
                href="#"
                class="font-small text-green-600 hover:text-green-500"
              >
                Sign up
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
