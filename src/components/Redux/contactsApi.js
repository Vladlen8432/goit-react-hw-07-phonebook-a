import { createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await fetch(
    'https://656657da64fcff8d730eb5c2.mockapi.io/api/vshark/contacts'
  );
  const data = await response.json();
  return data;
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contacts => {
    const response = await fetch(
      'https://656657da64fcff8d730eb5c2.mockapi.io/api/vshark/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contacts),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    const response = await fetch(
      `https://656657da64fcff8d730eb5c2.mockapi.io/api/vshark/contacts/${contactId}`,
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();
    return { contactId, data };
  }
);
