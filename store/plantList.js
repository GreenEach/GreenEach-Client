const { observable } = require("mobx");

const plantListStore = observable({
    listId: '',

    setId(id) {
        this.listId = id;
    },

    commentList: [],
    setCommentList(array) {
        this.commentList = array;
    }
})

export { plantListStore };