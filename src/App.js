import React,{useState,useEffect} from 'react';
import './App.css';
import {connect} from 'react-redux'
import {createInitialState} from './redux/actions'
import List from './components/List/List'
import {Controls} from './components/Controls/Controls.js' 


function App({createInitialState}) {
	const [listView, setListView] = useState(getParamFromStr(window.location.pathname,"view","&") || "preview")
	const [listFilterField, setListFilterField] = useState(getParamFromStr(window.location.pathname,"filter_field",null) || "")
	const [listSortField, setListSortField] = useState(getParamFromStr(window.location.pathname,"sort_field","&") || "id")
	const [listSortDirection, setListSortDirection] = useState(getParamFromStr(window.location.pathname,"sort_direction","&") || "asc")

	const dataUrl = 'https://api.jsonbin.io/b/5efbce60bb5fbb1d2561d9cb'

	const createUrl = (listView,listSortField,listSortDirection,listFilterField) =>{
		return `/view=${listView}&sort_field=${listSortField}&sort_direction=${listSortDirection}&filter_field=${listFilterField.trim() || "#"}`
	}

	function getParamFromStr (str,paramName,symbol) {
		if (str.indexOf(paramName) > -1){
			const strTemp = str.slice(str.indexOf(paramName) + paramName.length +1)
			return symbol ? strTemp.slice(0,strTemp.indexOf(symbol)) : strTemp
		}
		return null;
		
	}

	const getData = async (url) => {
		const response = await fetch(url,{
			headers: {
				'Content-Type': 'application/json',
				"secret-key":  "$2b$10$2MlwbuO3sQGTrIZL/yY8h.dSmvG9p.AxD0.XsgTYBE21WCY1zMRAm"
			}
		})
		const data = response.json()
		return data;
	}
	
	
	useEffect(() => {
		window.history.pushState(null, null, createUrl(listView,listSortField,listSortDirection,listFilterField))
	}, [listView,listFilterField,listSortField,listSortDirection])
	
	useEffect(() => {
		if(!(localStorage.getItem('accounting') && JSON.parse(localStorage.getItem('accounting')).list.length)){
			getData(dataUrl).then(data=> createInitialState(data))
		}
	}, [createInitialState])

	return (
		<div className="app default-theme">
			<Controls 
				listView={listView}
				listFilterField={listFilterField}
				listSortField = {listSortField}
				listSortDirection = {listSortDirection}
				onChangeListFilterField={(listFilterField)=>setListFilterField(listFilterField)} 
				onChangeListView={(view)=>setListView(view)}
				setListSortField = {(listSortField)=> setListSortField(listSortField)}
				setListSortDirection = {(listSortDirection)=> setListSortDirection(listSortDirection)}
				 />
			<List  
				listView={listView} 
				listFilterField={listFilterField}
				listSortField = {listSortField}
				listSortDirection = {listSortDirection}
			/>
			
		</div>
	);
}

const mapStateToProps = state => {
	return {
		list: state.list.list
	}
}
const mapDispatchToProps = {
	createInitialState
}

export default connect(mapStateToProps,mapDispatchToProps)(App)

