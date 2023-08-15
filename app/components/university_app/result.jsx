import React, { useState } from "react";


import { useDispatch, useSelector } from "react-redux";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

function ResultComponent() {

    const dispatch = useDispatch();
    const universityListDefault = useSelector(state => state.ReducerUniversityList.uniStoreData);
    const selectedCountryFromList = useSelector(state => state.ReducerUniversityList.selectCountry);
    const updatedAlphaCode = useSelector(state => state.ReducerUniversityList.alphaCodeTwo);

    //Request for a list of universities
    //University list website: https://github.com/Hipo/university-domains-list 

    const universityData = async function () {

        if (updatedAlphaCode) {
            let universityName = 'http://universities.hipolabs.com/search?country=' + selectedCountryFromList;
            const universityRequest = await fetch(universityName);

            if (universityRequest.ok === true) {
                const universityList = await universityRequest.json();
                dispatch({ type: "ADD_UNI", uniList: universityList });
            } else {
                console.log("Список университетов не загрузился.");
            }
        }
    };

    universityListDefault === null ? universityData() : false;

    //Render university list function

    const renderUniversityFunction = function () {

        if (universityListDefault !== null && universityListDefault.length === 0) return (<p className="notFoundUni"> Universities not found in database. Try another country. </p>)
        else if (universityListDefault !== null) {
            const uni = universityListDefault.map((item, index) =>
                <ul key={index}>
                    <li key={item.name}>{item.name}</li>
                    <li key={item.alpha_two_code}><a target="_blank" href={"http://www." + item.domains[0]}>{item.domains[0]}</a></li>
                </ul>
            );
            return uni;
        }
    };

    //University length Func

    function uniLength() {
        if (universityListDefault !== null && universityListDefault.length > 0) {
            return "Total number of universities: " + universityListDefault.length;
        } else return false;
    }


    return (
        <div>
            {universityListDefault !== null ? <div className="resultContainer">
                <h3>{uniLength()}</h3>
                <ul className='allUniversitiesBox'>{renderUniversityFunction()}</ul>
            </div> : false}
        </div>
    );
};

export { ResultComponent };