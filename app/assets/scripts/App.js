import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/Sticky-Header';


// create variables that we will use later
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