<script setup>
defineProps({
  // take in login or register
  error: String,
  id: String,
});

const errorMsgs = {
  empty: "Please fill in your ",
  invalidEmail: "Please make sure your email has an @",
  shortPw: 'Please make sure your password is 8 characters long',
  unequalPws: 'Please make sure your passwords match',
  uncheck: 'Please check the terms and conditions',
};

function DisplayError(error, id) {
  if (error == "empty") {
    return errorMsgs[error] + id;
  } else {
    return errorMsgs[error]
  }
  
}
</script>

<template>
  <span class="xs:inline text-xs text-rose-400 ml-2">{{
    DisplayError(error, id)
  }}</span>
</template>
