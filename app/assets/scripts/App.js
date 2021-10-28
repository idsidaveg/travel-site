// lazyloading - npm install lazysizes
// site is depended on this so no --save-dev was added Video-58
// html is updated for images so they are only loaded when needed
// implement by adding lazyload to the class of an element class="lazyload" update the sourceset
// attribute: srcset to data-srceset
// note: lodash was also installed previously for some functionality in
// javascript files

import '../styles/styles.css';
import 'lazysizes';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/Sticky-Header';
import ClientArea from './modules/ClientArea';

// react related code goes here
import React from 'react';
import ReactDOM from 'react-dom';

// import react components  that we create
import MyAmazingComponent from './modules/MyAmazingComponent';

// syntax of next command is the component name and where it should be rendered, called by id ('#')
ReactDOM.render(<MyAmazingComponent />, document.querySelector("#my-react-example"));


// create variables that we will use later, other modules will use
// look at event-emitter on npm - broadcast events used to other modules
// this is how the webcontrols work on sharepoint
new ClientArea();
new StickyHeader();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
new MobileMenu();
let modal; // creates variable that will have scope for app

// code splitting example - only load the code when we need it
document.querySelectorAll('.open-modal').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        // this effectively creates a promise
        if (typeof modal == "undefined"){
            // on demand load the object
            import(/* webpackChunkName: "modal" */'./modules/Modal').then(x => {
                modal = new x.default();
                setTimeout(() => modal.openTheModal(), 20 );
            }).catch(() => console.log("There was a problem loading modal."));
        } else {
            modal.openTheModal();
        }

    });

});

if (module.hot) {
    module.hot.accept();
}