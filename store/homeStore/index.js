const { observable, action, autorun } = require("mobx");

const userState = observable({
  isLogin: false,
  
});



autorun(() => {
  console.log("changed", state.isLogin);
});
