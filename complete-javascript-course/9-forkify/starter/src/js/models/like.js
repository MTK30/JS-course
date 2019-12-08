export default class Likes {
    constructor() {
        this.Likes = [];
    }

    addLike(id,title,author,img) {
        const like = {id,title,author,img};
        this.Likes.push(like);
        // presist the data t=in the localStorage 
        this.presistData();
        return like; 
    }

    deleteItem(id) {
        const index = this.Likes.findIndex(el => el.id === id);
        this.presistData();
        return this.Likes.splice(index,1);
    }

    isLiked(id) {
        return  this.Likes.findIndex(el => el.id === id) !== -1;
    }

    getNoOfLikes() {
        return this.Likes.length;
    }

    presistData() {
        localStorage.setItem("likes",JSON.stringify(this.Likes));
    }

    readPresistenData() {
        const storage = JSON.parse(localStorage.getItem("likes"));
        if (storage) {
            this.Likes = storage
        }
    }
}