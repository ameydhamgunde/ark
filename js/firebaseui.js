var uid, name;
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      let user = authResult.user;
      let credential = authResult.credential;
      let isNewUser = authResult.additionalUserInfo.isNewUser;
      let providerId = authResult.additionalUserInfo.providerId;
      let operationType = authResult.operationType;
      uid = user.uid;
      name = user.displayName;
      console.log(uid, name);
      return false;
    },
    signInFailure: function (error) {
      console.log(error);
      return error;
    }
  },
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  tosUrl: function () {
    alert("Coming soon");
  },
  privacyPolicyUrl: function () {
    alert("Coming soon");
  }
};
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#firebaseui", uiConfig);
