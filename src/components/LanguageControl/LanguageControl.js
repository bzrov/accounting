import React from 'react';
import './LanguageControl.css';
import {connect} from 'react-redux'
import {changeLanguage} from '../../redux/actions'

const LanguageControl =({dictionaryLanguage,changeLanguage}) => {
	return(
		<div className="controls__language-control language-control">
            <p> 
                <span 
                    onClick={()=>changeLanguage("ru")}
                    className={`language-control__item ${dictionaryLanguage==="ru" && 'language-control__item_active'}`}>
                    Ru </span>
                /
                <span 
                    onClick={()=>changeLanguage("en")} 
                    className={`language-control__item ${dictionaryLanguage==="en" && 'language-control__item_active'}`}> En </span>
            </p>
        </div>
	)
}
const mapStateToProps = state => {
	return {
        dictionaryLanguage: state.dictionary.dictionaryLanguage
	}
}

const mapDispatchToProps = {
	changeLanguage
}

export default connect(mapStateToProps,mapDispatchToProps)(LanguageControl)




