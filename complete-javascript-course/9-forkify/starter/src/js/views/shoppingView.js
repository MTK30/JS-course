import {elementName} from './base';

export const renderSHoppingItem = item => {
    const markUp = `
        <li class="shopping__item" data-itemId=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class = "shopping_count_value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;
    elementName.shoppingList.insertAdjacentHTML('beforeend',markUp);
};

export const deleteItemShoppgist = id => {
    const  theItemTODelete= document.querySelector(`[data-itemid = "${id}"]`);
     if(theItemTODelete) {
        theItemTODelete.parentElement.removeChild(theItemTODelete);
     }
};