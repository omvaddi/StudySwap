import React, {useState} from 'react'
import Sidebar from '../Components/Sidebar';

function Classes(){
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    
    const handleSubmit = () => {
        console.log(name, code);
        
        fetch('http://localhost:3001/api/group', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, code, dateCreated: new Date() }),
        })
        .then(response => response.json())
        .then(() => {
            setName("");
            setCode("");
        })
    };

    return(
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
                            />
                        </div>
                        <div className="input">
                            <input 
                                type="text" 
                                placeholder="Class Code" 
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <div className="submit-container">
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