const { observable } = require("mobx");
import axios from 'axios';


const commentClick = observable({
    isClick: false,
    toggle() {
        this.isClick = !this.isClick
    }
})



export { commentClick };