import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import Sidebar from '../Components/Sidebar';
import SignOut from '../Components/SignOut';

function Profile(){
    const { user } = useContext(UserContext);

    return(
        <div>
            <Sidebar />
            <div className="content">
                <div>
                    {user ? (
                        <h1 style={{ fontSize: '50px' }}>Welcome, {user.name}!</h1>
                    ) : (
                        <h1 style={{ fontSize: '50px' }}>Please Log In</h1>
                    )}
                </div>
                <SignOut />
            </div>
        </div>
    )

}

export default Profile;