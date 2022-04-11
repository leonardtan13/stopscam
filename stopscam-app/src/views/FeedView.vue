<script setup>
import CardComponent from "../components/CardComponent.vue";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../firebase";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import "../index.css";
import { ref, onBeforeMount } from "vue";
import {
  store,
  createPost,
  uploadFiletoS3,
  getAllPendingReview,
  getAllLegitPosts,
  getAllScamPosts,
  getTopPendingReview,
  getTopLegitPosts,
  getTopScamPosts,
  retrieveNetVoteCount,
} from "../services/store";

//ENUMS FOR POST STATE
const LEGIT = 1;
const UNDER_REVIEW = 2;
const SCAM = 3;
const ALL = 4;
const TOP = 5;

//STATE VARAIABLES
const selected_filter = ref(UNDER_REVIEW);
const selected_level = ref(ALL);
const isOpen = ref(false);
const postSuccess = ref(false);
const loginWarning = ref(false);

//FORM VARIABLES
const link = ref("");
const caption = ref("");
const file = ref("");
const isScam = ref(false);

const retrieve_data = (postType, postQuantity) => {
  switch (true) {
    case postType === LEGIT && postQuantity === ALL:
      return getAllLegitPosts(store.posts);

    case postType === UNDER_REVIEW && postQuantity === ALL:
      return getAllPendingReview(store.posts);

    case postType === SCAM && postQuantity === ALL:
      return getAllScamPosts(store.posts);

    case postType === LEGIT && postQuantity === TOP:
      return getTopLegitPosts(store.posts, 0.8);

    case postType === UNDER_REVIEW && postQuantity === TOP:
      return getTopPendingReview(store.posts, 0.8);

    case postType === SCAM && postQuantity === TOP:
      return getTopScamPosts(store.posts, 0.8);
  }
};

const selected_posts = ref(
  retrieve_data(selected_filter.value, selected_level.value)
);

const handleChangeFilter = () => {
  selected_posts.value = retrieve_data(
    selected_filter.value,
    selected_level.value
  );
};

const selected_post_style = (current_state) => {
  return selected_filter.value === current_state
    ? ["text-white", "bg-teal-700"]
    : ["text-gray-700"];
};

const disabledButtonStyle = () => {
  return isDisabled() ? ["opacity-50", "cursor-not-allowed"] : [""];
};

onBeforeMount(() => {
  document.body.style.backgroundColor = "#0d3939";
  console.log("getting posts....");
  console.log(store.posts);
});

const isDisabled = () => {
  if (
    link.value.length === 0 ||
    caption.value.length === 0 ||
    file.value === ""
  ) {
    return true;
  }
  return false;
};

