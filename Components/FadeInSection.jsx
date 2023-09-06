import React from 'react';

function FadeInSection(props) {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef();
    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
    }, []);
    return (
        <div
            className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}


export default FadeInSection;

// import React, { useEffect, useState, useRef } from 'react';
//
// function FadeInSection(props) {
//     const [isVisible, setVisible] = useState(false);
//     const [scrollDirection, setScrollDirection] = useState('down');
//     const domRef = useRef();
//     let lastScrollTop = 0;
//
//     useEffect(() => {
//         const observer = new IntersectionObserver(entries => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     setVisible(true);
//                 } else {
//                     setVisible(false);
//                 }
//             });
//         });
//
//         observer.observe(domRef.current);
//
//         const handleScroll = () => {
//             const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
//
//             if (currentScrollTop > lastScrollTop) {
//                 // Scrolling down
//                 setScrollDirection('down');
//             } else {
//                 // Scrolling up
//                 setScrollDirection('up');
//             }
//
//             lastScrollTop = currentScrollTop;
//         };
//
//         window.addEventListener('scroll', handleScroll);
//
//         return () => {
//             observer.unobserve(domRef.current);
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);
//
//     const fadeClass = isVisible ? 'is-visible' : '';
//
//     // Add scroll direction class to control fade direction
//     const scrollDirectionClass = scrollDirection === 'up' ? 'scroll-up' : 'scroll-down';
//
//     return (
//         <div
//             className={`fade-in-section ${fadeClass} ${scrollDirectionClass}`}
//             ref={domRef}
//         >
//             {props.children}
//         </div>
//     );
// }
//
// export default FadeInSection;