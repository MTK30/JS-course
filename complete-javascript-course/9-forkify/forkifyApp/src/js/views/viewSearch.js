import {elementName,myVariable} from './base';
import { basename } from "path"
/**
 * This class is to append add and modify the view part of html
 */

// function that accepts the input of the user
export const getInput = () =>  {
    return elementName.searchElement.value;
}


//highlectSelected 
export const highLightSelected = (id) => {
    const aryContaingClass = Array.from(document.querySelectorAll('.results__link--active'));
    aryContaingClass.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
}


// function that takes care abouth the length of the title of recie in each receipie result
export const limitTItleOfRecipe = (title,limit = 17) => {
    const newTitle = [];
    console.log("");
    if(title.length > 17) {
        title.split(' ').reduce((acc,cur) =>{
            const lenOfcurWIthNew = acc + cur.length; 
            if(lenOfcurWIthNew < 17) {
                 newTitle.push(cur)
             }
             return lenOfcurWIthNew;
        },0)
        title = `${newTitle.join(' ')}...`;
    }
    return title;
}

//function that renders html elements oth eresultant reciepie
const receipeELement = receipe => {
    let receipeHtml =  `
    <li>
        <a class="results__link" href='#${receipe.recipe_id}'>
            <figure class="results__fig">
                <img src="${receipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitTItleOfRecipe(receipe.title)}</h4>
                <p class="results__author">${receipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elementName.resultList.insertAdjacentHTML('beforeend',receipeHtml);

}


const createButton = (page , type ) => {
    return  `
                <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page -1 : page + 1}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
                    </svg>
                    <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
                </button>
    ` ;
}


const renderPaginationButton = (page,numOfResults,resPerPage) => {
    const pages = Math.ceil(numOfResults/resPerPage);
    let button;
     if (page === 1 && pages >1) {
         button = createButton(page,"next");
         // render the next button for page 2
     }
     else if (page < pages ) {
        //render the prev & next button
        button = `${createButton(page,"prev")}
                  ${createButton(page,"next")}
           `;
    }
     else if (page ===pages && pages >1) {
         // only the preve button
         button = createButton(page,"prev");
     }
    elementName.searchRes.insertAdjacentHTML('afterbegin',button);
}

// function that renders the search result based on the Query
export const renderResut = (receipies,page = 1,resPerPage = 10) => {
    // results rendering based on the pagination 
    const start = (page -1) * resPerPage;
    const end = page * resPerPage; 
    receipies.slice(start,end).forEach(receipeELement);

    // add buttons based on the results 
    renderPaginationButton(page,receipies.length,resPerPage);
}


//function to clear the search text area after every search resut is rendered
export const clearSearchEL = () => { 
    elementName.searchElement.value = "";
}

//function to clear the result tile after every new search QUery is placed.
export const clearResultTile = () => {
    elementName.resultList.innerHTML = "";
    elementName.searchRes.innerHTML = "";
}