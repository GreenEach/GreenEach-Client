const { observable, action, autorun } = require("mobx");

const state = observable({
  isLogin: false,
});

const login = action(() => {
  state.isLogin = true;
});

//runinaction은 바로 실행
//상태값변환(=action)

autorun(() => {
  console.log("changed", state.isLogin);
});
