import React,{useEffect,useRef,useState} from 'react';
import {connect} from 'react-redux'
import './List.css';
import ListTableItem from '../ListTableItem/ListTableItem'
import ListPreviewItem from '../ListPreviewItem/ListPreviewItem'


const List = ({list,listView,listSortField,listSortDirection,listFilterField}) => {
	const listRef = useRef()
	const [isVideoPlayByUser, setIsVideoPlayByUser] = useState(false)
	
	useEffect(() => {
		if(listRef.current){
			listRef.current.scrollTo({top: 0,behavior: "smooth"})
		}	
	}, [listSortField,listSortDirection,listFilterField,listView])

	return(
		<div ref={listRef} className={`list list-${listView}`}>
		{
			listSortField && list && list.filter((listItem=>{
				return (listItem.name.toLowerCase().indexOf(listFilterField.toLowerCase()) > -1) || (listItem.name.split(" ").reverse().join(" ").toLowerCase().indexOf(listFilterField.toLowerCase())>-1)
			})).map((listItem) => {
					if(listView === "table"){
						return (
							<ListTableItem 
								key={listItem.id} 
								list={list}
								listView={listView}
								listFilterField={listFilterField}
								listItemId={listItem.id}
								listItemFavourite= {listItem.favourite}
								listItemAge = {listItem.age}
								listItemName = {listItem.name}
								listItemPhone = {listItem.phone}
								listItemImg = {listItem.image}
							/>
						);
					}else if(listView === "preview"){
						return (
							<ListPreviewItem
								key={listItem.id}
								list={list}
								listView={listView}
								listFilterField={listFilterField}
								listItemId={listItem.id}
								listItemFavourite= {listItem.favourite}
								listItemAge = {listItem.age}
								listItemName = {listItem.name}
								listItemPhone = {listItem.phone}
								listItemPhrase = {listItem.phrase}
								listItemImg = {listItem.image}
								listItemVideo = {listItem.video}
								isVideoPlayByUser = {isVideoPlayByUser}
								setIsVideoPlayByUser = {(isVideoPlayByUser)=>setIsVideoPlayByUser(isVideoPlayByUser)}
							/>
						);
					}
			})
		}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		list: state.list.list,
	}
}

export default connect(mapStateToProps,null)(List)


