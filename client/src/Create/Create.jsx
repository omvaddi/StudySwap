import React, {useState} from 'react';
import Sidebar from '../Components/Sidebar';

function Classes(){
    const [name, setName] = useState(""); // State to store the class name
    const [code, setCode] = useState(""); // State to store the class code
    
    const handleSubmit = () => {
        console.log(name, code);
        
        // Send a POST request to create a new class
        fetch('http://localhost:3001/api/group', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, code, dateCreated: new Date() }),
        })
        .then(response => response.json())
        .then(() => { 
            // Clear class input
            setName("");
            setCode("");
        })
    };

    return (
        <div>
            <Sidebar />
            <div className="content">
                <div className="container">
                    <div className="header">
                        <div className="text">Create Class</div>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <input 
                                type="text" 
                                placeholder="Class Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    paddingLeft: '15px',
                                    marginLeft: '15px'
                                }}
                            />
                        </div>
                        <div className="input">
                            <input 
                                type="text" 
                                placeholder="Class Code" 
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={{
                                    paddingLeft: '15px',
                                    marginLeft: '15px'
                                }}
                            />
                        </div>
                        <div className="submit-container">
                            {/* Button to submit the form */}
                            <div className={"submit"} onClick={(handleSubmit)}>
                                Create Class
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Classes;