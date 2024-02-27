import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfo.css'

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [pastSearchTerms, setPastSearchTerms] = useState([]);

  useEffect(() => {
    // Fetch users from the API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setSortedUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {
    // Save past search terms to localStorage
    localStorage.setItem('pastSearchTerms', JSON.stringify(pastSearchTerms));
  }, [pastSearchTerms,filteredUsers]);
  function setItems(data) {
    setFilteredUsers(data)
  }
  console.log(filteredUsers)
  
  
  const handleSearch = (e) => {
    
    const searchTermLowerCase = searchTerm.trim().toLowerCase(); 
    if (searchTermLowerCase !== '') { 
      const filtered = users?.filter(user => user.name.toLowerCase().includes(searchTermLowerCase));
      if (filtered) {
        setItems(filtered);
      }
     
      setPastSearchTerms(prevTerms => [...prevTerms, searchTermLowerCase]);
    } else {
      
      setFilteredUsers(users);
    }

}

  const handleSortByName = () => {
    const sorted = [...sortedUsers].sort((a, b) => a.name.localeCompare(b.name));
    setSortedUsers(sorted);
  };

  return (
    <div id='container'>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleSortByName}>Sort by Name</button>
      </div>

      <div>
        <h2>User List</h2>
        <ul>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((item) => (
              <React.Fragment key={item.id}>
                <li>{item.name}</li>
              </React.Fragment>
            ))
          ) : (
            sortedUsers.map(user => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))
          )}
        </ul>

      </div>

      <div>
        <h2>Past Search Terms</h2>
        <ul>
          {pastSearchTerms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;