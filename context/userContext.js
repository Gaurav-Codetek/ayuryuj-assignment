import { createContext, useState } from 'react';

const UserContext = createContext({
  user: {
    name: "John Deol",
    email: "johndoe@gmail.com",
    age: null,
    dob: "27/09/2004",
  },
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    age: null,
    dob: "27/09/2004",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
