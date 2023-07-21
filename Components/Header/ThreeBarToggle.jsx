import React from 'react';
import {FaBars} from "@react-icons/all-files/fa/FaBars";

const ThreeBarToggle = ({setToggle}) => {
    return (
        <div className="toggle-nav"
             onClick={() => setToggle(true)}>
            <FaBars size={20}/>
        </div>
    );
};

export default ThreeBarToggle;
