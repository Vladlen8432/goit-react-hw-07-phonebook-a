import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { fetchContacts, addContact, deleteContact } from './Redux/ContactSlice';
import { persistor } from './Redux/Store';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchInput from './FilterByName/FilterByName';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const handleFilterChange = event => {
  //   dispatch(updateFilter(event.target.value));
  // };

  const getFilteredChange = async () => {
    try {
      const response = await fetch(
        `https://656657da64fcff8d730eb5c2.mockapi.io/api/vshark/contacts?filter=${filter}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching filtered contacts:', error);
    }
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const isContactNameExist = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleAddContact = (name, number) => {
    if (isContactNameExist(name)) {
      alert(`${name} is already in contacts`);
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      dispatch(addContact(newContact));
    }
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <PersistGate loading={null} persistor={persistor}>
      <div className="container">
        <h1 className="phonebookHeager">Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} />
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <SearchInput value={filter} onChange={getFilteredChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </PersistGate>
  );
};

export default App;
