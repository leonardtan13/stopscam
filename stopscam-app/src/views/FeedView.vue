<script setup>
import CardComponent from "../components/CardComponent.vue";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import "../index.css";
import { ref, onBeforeMount } from "vue";
import { createPost, uploadFiletoS3 } from "../services/store";

//ENUMS FOR POST STATE
const LEGIT = 1;
const UNDER_REVIEW = 2;
const SCAM = 3;

//STATE VARAIABLES
const selected_filter = ref(UNDER_REVIEW);
const isOpen = ref(false);
const postSuccess = ref(false);

//FORM VARIABLES
const link = ref("");
const caption = ref("");
const file = ref("");
const isScam = ref(false);

const selected_post_style = (current_state) => {
  return selected_filter.value === current_state
    ? ["text-white", "bg-teal-700"]
    : ["text-gray-700"];
};

onBeforeMount(() => {
  document.body.style.backgroundColor = "#0d3939";
});

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const submitFile = () => {
  isOpen.value = false;
  const postID = uuidv4();
  const userID = "KD7DAHDS74HFD"; //hard-code for now

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
        upvoteCount: 0,
        downvoteCount: 0,
      };

      createPost(post)
        .then((response) => {
          postSuccess.value = true;
          caption.value = "";
          isScam.value = false;
          link.value = "";
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

const data = [
  {
    scamLink: "http://tripadvisory.com",
    caption:
      "Check out the site! Definitely not the tripadvisor that we know of! Visually, it looks almost similar to the authentic website. I almost made my booking here. Becareful everyone!",
    imgURLS: [
      "https://www.webintravel.com/wp-content/uploads/2018/11/tripadvisor2.jpg",
      "https://ttripper.wpengine.com/wp-content/uploads/2018/09/TripAdvisor-New-Interface.jpg",
      "https://hub.wtm.com/wp-content/uploads/2015/03/PastedGraphic-3.jpg",
    ],
    avatar:
      "https://media.gq.com/photos/56bcb218cdf2db6945d2ef93/16:9/w_2000,h_1125,c_limit/bieber-coverstory-square.jpg",
    user: "JustinBelieber",
    duration: "6h",
    voteCount: 20,
  },
  {
    scamLink: "http://yahooofinanace.com",
    caption: "Something fishy about this... Better be safe right?",
    imgURLS: [
      "https://daytradereview.com/wp-content/uploads/2019/09/Yahoo-Finance-Premium-Dashboard-1024x787.jpg",
      "https://i.ytimg.com/vi/9ZdrwNffwuc/maxresdefault.jpg",
    ],
    avatar: "https://i.mydramalist.com/6q6Z2_5c.jpg",
    user: "SungKyungLee",
    duration: "8h",
    voteCount: 35,
  },
  {
    scamLink: "http://bankofaamerica.com",
    caption:
      "My grandparents almost fell for this one, hoping this reach as many people as possible!",
    imgURLS: [
      "http://s3.amazonaws.com/finovate-archive/old/WindowsLiveWriter/BankofAmericaFraudHold_14547/image_thumb.png",
      "https://finovate-wpengine.netdna-ssl.com/wp-content/uploads/2016/12/bofa-home-with-promo-for-features.jpg",
      "http://s3.amazonaws.com/finovate-archive/old/WindowsLiveWriter/TrackingBankofAmerica_ECE2/image%7B0%7D_thumb%5B9%5D.png",
    ],
    avatar:
      "https://i.zoomtventertainment.com/story/Rose_at_MET_Gala.png?tr=w-1200,h-900",
    user: "RoseBlackPink",
    duration: "10h",
    voteCount: 555,
  },
  {
    scamLink: "http://ocbc-sg.com",
    caption:
      "In light of the recent scams, here is another potential scam site received via phone message this morning",
    imgURLS: [
      "https://www.ocbc.com/iwov-resources/sg/ocbc/personal/img/live/digitalbanking/security-advisory/phishingwebsite_example1.png",
      "https://www.ocbc.com/iwov-resources/sg/ocbc/personal/img/live/digitalbanking/security-advisory/phishingemail_example1.png",
      "https://www.ocbc.com/iwov-resources/sg/ocbc/personal/img/live/digitalbanking/security-advisory/security-image-1.png",
    ],
    avatar:
      "https://media-exp1.licdn.com/dms/image/C5603AQHc57nlB301dQ/profile-displayphoto-shrink_800_800/0/1597763158199?e=1652918400&v=beta&t=Wp_1rCF6oK46LSCz9xWZNn_euavws5tDAvBDZLggefI",
    user: "Leonardo",
    duration: "14h",
    voteCount: 36,
  },
  {
    scamLink: "http://cpf.government.com",
    caption:
      "Parents almost keyed in their Singpass details..... A close shave, please take note!",
    imgURLS: [
      "https://www.asiaone.com/sites/default/files/original_images/Dec2015/20151214_cpf.jpg",
    ],
    avatar:
      "https://media-exp1.licdn.com/dms/image/C5103AQH4suaqrWXUFA/profile-displayphoto-shrink_800_800/0/1575890945695?e=1652918400&v=beta&t=pLqjned5sdZCLP6tv4vfYr6rLpz_byv9WIkudSKVyLQ",
    user: "UpperMoon1",
    duration: "18h",
    voteCount: 90,
  },
];
</script>

<template>
  <!--Post Success Alert-->
  <div
    v-if="postSuccess"
    class="relative bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
    role="alert"
  >
    <div class="flex">
      <div class="py-1">
        <svg
          class="fill-current h-6 w-6 text-teal-500 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
          />
        </svg>
      </div>
      <div>
        <p class="font-bold">Your Post has been successfully uploaded</p>
        <p class="text-sm">
          Do refresh the page to view the latest posts in your feed.
        </p>
        <span
          class="absolute top-0 bottom-0 right-0 px-4 py-3"
          @click="postSuccess = false"
        >
          <svg
            class="fill-current h-6 w-6 text-teal-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
  <!-- Search bar -->
  <div class="text-gray-600 text-base mx-auto my-5 w-2/3 h-15">
    <div class="grid grid-cols-6 gap-4 h-full">
      <img
        class="self-center justify-self-end object-cover rounded-full w-12 h-12"
        src="https://0.soompi.io/wp-content/uploads/2022/01/11203504/Kim-Tae-Ri2.jpg"
        alt="Profile image"
      />
      <input
        class="col-span-4 bg-white px-5 rounded-lg focus:outline-none"
        type="text"
        name="create"
        placeholder="Post something to your community"
        @click="isOpen = true"
      />
    </div>
  </div>

  <!-- Form Modal -->
  <TransitionRoot as="template" :show="isOpen">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="isOpen = false"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <div class="mt-2">
                    <div class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
                      <h3
                        class="text-xl font-medium text-gray-900 dark:text-white"
                      >
                        What do you wish to share today?
                      </h3>
                      <div>
                        <label
                          for="link"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >Link</label
                        >
                        <input
                          id="link"
                          v-model="link"
                          type="text"
                          name="link"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="name@company.com"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="caption"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                          >Caption</label
                        >
                        <textarea
                          id="caption"
                          v-model="caption"
                          rows="4"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Additional details..."
                        ></textarea>
                      </div>
                      <div>
                        <label
                          for="formFile"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >Screenshots</label
                        >
                        <input
                          id="formFile"
                          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          type="file"
                          @change="handleFileUpload($event)"
                        />
                      </div>

                      <div
                        class="flex items-center justify-center w-full mb-12"
                      >
                        <label
                          for="toogle"
                          class="flex items-center cursor-pointer"
                        >
                          <div class="relative">
                            <input
                              id="toogle"
                              v-model="isScam"
                              type="checkbox"
                              class="sr-only"
                            />
                            <div
                              class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"
                            ></div>
                            <div
                              class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"
                            ></div>
                          </div>
                          <div class="ml-3 text-gray-700 font-medium">Scam</div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                ref="cancelButtonRef"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="isOpen = false"
              >
                Cancel
              </button>
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                @click="submitFile()"
              >
                Post
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Page Filter -->
  <nav class="md:px-4 px-2 mx-auto my-5 w-1/3 rounded-lg">
    <div
      class="container mx-auto grid grid-cols-3 justify-evenly justify-items-center"
    >
      <div>
        <button
          class="block md:px-6 md:py-4 p-2 rounded-lg text-white text-xs sm:text-lg w-full"
          :class="selected_post_style(UNDER_REVIEW)"
          aria-current="page"
          @click="selected_filter = UNDER_REVIEW"
        >
          Under Review
        </button>
      </div>
      <div>
        <button
          class="block md:px-6 md:py-4 p-2 rounded-lg text-white text-xs sm:text-lg w-full"
          :class="selected_post_style(LEGIT)"
          @click="selected_filter = LEGIT"
        >
          Legit Page
        </button>
      </div>
      <div>
        <button
          class="block md:px-6 md:py-4 p-2 rounded-lg text-white text-xs sm:text-lg w-full"
          :class="selected_post_style(SCAM)"
          @click="selected_filter = SCAM"
        >
          Scam Page
        </button>
      </div>
    </div>
  </nav>

  <div class="w-2/3 mx-auto bg-white rounded-xl">
    <!-- Nav Filter -->
    <ul class="w-5/6 flex gap-2 mx-auto h-18">
      <li class="px-5 pt-5">
        <a
          class="font-sans text-md sm:text-xl inline-block default-text"
          href="#"
          >All</a
        >
      </li>
      <li class="px-5 pt-5">
        <a
          class="font-sans text-md sm:text-xl inline-block default-text"
          href="#"
          >Top</a
        >
      </li>
    </ul>

    <!-- Rendering of different posts-->
    <CardComponent
      v-for="(post, index) in data"
      :key="index"
      class="mb-5"
      :scam-link="post.scamLink"
      :caption="post.caption"
      :img-u-r-l-s="post.imgURLS"
      :avatar="post.avatar"
      :user="post.user"
      :duration="post.duration"
      :vote-count="post.voteCount"
    />
  </div>
</template>

<style scoped>
input:checked ~ .dot {
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
}
</style>
