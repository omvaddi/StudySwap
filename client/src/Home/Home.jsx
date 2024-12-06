import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../Components/Sidebar';
import CourseBlock from '../Components/CourseBlock';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

function Home() {
    const [courses, setCourses] = useState([]); // State to store the list of courses
    const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
    const { user } = useContext(UserContext); // Get user from UserContext

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/groups'); // Fetch courses from the backend
                console.log(response.data);
                setCourses(response.data); // Update the courses state with the fetched data
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses(); // Fetch courses when the component mounts
    }, []);

    // Filter courses based on the search query and user's enrolled classes
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
                {/* Render the filtered courses */}
                {filteredCourses.map((course) => (
                    <CourseBlock key={course.code} courseName={course.name} courseId={course.code} />
                ))}
            </div>
        </div>
    );
}

export default Home;
