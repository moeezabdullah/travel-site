import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
// import Person from './modules/Person'

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