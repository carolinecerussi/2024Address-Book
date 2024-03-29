// Business Logic for AddressBook ---------
function AddressBook () {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId ();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  if(this.contacts[id] == undefined ) {
    return false;
  } delete this.contacts[id];
  return true;
};


// Business Logic for Contacts ---------
function Contact (firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function () {
  return this.firstName + ' ' + this.lastName;
};


//ui logic 
let addressBook = new AddressBook();


function listContacts (addressBookToDisplay) {
  let contactsDiv = document.querySelector ('div#contacts');
  contactsDiv.innerText = null;
  const ul = document.createElement ('ul');
  Object.keys (addressBookToDisplay.contacts).forEach (function (key) {
    const contact = addressBookToDisplay.findContact (key);
    const li = document.createElement ('li');
    li.append (contact.fullName ());
    li.setAttribute ('id', contact.id);
    ul.append (li);
  });
  contactsDiv.append (ul);
}







function handleForm(event){
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector ('input#new-last-name').value;
  const inputtedPhoneNumber = document.querySelector ('input#new-phone-number').value;
let newContact = new Contact(inputtedFirstName,inputtedLastName,inputtedPhoneNumber);
addressBook.addContact(newContact);
console.log(addressBook.contacts);
listContacts(addressBook);
}

window.addEventListener ('load', function () {
  document
    .querySelector ('form#new-contact-form').addEventListener ('submit', handleForm);
});
