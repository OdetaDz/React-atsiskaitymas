import { createContext, useEffect, useReducer, useState } from "react";

const UsersContext = createContext();
const UsersActionTypes = {
  get_all: 'get all users from data',
  add: 'add one new user',
  delete: 'delete one specific user',
  edit: 'edit one specific user',
};

const reducer = (state, action) => {
  switch(action.type){
    case UsersActionTypes.get_all:
      return action.data;
    case UsersActionTypes.add:
      fetch(`http://localhost:8081/users`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    case UsersActionTypes.delete:
      fetch(`http://localhost:8081/users/${action.id}`,{
        method: "DELETE"
      });
      return state.filter(el => el.id.toString() !== action.id.toString());
    case UsersActionTypes.edit:
      return state.map(el => {
        if(el.id.toString() === action.id.toString()){
          fetch(`http://localhost:8081/users/${action.id}`, {
            method: "PUT",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({ registerDate:el.registerDate, ...action.data})
          });
          return { id:action.id, registerDate:el.registerDate, ...action.data };
        } else {
          return el;
        }
      });
    default:
      console.log("Error: action type not found", action.type);
      return state;
  }
}

const UsersProvider = ({ children }) => {

  const [users, setUsers] = useReducer(reducer, []);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8081/users`)
      .then(res => res.json())
      .then(data => setUsers({
        type: UsersActionTypes.get_all,
        data: data
      }));
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        UsersActionTypes,
        loggedInUser,
        setLoggedInUser
      }}
    >
      { children }
    </UsersContext.Provider>
  );
}

export { UsersProvider };
export default UsersContext;