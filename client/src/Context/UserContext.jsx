import React, { createContext, useState } from 'react';

// Create a context for the user
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to store the user

    return (
        // Provide the user and setUser to the context
        <UserContext.Provider value={{ user, setUser }}>
            {children} {/* Render the children components */}
        </UserContext.Provider>
    );
};