<script setup>
import { ref, reactive } from "vue";
import { auth, db } from "../firebase";
import router from "../router";

import FormInput from "../components/FormInput.vue";
import SideBanner from "../components/SideBanner.vue";
import FormToggle from "../components/FormToggle.vue";
import FormButton from "../components/FormButton.vue";
import ErrorMsg from "../components/ErrorMsg.vue";

const state = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  checkbox: false,
  valid: false,
});

const error = reactive({
  name: [false, ""],
  email: [false, ""],
  password: [false, ""],
  confirmPassword: [false, ""],
  checkbox: [false, ""],
});

const authenticate = reactive({
  invalid: false,
  message: "",
});

function checkEmail(userInput) {
  let firstCheck = checkEmpty(userInput);
  if (firstCheck[0]) {
    return firstCheck;
  } else if (!userInput.includes("@")) {
    return [true, "invalidEmail"];
  } else {
    return [false, ""];
  }
}
function checkPasswords(password) {
  let firstCheck = checkEmpty(password);
  if (firstCheck[0]) {
    return firstCheck;
  }
  if (password.length < 8) {
    return [true, "shortPw"];
  } else {
    return [false, ""];
  }
}

function crossCheckPasswords(password, confirmPassword) {
  if (password != confirmPassword) {
    return [true, "unequalPws"];
  } else {
    return [false, ""];
  }
}

function checkEmpty(userInput) {
  if (userInput === "") {
    return [true, "empty"];
  } else {
    return [false, ""];
  }
}

function checkTerms(userInput) {
  if (!userInput) {
    return [true, "uncheck"];
  } else {
    return [false, ""];
  }
}

function formValid() {
  error.name = checkEmpty(state.name);
  error.email = checkEmail(state.email);
  error.password = checkPasswords(state.password);
  error.confirmPassword = checkPasswords(state.password);

  if (!error.password[0] && !error.confirmPassword[0]) {
    error.confirmPassword = crossCheckPasswords(
      state.password,
      state.confirmPassword
    );
  }
  error.checkbox = checkTerms(state.checkbox);
  for (let key in error) {
    if (error[key][0]) {
      return false;
    }
  }
  return true;
}

const loading = ref(false);

const Register = () => {
  loading.value = true;
  //validation checks
  state.valid = formValid();

  // Sending valid data to firebase
  if (state.valid) {
    auth
      .createUserWithEmailAndPassword(state.email, state.password)
      .then(() => {
        loading.value = false;
        let user = auth.currentUser;
        console.log("register", user.uid);
        let userId = user.uid;
        if (user) {
          db.collection("users")
            .doc(userId)
            .set({
              email: state.email,
              name: state.name,
              downvotesReceived: 0,
              upvotesReceived: 0,
              userPicURL:
                "https://stopscam.s3.ap-southeast-1.amazonaws.com/default/scam-icon.png",
            })
            .then(() => {
              router.push("/feed"); // redirect to the feed
            })
            .catch((dbError) => {
              console.log("problem adding to DB", dbError);
            });
        }
      })
      .catch((fbError) => {
        loading.value = false;
        authenticate.invalid = true;
        authenticate.message = fbError.code;
        error.email = [true, ""];
      });
  } else {
      window.setTimeOut(loading.value = false, 3000);
  }
};
</script>

<template>
  <div class="h-screen w-screen flex justify-center sm:mt-20">
    <div class="w-4/5 sm:w-1/3">
      <SideBanner message-index="register" />
      <div
        class="rounded-2xl bg-white rounded overflow-hidden shadow-xl p-5 sm:absolute right-10"
      >
        <form class="space-y-4" @submit.prevent="Register">
          <div class="rounded-md space-y-px sm:px-3">
            <div class="grid gap-6">
              <div class="col-span-12 h-14">
                <FormInput
                  id="name"
                  v-model="state.name"
                  type="text"
                  name="User Name"
                  :input-error="error.name[0]"
                />
                <ErrorMsg
                  v-if="error.name[0]"
                  id="User Name"
                  :error="error.name[1]"
                />
              </div>

              <div class="col-span-12 h-14">
                <FormInput
                  id="email_address"
                  v-model="state.email"
                  type="text"
                  name="Email Address"
                  :input-error="error.email[0]"
                />
                <ErrorMsg
                  v-if="error.email[0]"
                  id="Email"
                  :error="error.email[1]"
                />
                <ErrorMsg
                  v-if="authenticate.invalid"
                  id="authenticate"
                  :error="authenticate.message"
                />
              </div>

              <div class="col-span-12 h-14">
                <FormInput
                  id="password"
                  v-model="state.password"
                  type="password"
                  name="Password"
                  :input-error="error.password[0]"
                />
                <ErrorMsg
                  v-if="error.password[0]"
                  id="Password"
                  :error="error.password[1]"
                />
              </div>

              <div class="col-span-12">
                <FormInput
                  id="confirmPassword"
                  v-model="state.confirmPassword"
                  type="password"
                  name="Confirm Password"
                  :input-error="error.confirmPassword[0]"
                />
                <ErrorMsg
                  v-if="error.confirmPassword[0]"
                  id="Confirm Password"
                  :error="error.confirmPassword[1]"
                />
              </div>
            </div>
            <div class="form-check pt-4">
              <input
                id="accept"
                v-model="state.checkbox"
                type="checkbox"
                class="form-checkbox h-3 w-3 text-green-600"
              />
              <span class="text-xs ml-2 text-gray-700">
                I agree to the
                <span class="font-bold">Terms of Service</span> and
                <span class="font-bold">Privacy Policy</span>
              </span>
            </div>
            <ErrorMsg
              v-if="error.checkbox[0]"
              id="Checkbox"
              :error="error.checkbox[1]"
            />
          </div>

          <FormButton toggle-index="register" :spinner="loading" />
        </form>

        <FormToggle toggle-index="register" />
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #0d3939;
}
</style>
