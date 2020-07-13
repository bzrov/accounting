import React,{useEffect} from 'react';
import {connect} from 'react-redux'

import './ListSortControl.css';
import {sortList} from '../../redux/actions'

const ListSortControl = ({sortList,dictionary,listSortField,listSortDirection,setListSortField,setListSortDirection}) => {
    useEffect(() => {
        const sortParameters ={
            listSortField,
            listSortDirection,
        }
		sortList(sortParameters)
    }, [listSortField,listSortDirection,sortList])
    
	return(
		<div className="controls__list-sort-control list-sort-control">
            <p className="list-sort-control__title">
                {dictionary.sort_title}
            </p>
           <div className="list-sort-control__sort-fields sort-fields">
                <div onClick= {() => setListSortField("id")}  className={`sort-fields__field ${listSortField === "id" && "sort-fields__field_active"}`}>
                    <p className="sort-fields__field-text">
                        ID
                    </p>
                </div>
                <div onClick= {() => setListSortField("name")} className={`sort-fields__field ${listSortField === "name" && "sort-fields__field_active"}`}>
                    <p className="sort-fields__field-text">
                        {dictionary.sort_field_name}
                    </p>
                </div>
                <div onClick= {() => setListSortField("age")} className={`sort-fields__field ${listSortField === "age" && "sort-fields__field_active"}`}>
                    <p className="sort-fields__field-text">
                        {dictionary.sort_field_age}
                    </p>
                </div>
           </div>
           <div className="list-sort-control__sort-direction sort-direction">
                <div onClick= {() => listSortDirection==="asc" ? setListSortDirection("desc"): setListSortDirection("asc") } 
                    className="sort-direction__btn">
                    <svg className={`sort-direction__icon ${listSortDirection === "asc" && "sort-direction__icon_reverse"}`} width="30" height="12" viewBox="0 0 30 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M0 2H30V0H0V2ZM0 12H20V10H0V12Z" fill="black"/>
                    </svg>
                </div>
           </div>
        </div>
	)
}

const mapStateToProps = state => {
	return {
		dictionary: state.dictionary.dictionary
	}
}

const mapDispatchToProps = {
	sortList
}

export default connect(mapStateToProps,mapDispatchToProps)(ListSortControl)





