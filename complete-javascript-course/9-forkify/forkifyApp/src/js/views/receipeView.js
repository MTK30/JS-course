import { elementName } from "./base";
import { Fraction } from 'fractional';1

const formatCount = (count) =>{
    if(count) {
        const newCount = Math.round(count* 10000)/10000;
        const [int,dec] = newCount.toString().split(".").map(el => parseInt(el,10));
        if (!dec) {
            return newCount;
        }
        if(int === 0) {
            const fr = new Fraction(newCount);
            return `${fr.numerator}/${fr.denominator}`;
        }
        else {
            const fr = new Fraction(newCount - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
    }
}

export const clearReceipe = () => {
    elementName.receipe.innerHTML = "";
}

const createIngrident = (ingredient) => 
    { 
        // console.log(ingredient);
        return `   
        <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient} 
        </div>
        </li>
    `;
    }

export const renderReceipe = (receipe,isLiked) => {
    console.log(`${receipe.ingredients.map(el => {
        createIngrident(el);  
    }).join('')
    }`);
    const renderTemplateReceipe = 
    `
    <figure class="recipe__fig">
    <img src="${receipe.img}" alt="${receipe.title}" class="recipe__img">
    <h1 class="recipe__title">
        <span>${receipe.title}</span>
    </h1>
</figure>
<div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${receipe.receipe_timeTaken}</span>
        <span class="recipe__info-text"> minutes</span>
    </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${receipe.receipe_serves}</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
            <button class="btn-tiny btn-decrease">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                </svg>
            </button>
            <button class="btn-tiny btn-increase">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                </svg>
            </button>
        </div>

    </div>
    <button class="recipe__love">
        <svg class="header__likes">
            <use href="img/icons.svg#icon-heart${isLiked ? '': '-outlined'}"></use>
        </svg>
    </button>
</div>



<div class="recipe__ingredients">
    <ul class="recipe__ingredient-list">
        ${receipe.ingredients.map(el => createIngrident(el)).join('')}
    </ul>
    <button class="btn-small recipe__btn recipe__btn_add">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
    </button>
</div>

<div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__by">${receipe.author}</span>. Please check out directions at their website.
    </p>
    <a class="btn-small recipe__btn" href="${receipe.url}" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>

    </a>
</div>

    `
 elementName.receipe.insertAdjacentHTML('afterbegin',renderTemplateReceipe);   
}

export const updateIngredients = (receipe) => {
    //update counts
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach( (el,i) => {
        //for every replyCount in ingredient , keeping the ingredient count value in text content. 
        //can also be the other way around  
        el.textContent = formatCount(receipe.ingredients[i].count);
    })
    //update servings
    document.querySelector('.recipe__info-data--people').innerHTML = `${receipe.receipe_serves}`;
}