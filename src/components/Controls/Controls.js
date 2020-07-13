import React from 'react';
import './Controls.css';

import {ListViewControl} from '../ListViewControl/ListViewControl'
import ListSortControl from '../ListSortControl/ListSortControl'
import ListFilterControl from '../ListFilterControl/ListFilterControl'
import LanguageControl from '../LanguageControl/LanguageControl'

export function Controls({onChangeListView,onChangeListFilterField,listView,listSortField,listSortDirection,setListSortField,setListSortDirection,listFilterField}) {
	return(
		<div className="controls">
			<ListFilterControl 
				onChangeListFilterField={(listFilterField)=>onChangeListFilterField(listFilterField)} 
				listFilterField={listFilterField}
			/>
			<div className="controls__list-settings">
				<div className="controls__list-settings-col">
					<ListSortControl
						listSortField={listSortField}
						listSortDirection={listSortDirection}
						setListSortField = {(listSortField)=> setListSortField(listSortField)}
						setListSortDirection = {(listSortDirection)=> setListSortDirection(listSortDirection)}
					/>
				</div>
				<div className="controls__list-settings-col">
					<LanguageControl />
					<ListViewControl 
						listView = {listView}
						onChangeListView={(view)=> onChangeListView(view)}
					/>
				</div>
				
			</div>
        </div>
	)
}


