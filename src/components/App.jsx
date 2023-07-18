import { nanoid } from 'nanoid'
import ContactForm from "./ContactForm/ContactForm"
import ContactList from "./ContactList/ContactList"
import Filter from "./Filter/Filter"
import Section from "./Section/Section"
import { useEffect, useState } from 'react'

export default function App () {

const [contacts, setContacts] = useState(() => {return JSON.parse(window.localStorage.getItem('contacts')) ?? [];});
const [filter, setFilter] = useState('');


useEffect(() => {
   window.localStorage.setItem('contacts', JSON.stringify(contacts))}
, [contacts])


const addContact = (contactData) => {
  const existContact = contacts.find(contact => 
  contact.name === contactData.name)
  
    if (existContact) {
   alert(`${contactData.name} is already in contacts.`) }
  
   else {
  const contact = {id: nanoid(), ...contactData};
  setContacts(prevState => [contact, ...prevState])
    }
  }

const deleteContact = id => {
  setContacts(prevState => {
    return prevState.filter(contact => contact.id !== id)
    });
};

const filterContact = filterName => {
  setFilter(filterName);
}

const filteredContacts = contacts.filter(contact => 
  contact.name
.toLowerCase()
.includes(filter
 .toLowerCase().trim()));


  return (
<div>
  <Section title ="Phonebook">
    <ContactForm onFormSubmit={addContact}/>
    </Section>

    <Section>
    <h2>Contacts</h2>
    <Filter
    title="Find contacts by name"
    filter={filter} 
    filterContact={filterContact}
    />
    </Section>

    <ContactList 
    contacts={filteredContacts}
    deleteContact={deleteContact}
     />
     </div>
  )
};
