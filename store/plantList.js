const { observable } = require("mobx");

const plantListStore = observable({
    listData: ''
})

export { plantListStore };