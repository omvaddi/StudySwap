import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import CourseBlock from '../Components/CourseBlock'
import axios from 'axios';

function Home() {
    const [courses, setCourses] = useState([])

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

    return (
        <div className="App">
            <Sidebar />
            <div className="content">
                <h1>Welcome to the Main Content Area</h1>
                <p>This is the main content of the page.</p>

                <div className="course-container">
                    {courses.map((course) => (
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

