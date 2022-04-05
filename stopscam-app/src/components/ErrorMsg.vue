<script setup>
defineProps({
  // take in login or register
  error: String,
  id: String,
});

const errorMsgs = {
  empty: "Please fill in your ",
  invalidEmail: "Please make sure your email has an @",
  shortPw: "Please make sure your password is 8 characters long",
  unequalPws: "Please make sure your passwords match",
  uncheck: "Please check the terms and conditions",
  wrongUser: "User is not found",
  wrongPw: "Login fail. Please check your email/password",
};

function DisplayError(error, id) {
  if (id == "authenticate") {
    if (error) {
      error = error.split("/")[1];
      let errorArr = error.split("-");
      let displayArr = [];
      let displayError = "";
      for (let i = 0; i < errorArr.length; i++) {
        if (i == 0) {
          let word = errorArr[0].charAt(0).toUpperCase() + errorArr[0].slice(1);
          displayArr.push(word);
        } else {
          displayArr.push(errorArr[i]);
        }
      }
      displayError = displayArr.join(" ");
      return displayError;
    } else {
      return "";
    }
  }
  if (error == "empty") {
    return errorMsgs[error] + id;
  } else if (!(error in errorMsgs)) {
    return error;
  } else {
    return errorMsgs[error];
  }
}
</script>

<template>
  <span class="xs:inline text-xs text-rose-400 ml-2">{{
    DisplayError(error, id)
  }}</span>
</template>
