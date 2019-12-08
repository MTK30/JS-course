import Search from './models/Search';
import Receipe from './models/Receipe';
import List from './models/ShoppingList';
import Likes from './models/like';
import {elementName,renderLoader,stopLoadaer} from './views/base';
import * as SearchView from './views/viewSearch';
import * as ReceipeView from './views/receipeView';
import * as ListView from './views/shoppingView';
import * as LikeView from './views/likesView';




// This will act as the Controller of the object this is where the state of the object will be 
// Stored 




/**
 * stroeing the state of the application with the details like 
 * Search
 * receipies
 * favourites 
 * likes
 * 
 */
const state =   { };

/**
 * Search COntroller 
 */
const search = async () => 
{
    
    //get the Query from the view 
    const queryString = SearchView.getInput();//TODO 
    console.log(queryString);
    if(queryString && queryString !== 'pizza' &&  queryString !=='bacon' && queryString !=='broccoli') {
        alert("No results for such Query !!!!!");
        SearchView.clearSearchEL();
        preventDefault();
    }
    if(queryString) {
        // clear the Search result of the search Query
        SearchView.clearSearchEL();
        // clear the result tile
        SearchView.clearResultTile();
        // new search object and save them to the state 
        state.search = new Search(queryString);
        renderLoader(elementName.resultELementHead);

        //prepare UI Results
        try {
            await state.search.getResults();
            console.log("h1");
            console.log(state.search.result)

        }catch(error){
            throw error;
        }
        //render the UI after the results 
        stopLoadaer();
        SearchView.renderResut(state.search.result);
    }
}


elementName.searchButton.addEventListener('submit',e =>{
    e.preventDefault(); 
    search();
    })

    
/**
 * Pagination For Search Results in Search Results
 *  */    
elementName.searchRes.addEventListener('click' , e => {
    const button = e.target.closest('.btn-inline');
    if ( button) {
        const toPage = parseInt(button.dataset.goto,10);
        SearchView.clearResultTile();
        SearchView.renderResut(state.search.result,toPage);
    }
})




















/**
 * Receipe Controller
 */

const receipeControl = async () => {

    const id = window.location.hash.replace('#','');
    console.log(id);
    if (id) {
        //prepare UI for results
        ReceipeView.clearReceipe();
        if(state.search) SearchView.highLightSelected(id);
        renderLoader(elementName.receipe)
        //hit the API and get The Results
        state.receipe = new Receipe(id);
        try {
            await state.receipe.getReceipeDetails();
            state.receipe.parseIngredients();

            // Calculate servings and time
            state.receipe.calculateTime();
            state.receipe.calculateServings();
            //clear the loader
            stopLoadaer()

            ReceipeView.renderReceipe(
                state.receipe,
                state.Likes.isLiked(id)
                );
             
        }
        catch (error) {
            alert(`Something went wrong ${error}`);
        }

        //
        //render receipe
    
        
        
    }
}
//Binding Event Listner to different events
['hashchange','load'].forEach(event => window.addEventListener(event,receipeControl));



// handling the reciepie button clicks 
elementName.receipe.addEventListener('click',e => {
    if(e.target.matches('.btn-decrease,.btn-decrease *')) {
        // decrease the servings count.
        if(state.receipe.receipe_serves >= 1) {
            state.receipe.updateServings('dec');
            ReceipeView.updateIngredients(state.receipe);
        }
    }
    else if(e.target.matches('.btn-increase,.btn-increase *')) {
        // increase count the servings count.
        state.receipe.updateServings('inc');
        ReceipeView.updateIngredients(state.receipe);
    }else if (e.target.matches('.recipe__btn_add,.recipe__btn_add *')) {
        //call the List COntroller (Shopping List)
        listContoller();
    }
    else if (e.target.matches('.recipe__love,.recipe__love *')) {
        // call the like Controller
        likesController();
    }
    
})







// Shooping List controller 

const listContoller = () => {
    if (!state.list) {
        state.list = new List();
    }
    state.receipe.ingredients.forEach( el => {
        const item = state.list.addItem(el.count,el.unit,el.ingredient);
        ListView.renderSHoppingItem(item);
    });
}




// handle delte and update Shopping List Events 
elementName.shoppingList.addEventListener('click',event => {
    const id = event.target.closest('.shopping__item').dataset.itemid;
    //handle the delete event 
    if (event.target.matches('.shopping__delete,.shopping__delete *')) {
        state.list.deletItem(id);
        ListView.deleteItemShoppgist(id);
    }
    //handle the count update value 
    else if (event.target.matches('.shopping_count_value')) {
        const val = parseFloat(event.target.value,10);
        state.list.updateCount(id,val);
    }
    
});

//Likes Controller 
const likesController = () => {
    if (!state.Likes) {
        state.Likes = new Likes();
    }
    const curerntId = state.receipe.id;
    //not liked yet
    if(!state.Likes.isLiked(curerntId)) {
        // add like to the state
        const newLike = state.Likes.addLike(
            curerntId,
            state.receipe.title,
            state.receipe.author,
            state.receipe.img
        );
        // Toggle the button button 
        LikeView.toogleLike(true);
        
        //add like to the list 
        LikeView.LikeListView(newLike);
    }
    // has liked the receipe
    else {
        //remove the like from the state 
        state.Likes.deleteItem(curerntId);

        //toggle the liek button 
        LikeView.toogleLike(false);
        
        //remove the button from the UI list 
        LikeView.deletLikeElement(curerntId);
    }
    LikeView.toggelLikeMenu(state.Likes.getNoOfLikes());
    console.log(state.Likes);
}


window.addEventListener('load',()=> {
    state.Likes = new Likes();
    // read te presisten data 
    state.Likes.readPresistenData();
    //toggle the menu
    LikeView.toggelLikeMenu(state.Likes.getNoOfLikes());
    state.Likes.Likes.forEach(like => {
      LikeView.LikeListView(like);  
    });

})