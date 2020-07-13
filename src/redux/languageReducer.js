import {CHANGE_LANGUAGE} from './types'
import {dictionaryEng} from '../translation/dictionaryEng'
import {dictionaryRu} from '../translation/dictionaryRu'

const initialState = {
    dictionaryLanguage: "en",
    dictionary: {
        filter_placeholder: "Search...",
        sort_title: "Sorting",
        sort_field_name: "Name",
        sort_field_age: "Age",
        person_age: "age"
    }
}


export const languageReducer = (state=initialState, action) => {
    switch(action.type){
        case CHANGE_LANGUAGE:
            if(action.payload === "en"){
                return {
                    ...state,
                    dictionaryLanguage: action.payload,
                    dictionary: dictionaryEng
                }
            }else if(action.payload === "ru"){
                return {
                    ...state,
                    dictionaryLanguage: action.payload,
                    dictionary: dictionaryRu
                }
            }
            break;
        default: return state
    }
   
}