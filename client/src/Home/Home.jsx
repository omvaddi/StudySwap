import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

import Sidebar from '../Components/Sidebar';
import CourseBlock from '../Components/CourseBlock'


function Home() {
    const [courses, setCourses] = useState([])
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

    const userCourses = user ? courses.filter(course => user.classes.includes(course.code)) : [];

    return (
        <div className="App">
            <Sidebar />
            <div className="content">
                <h1>My Classes</h1>

                <div className="course-container">
                    {userCourses.map((course) => (
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

