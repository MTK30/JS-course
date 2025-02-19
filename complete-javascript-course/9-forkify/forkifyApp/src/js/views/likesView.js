import {elementName} from './base';
import {limitTItleOfRecipe} from './viewSearch';

export const toogleLike = isLiked => {
    //img/icons.svg#icon-heart-outlined
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`);
}


export const toggelLikeMenu = numberOfLikes => {
    elementName.likesMenu.style.visibility = numberOfLikes > 0 ? 'visible':'hidden';
}

export const LikeListView = like => {
    const markUp = `
            <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitTItleOfRecipe(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
            </li>
    `;
    elementName.likeList.insertAdjacentHTML('beforeend',markUp);

}

export const deletLikeElement = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (el) {
        el.parentElement.removeChild(el);
    }
}
