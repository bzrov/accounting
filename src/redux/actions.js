import {CHANGE_FAVOURITE_LIST_ITEM,SORT_LIST,CREATE_INITIAL_STATE,CHANGE_LANGUAGE} from './types'

export function createInitialState(initialState){
    return{
        type: CREATE_INITIAL_STATE,
        payload: initialState
    } 
}

export function changeFavouriteListItem(listItemId){
    return{
        type: CHANGE_FAVOURITE_LIST_ITEM,
        payload: listItemId
    } 
}

export function sortList(sortParameters){
    return{
        type: SORT_LIST,
        payload: sortParameters
    } 
}

export function changeLanguage(dictionaryLanguage){
    return{
        type: CHANGE_LANGUAGE,
        payload: dictionaryLanguage
    } 
}

