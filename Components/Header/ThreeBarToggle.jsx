import React from 'react';
import { useDispatch } from 'react-redux';

const ThreeBarToggle = ({setToggle, customClass }) => {
    // const dispatch = useDispatch();
    const handleClick = () => {
        // dispatch({ type: 'TOPMENUTOGGLE',payload:true });
        // dispatch({ type: 'OVERLAY',payload:true  });
    };
    return (
        <div className={`toggle-nav ${customClass ? customClass : ''}`}
             onClick={() => setToggle(true)}
        >
            <i className='fa fa-bars sidebar-bar'></i>
        </div>
    );
};

export default ThreeBarToggle;
