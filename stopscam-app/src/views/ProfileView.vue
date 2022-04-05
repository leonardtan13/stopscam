<script setup>
import { reactive } from "vue";
import { auth, db } from "../firebase";
import userInfo from "../components/UserInfo.vue";

const userObj = reactive({
  name: "Leonardo Dicaprio",
  repScore: 89,
  userID: "",
  profileURL: "",
});

function findUser(userID) {
  db.collection("users")
    .doc(userID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userObj.name = doc.data().name;
        userObj.profileURL = doc.data().userPicURL;
        console.log(userObj.profileURL)
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

auth.onAuthStateChanged(function (user) {
  if (user) {
    userObj.userID = user.uid;
    // call the user function here to get all the other data
    findUser(userObj.userID);
  }
});
</script>

<template>
  <userInfo
    :user-i-d="userObj.userID"
    :user-name="userObj.name"
    :user-rep-score="userObj.repScore"
    :user-pic-u-r-l="userObj.profileURL"
  >
  </userInfo>
</template>

<style scoped>
body {
  background-color: #0d3939;
}
</style>
