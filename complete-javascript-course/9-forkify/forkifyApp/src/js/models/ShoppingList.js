import uniqid from 'uniqid';

export default class ShoppingList {
    constructor() {
        this.item = [];
    }
    addItem(count,unit,ingredient) {
        const item = {
                id:uniqid(),
                count,
                unit,
                ingredient
        }
        this.item.push(item);
        return item;
    }
    deletItem(id) {
        const index = this.item.findIndex(el => el.id === id);
        //diff b/w slice and Splice
        //[1,2,3] splice(1,1) --> return 2 and arry will be [1,3] and for splice(1,2) return [2,3] and ary [1] 
        //[1,2,3] slice(1,1) --> nothing(not inclusive upper range ) for slice(1,2) return [2,3] and ary [1,2,3]
        return this.item.splice(index,1);
    }   

    updateCount(id,newCount) {
        const item = this.item.find(el => el.id ===id);
        item.count = newCount;
    }
}