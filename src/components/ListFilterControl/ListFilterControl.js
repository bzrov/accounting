import React from 'react';
import './ListFilterControl.css';
import {connect} from 'react-redux'

const ListFilterControl =({onChangeListFilterField,listFilterField,dictionary}) => {
	return(
		<div className="controls__list-filter list-filter">
			<input 
				onChange={(event)=> onChangeListFilterField(event.currentTarget.value)}
				value={listFilterField} 
				placeholder={dictionary.filter_placeholder} 
				type="text" 
				className="list-filter__input"/>
        </div>
	)
}
const mapStateToProps = state => {
	return {
		dictionary: state.dictionary.dictionary
	}
}

export default connect(mapStateToProps,null)(ListFilterControl)


