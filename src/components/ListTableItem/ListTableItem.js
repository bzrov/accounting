import React,{useEffect,useRef,useState} from 'react';
import './ListTableItem.css';
import {connect} from 'react-redux'

import {changeFavouriteListItem} from '../../redux/actions'

const ListTableItem = ({list,listFilterField,listView,listItemId,listItemFavourite,listItemAge,listItemName,listItemPhone,listItemImg,changeFavouriteListItem,dictionary,dictionaryLanguage}) => {
	const [observerItemAnimation, setObserverItemAnimation] = useState(null)
	const listPreviewItemRef = useRef()

	const ageSufix = (age) => {
		if(dictionaryLanguage === "ru"){
			if((age < 10 || age > 20) && age%10 === 1){
				return "год"
			}else  if((age < 10 || age > 20) && age%10 > 1 && age%10 < 5){
				return "года"
			}
			return "лет"
		}else {
			return dictionary.person_age
		}
	}

	useEffect(()=>{
		const observerItemOptions = {
			rootMargin: "0px 0px -100px 0px"
		}

		const observerItemAnimation = new IntersectionObserver((entries)=>{
			entries.forEach(entry => {
				if(entry.isIntersecting ){
					if(listPreviewItemRef.current){
						listPreviewItemRef.current.classList.add('list-table__item_active')
					}
				}
			})
		},observerItemOptions)

		setObserverItemAnimation(observerItemAnimation)
	},[list,listFilterField,listView])

	useEffect(()=>{
		if(observerItemAnimation){
			observerItemAnimation.observe(listPreviewItemRef.current)
		}
	},[observerItemAnimation])
	
	return (
		<div ref={listPreviewItemRef} className="list-table__item person">
			<div className="list-table__col-lg">
				<div className="person__main-info">
					<div className="person__img-wrapper">
						<img className="person__img" src={require(`../../media/images/${listItemImg}.svg`)} alt=""/>
					</div>
					<p className="person__name">
						{listItemName}
					</p>
				</div>
			</div>
			<div className="list-table__col-sm">
				<p className="person__age">
					{listItemAge + ageSufix(listItemAge)} 
				</p>
			</div>
			<div className="list-table__col-md list-table__col_center">
				<p className="person__phone">
				{listItemPhone}
				</p>
			</div>
			<div className="list-table__col-sm list-table__col_end">
				<div onClick={()=>changeFavouriteListItem(listItemId)}
					className={`person__favourite ${listItemFavourite?"person__favourite_true":"person__favourite_false"}`}>
					<svg className="person__favourite-icon" width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11 0L8.53035 7.60081H0.53838L7.00402 12.2984L4.53436 19.8992L11 15.2016L17.4656 19.8992L14.996 12.2984L21.4616 7.60081H13.4697L11 0Z" fill="#C4C4C4"/>
					</svg>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		dictionary: state.dictionary.dictionary,
		dictionaryLanguage: state.dictionary.dictionaryLanguage,
	}
}

const mapDispatchToProps = {
	changeFavouriteListItem
}

export default connect(mapStateToProps,mapDispatchToProps)(ListTableItem)

