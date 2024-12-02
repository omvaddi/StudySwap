import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import Sidebar from '../Components/Sidebar';
import './Profile.css';
import UploadFile from '../Components/UploadFile';
import SignOut from '../Components/SignOut';

function Profile(){
    const { user } = useContext(UserContext);

    return(
        <div>
            <Sidebar />
            <div className="content">
                <div className="profile-header">
                    <div>
                        {user ? (
                            <h1>Welcome, {user.name}!</h1>
                        ) : (
                            <h1>Please log in</h1>
                        )}
                    </div>
                </div>
                <SignOut />
            </div>
        </div>
    )

}

export default Profile;