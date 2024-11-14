import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import Sidebar from '../Components/Sidebar';
import default_pfp from '../Assets/default_pfp.png';
import './Profile.css';
import UploadFIle from '../Components/UploadFile';
import UploadFile from '../Components/UploadFile';

function Profile(){
    const { user } = useContext(UserContext);

    return(
        <div>
            <Sidebar />
            <div className="content">
                <div className="profile-header">
                    <img src={default_pfp}  width={100} height={100}  alt="profile picture" />
                    <div>
                        {user ? (
                            <h1>Welcome, {user.name}!</h1>
                        ) : (
                            <h1>Please log in</h1>
                        )}
                    </div>
                </div>
                profile

                <UploadFile />
            </div>
        </div>
    )

}

export default Profile;