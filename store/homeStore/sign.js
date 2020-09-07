const { observable, action, autorun } = require("mobx");

const modalShowState = observable({
  signUpshow : false,  
  signInshow : false
});

const userState = observable({
  isLoggedIn : false,
  data: null,
  signIn(data){
    this.isLoggedIn = true;
    this.data = data;
  },
  signUp(data){
    this.data = data;
  },
  logOut() {
    this.data = null;
    this.isLoggedIn = false;
  }
});





export {modalShowState, userState};