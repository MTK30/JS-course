import Search from './models/Search';
import {elementName,renderLoader,stopLoadaer} from './views/base';
import * as SearchView from './views/viewSearch';


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
const search = async () => 
{
    
    //get the Query from the view 
    const queryString = SearchView.getInput();//TODO 
    console.log(queryString);
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

elementName.searchRes.addEventListener('click' , e => {
    const button = e.target.closest('.btn-inline');
    if ( button) {
        const toPage = parseInt(button.dataset.goto,10);
        SearchView.clearResultTile();
        SearchView.renderResut(state.search.result,toPage);
    }
})

