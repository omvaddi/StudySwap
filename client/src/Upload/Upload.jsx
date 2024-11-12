import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

import Sidebar from '../Components/Sidebar';
import CourseBlock from '../Components/CourseBlock'

const Upload = () => {
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

    const newCourses = user ? courses.filter(course => !user.classes.includes(course.code)) : [];

    return (
        <div>
            <Sidebar />
            <div className="content">
                <h2>Find New Classes</h2>
                <div className="course-container">
                    {newCourses.map((course) => (
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
};

export default Upload;