import { useState } from 'react';

function useUser() {

    function getUser() {
        const user = localStorage.getItem('user');
        return user && user
    }

    const [user, setUser] = useState(getUser());

    function saveUser(user) {
        localStorage.setItem('user', user);
        setUser(user);
    };

    function removeUser() {
        localStorage.removeItem("user");
        setUser(null);
    }

    return {
        setUser: saveUser,
        user,
        removeUser
    }

}

export default useUser;