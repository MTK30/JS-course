/**4
 * place where commi=on functionality of the user si provided 
 * File Storing the list of the elements that can be used for manipulation of the object
 */

export const  elementName =  
{
    searchButton : document.querySelector('.search'),
    searchElement : document.querySelector('.search__field'),
    resultELementHead : document.querySelector('.results'),
    resultList: document.querySelector('.results__list'),
    searchRes : document.querySelector('.results__pages'),
    likesMenu : document.querySelector('.likes__field'),
    likeList : document.querySelector('.likes__list'),
    shoppingList : document.querySelector('.shopping__list'),
    receipe : document.querySelector('.recipe')
}

export const elementString = {
    loaderClass : "loader"
}


// function to render the loader gif before the actual results starts 
export const renderLoader = (parent) => {
    const loader = ` <div class ="${elementString.loaderClass}"> 
        <svg>
            <use href = "img/icons.svg#icon-cw"></use>
        </svg>
      </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
}

// function to stop the loader img
export const stopLoadaer =  () => {
    const loader = document.querySelector('.loader');
    if(loader) loader.parentElement.removeChild(loader);//to remove any Element we have to first go to... 
    //parent than from that parent we can remove the child .

}