const cancelFileSubmission = () => {
  postSuccess.value = false;
  caption.value = "";
  isScam.value = false;
  link.value = "";
  file.value = "";
  isOpen.value = false;
};

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const submitFile = () => {
  isOpen.value = false;
  const postID = uuidv4();
  const userID = auth.currentUser.uid;

  uploadFiletoS3(
    userID,
    postID,
    file.value.name,
    file.value,
    import.meta.env.VITE_AWSAccessKeyId,
    import.meta.env.VITE_AWSSecretKey,
    import.meta.env.VITE_AWSBucket
  )
    .then((response) => {
      const post = {
        id: postID,
        date: new Date(),
        description: caption.value,
        downvotedBy: [],
        upvotedBy: [],
        isLegitSite: !isScam.value,
        isUnderReview: true,
        link: link.value,
        postedBy: userID,
        images: [response],
      };

      createPost(post)
        .then((response) => {
          postSuccess.value = true;
          caption.value = "";
          isScam.value = false;
          link.value = "";
          file.value = "";
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

const handlePost = () => {
  if (auth.currentUser === null) {
    loginWarning.value = true;
    return;
  }
  isOpen.value = true;
};

const isLoading = ref(false);

const setIsLoading = (isLoadingChange) => {
  console.log("received emit: ", isLoadingChange);
  isLoading.value = isLoadingChange;
};
</script>

<template>
  <div>
    <!-- Login Alert -->
    <div v-if="loginWarning"
      class="relative bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 sticky top-0 z-50" role="alert">
      <p class="font-bold">Warning</p>
      <p>You must login to carry out further actions.</p>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="loginWarning = false">
        <svg class="fill-current h-6 w-6 text-orange-500" role="button" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20">
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
    <!--Post Success Alert-->
    <div v-if="postSuccess"
      class="relative bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
      <div class="flex">
        <div class="py-1">
          <svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          <p class="font-bold">Your Post has been successfully uploaded</p>
          <p class="text-sm">
            Do refresh the page to view the latest posts in your feed.
          </p>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="postSuccess = false">
            <svg class="fill-current h-6 w-6 text-teal-500" role="button" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <title>Close</title>
              <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <!-- Search bar here-->
    <div class="text-gray-600 text-base mx-auto my-5 w-max sm:w-2/3 h-15">
      <div class="grid grid-cols-6 gap-4 h-full">
        <img v-if="auth.currentUser" class="self-center justify-self-end object-cover rounded-full w-12 h-12"
          :src="store.users.get(auth.currentUser.uid).userPicURL" alt="Profile image" />
        <img v-else class="self-center justify-self-end object-cover rounded-full w-10 h-10"
          src="https://stopscam.s3.ap-southeast-1.amazonaws.com/default/scam-icon.png" alt="Profile image" />
        <input class="col-span-4 bg-white px-5 rounded-lg focus:outline-none" type="text" name="create"
          placeholder="Post something to your community" @click="handlePost()" />
      </div>
    </div>

    <!-- Form Modal -->
    <TransitionRoot as="template" :show="isOpen">
      <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="isOpen = false">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
            leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div
              class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div class="mt-2">
                      <div class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
                        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                          What do you wish to share today?
                        </h3>
                        <div>
                          <label for="link"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Link</label>
                          <input id="link" v-model="link" type="text" name="link"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="name@company.com" required />
                        </div>
                        <div>
                          <label for="caption"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Caption</label>
                          <textarea id="caption" v-model="caption" rows="4"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Additional details..."></textarea>
                        </div>
                        <div>
                          <label for="formFile"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Screenshots</label>
                          <input id="formFile"
                            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="file" @change="handleFileUpload($event)" />
                        </div>

                        <div class="flex items-center justify-center w-full mb-12">
                          <label for="toogle" class="flex items-center cursor-pointer">
                            <div class="relative">
                              <input id="toogle" v-model="isScam" type="checkbox" class="sr-only" />
                              <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                              <div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition">
                              </div>
                            </div>
                            <div class="ml-3 text-gray-700 font-medium" :style="isScam ? 'color: red' : ''"
                              v-text="isScam ? 'Scam' : 'Legit'">
                            </div>
                          </label>
                        </div>
                      </div>
                      <div v-if="isDisabled()">
                        <p class="text-amber-700">
                          All fields have to be filled in before post
                          submission.
                        </p>
                      </div>
                      <div v-else>
                        <p class="text-teal-700">
                          You are all set. Click Post to finalize your
                          submission.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button ref="cancelButtonRef" type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="cancelFileSubmission()">
                  Cancel
                </button>
                <button :disabled="isDisabled()" type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  :class="disabledButtonStyle()" @click="submitFile()">
                  Post
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Page Filter -->
    <nav class="md:px-4 px-2 mx-auto my-5 w-5/6 sm:w-2/3 md:w-1/3 rounded-lg">
      <div class="container mx-auto grid grid-cols-3 justify-evenly justify-items-center">
        <div>
          <button class="block md:px-6 md:py-4 p-2 rounded-lg text-white text-md sm:text-lg w-full"
            :class="selected_post_style(UNDER_REVIEW)" aria-current="page" @click="
  selected_filter = UNDER_REVIEW;
handleChangeFilter();
            ">
            Under Review
          </button>
        </div>
        <div>
          <button class="block md:px-6 md:py-4 p-2 rounded-lg text-white text-md sm:text-lg w-full"
            :class="selected_post_style(LEGIT)" @click="
  selected_filter = LEGIT;
handleChangeFilter();
            ">
            Legit Page
          </button>
        </div>
        <div>
          <button class="block md:px-6 md:py-4 p-2 rounded-lg text-white text-md sm:text-lg w-full"
            :class="selected_post_style(SCAM)" @click="
  selected_filter = SCAM;
handleChangeFilter();
            ">
            Scam Page
          </button>
        </div>
      </div>
    </nav>

    <div v-if="selected_posts.length > 0" class="w-5/6 sm:w-2/3 mx-auto bg-white rounded-xl">
      <!-- Nav Filter -->
      <ul class="w-5/6 flex gap-2 mx-auto h-18">
        <li class="px-5 pt-5">
          <button class="font-sans text-md sm:text-xl inline-block default-text" @click="
            selected_level = ALL;
          handleChangeFilter();
          ">
            All
          </button>
        </li>
        <li class="px-5 pt-5">
          <button class="font-sans text-md sm:text-xl inline-block default-text" @click="
            selected_level = TOP;
          handleChangeFilter();
          ">
            Top
          </button>
        </li>
      </ul>

      <!-- Rendering of different posts-->
      <!-- Need a service to retrieve username based on userid -->

      <CardComponent v-for="(post, index) in selected_posts" :key="index" class="mb-5" :post-id="post.id"
        :link="post.link" :caption="post.description" :images="post.images" :date="post.date"
        :user-i-d="store.posts.get(post.id).postedBy" :vote-count="retrieveNetVoteCount(post.id)"
        :is-legit="post.isLegitSite" @restrict="loginWarning = true" />
    </div>

    <div v-else class="sm:px-20 py-10 w-3/5 mx-auto bg-white rounded-md shadow-xl border">
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-teal-600 text-lg md:text-4xl text-center">
          Seems a little empty around here...
        </h1>
        <h6 class="mb-2 text-md font-bold text-center text-gray-800 md:text-xl">
          There doesn't seem to be any posts matching your criteria.
        </h6>
      </div>
    </div>
  </div>
</template>

<style scoped>input:checked~.dot {
  transform: translateX(100%);
  background-color: red;
}

.default-text {
  color: #878a8c;
  text-align: center;
  vertical-align: bottom;
  border-bottom: 2px solid transparent;
}

.default-text:hover {
  color: #0d3939;
  border-bottom-color: #0d3939;
}</style>
