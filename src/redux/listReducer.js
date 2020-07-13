import {CHANGE_FAVOURITE_LIST_ITEM,SORT_LIST,CREATE_INITIAL_STATE} from './types'

const initialState = {
    list: []
}


export const listReducer = (state=initialState, action) => {
    switch(action.type){
        case CREATE_INITIAL_STATE:
            return {
                ...state,
                list: action.payload
            }
        case CHANGE_FAVOURITE_LIST_ITEM:
            return {
                ...state,
                list: state.list.map(list_item=>{
                    if (list_item.id === action.payload){
                        list_item.favourite = !list_item.favourite;
                    }
                    return list_item
                })
            }
        case SORT_LIST:
            const listSort = (list,listSortField,listSortDirection) => {
                const sortedList = list.slice();
                if(listSortDirection === "asc"){
                    sortedList.sort((item1, item2)=>{
                        if (item1[listSortField] < item2[listSortField]){
                            return -1;
                        }
                        if ( item1[listSortField] > item2[listSortField]){
                            return 1;
                        }
                        return 0;
                    })
                }else if(listSortDirection === "desc"){
                    sortedList.sort((item1, item2)=>{
                        if (item1[listSortField] < item2[listSortField]){
                            return 1;
                        }
                        if ( item1[listSortField] > item2[listSortField]){
                            return -1;
                        }
                        return 0;
                    })
                }
                return sortedList;
            }
            const sortedList = listSort(state.list,action.payload.listSortField,action.payload.listSortDirection)
            return {
                ...state,
                list: sortedList
            }
        default: return state
    }
   
}