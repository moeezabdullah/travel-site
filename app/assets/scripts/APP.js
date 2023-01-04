import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
import Modal from './modules/Modal'

// import Person from './modules/Person'

new Modal();
let stickyHeader = new StickyHeader();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);


let mobileMenu = new MobileMenu();

if(module.hot){
    module.hot.accept()
}



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