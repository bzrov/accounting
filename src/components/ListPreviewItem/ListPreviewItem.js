import React,{useEffect,useRef,useState} from 'react';
import {connect} from 'react-redux'

import './ListPreviewItem.css';
import {changeFavouriteListItem} from '../../redux/actions'

const ListPreviewItem = ({list,listFilterField,listView,isVideoPlayByUser,setIsVideoPlayByUser,listItemId,listItemFavourite,listItemAge,listItemName,listItemPhone,listItemPhrase,listItemImg,listItemVideo,changeFavouriteListItem,dictionary,dictionaryLanguage})=>{
	const [observerItemVideo, setObserverItemVideo] = useState(null)
	const [observerItemAnimation, setObserverItemAnimation] = useState(null)
	const listPreviewItemRef = useRef()
	const listPreviewItemVideoRef = useRef()
	
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
						listPreviewItemRef.current.classList.add('list-preview__item_active')
					}
				}
			})
		},observerItemOptions)

		setObserverItemAnimation(observerItemAnimation)

		if(listItemVideo && !isVideoPlayByUser && !observerItemVideo){
			const observerItemVideoOptions = {
				rootMargin: "-50% 0px -50% 0px"
			}
			const observerItemVideoTemp = new IntersectionObserver((entries)=>{
				entries.forEach(entry => {
					if(!isVideoPlayByUser){
						if(entry.isIntersecting){
							listPreviewItemVideoRef.current && listPreviewItemVideoRef.current.play()
						}else{
							listPreviewItemVideoRef.current && listPreviewItemVideoRef.current.pause()
						}
					}
				})
			},observerItemVideoOptions)
			setObserverItemVideo(observerItemVideoTemp)
		}
	},[list,listFilterField,listView,isVideoPlayByUser,listItemVideo,observerItemVideo])

	useEffect(()=>{
		if(observerItemVideo){
			observerItemVideo.observe(listPreviewItemRef.current)
		}
	},[observerItemVideo])

	useEffect(()=>{
		if(observerItemAnimation){
			
			observerItemAnimation.observe(listPreviewItemRef.current)
		}
	},[observerItemAnimation])

	
	useEffect(()=>{
		if(observerItemVideo && isVideoPlayByUser){
			observerItemVideo.disconnect()
		}
	},[isVideoPlayByUser,observerItemVideo])

  return (
	<>
	  {
		listItemVideo
		? 
		<div ref={listPreviewItemRef} className="list-preview__item list-preview__item_video person" >
			<div className="list-preview__item-col list-preview__item_pd">
				<div className="list-preview__item-header">
					<div className="person__main-info">
						<div className="person__img-wrapper">
							<img className="person__img" src={require(`../../media/images/${listItemImg}.svg`)} alt=""/>
						</div>
						<p className="person__name">
							{listItemName}
						</p>
					</div>
					<div onClick={()=>changeFavouriteListItem(listItemId)}
						className={`person__favourite ${listItemFavourite?"person__favourite_true":"person__favourite_false"}`}>
						<svg className="person__favourite-icon" width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M11 0L8.53035 7.60081H0.53838L7.00402 12.2984L4.53436 19.8992L11 15.2016L17.4656 19.8992L14.996 12.2984L21.4616 7.60081H13.4697L11 0Z" fill="#C4C4C4"/>
						</svg>
					</div>
				</div>
				<div className="list-preview__item-content">
					<div className="list-preview__secondary-info">
						<p className="person__age">
							{listItemAge + " " + ageSufix(listItemAge)} 
						</p>
						<p className="person__phone">
							{listItemPhone}
						</p>
					</div>
					<p className="person__phrase">
						{listItemPhrase}
					</p>
				</div>	
			</div>
			<div  className="list-preview__item-col">
            <video 
                ref={listPreviewItemVideoRef} 
                muted="muted"
				className="person__video" 
				controls 
				onClick = {()=>setIsVideoPlayByUser(true)}
            >
                <source src={require(`../../media/videos/${listItemVideo}.mp4`)} type="video/mp4" /> 
            </video>
        </div>
		</div>
		:
		<div ref={listPreviewItemRef}  className="list-preview__item list-preview__item_pd person">
			<div className="list-preview__item-header">
				<div className="person__main-info">
					<div className="person__img-wrapper">
						<img className="person__img" src={require(`../../media/images/${listItemImg}.svg`)} alt=""/>
					</div>
					<p className="person__name">
						{listItemName}
					</p>
				</div>
				<div onClick={()=>changeFavouriteListItem(listItemId)}
				 	className={`person__favourite ${listItemFavourite?"person__favourite_true":"person__favourite_false"}`}>
					<svg className="person__favourite-icon" width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11 0L8.53035 7.60081H0.53838L7.00402 12.2984L4.53436 19.8992L11 15.2016L17.4656 19.8992L14.996 12.2984L21.4616 7.60081H13.4697L11 0Z" fill="#C4C4C4"/>
					</svg>
				</div>
			</div>
			<div className="list-preview__item-content">
				<div className="list-preview__secondary-info">
					<p className="person__age">
						{listItemAge + " " + ageSufix(listItemAge)} 
					</p>
					<p className="person__phone">
						{listItemPhone}
					</p>
				</div>
				<p className="person__phrase">
					{listItemPhrase}
				</p>
			</div>	
		</div>
	  }
	</>
	
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

export default connect(mapStateToProps,mapDispatchToProps)(ListPreviewItem)

