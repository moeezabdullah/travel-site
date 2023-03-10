import '../styles/styles.css'
import 'lazysizes'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
// import ClientArea from './modules/ClientArea'

//React
import React from 'react'
import ReactDOM from 'react-dom'

// Import react comps
import MyAmazingComponent from './modules/MyAmazingComponent'

ReactDOM.render(<MyAmazingComponent />, document.querySelector("#my-react-example"))

// import Modal from './modules/Modal'

// import Person from './modules/Person'

// new Modal();

// new ClientArea()
let stickyHeader = new StickyHeader();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
let mobileMenu = new MobileMenu();
let modal

if(module.hot){
    module.hot.accept()
}

document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault()
        if (typeof modal == "undefined") {
            import(/* webpackChunkName: "modal"*/'./modules/Modal').then(x => {
                modal = new x.default()
                setTimeout(() => modal.openTheModal(), 20)
              }).catch(() => console.log("There was a problem"))
        } else {
            modal.openTheModal()
        }
    })
})

//  new
// class Adult extends Person {
//     payTaxes(){
//         console.log(this.name + " now owes zero taxes");
//     }
// }

// let john = new Person("John Doe", "purple");
// john.greet();
// let jane = new Adult("Jane Doe", "green");
// jane.greet();
// jane.payTaxes();