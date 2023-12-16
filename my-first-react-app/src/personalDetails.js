
// FACTORY FUNCTION: TODO OBJECT
// Store list items in objects
const personalDetails = (name, email, phone, address) => {
    let nam = name;
    let emai = email;
    let pho = phone;
    let add = address;

    // console.log("Called toDo Object");

    
    return {nam, emai, pho, add};
  };
  

  export { personalDetails };