import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

import Sidebar from '../Components/Sidebar';
import CourseBlock from '../Components/CourseBlock'


function Home() {
    const [courses, setCourses] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchCourses = async () => {
            try{
                const response = await axios.get('http://localhost:3001/api/groups');
                console.log(response.data);
                setCourses(response.data);
            }
            catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = user
        ? courses.filter(
            (course) =>
                user.classes.includes(course.code) &&
                (course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.code.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : [];

    return (
        <div className="App">
            <Sidebar />
            <div className="content">
                <h1 style={{ fontSize: '50px' }}>My Classes</h1>

                <input 
                    type="text"
                    placeholder="Search for a class..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '10px',
                        width: '200px',
                        marginLeft: '10px',
                        marginBottom: '20px',
                        borderRadius: '10px',
                        border: '1px solid #ccc'
                    }}
                    />

                <div className="course-container">
                    {filteredCourses.map((course) => (
                        <CourseBlock
                            key={course.code}
                            courseId={course.code}
                            courseName={course.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}


export default Home;

