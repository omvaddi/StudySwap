import React from 'react';
import Sidebar from '../Components/Sidebar';
import CourseBlock from '../Components/CourseBlock'

function Home() {
    const courses = [
        { id: 'CEN3031', name: 'Software Engineering' },
        { id: 'PHY2049', name: 'Physics 2' }
    ];
    return (
        <div className="App">
            <Sidebar />
            <div className="content">
                <h1>Welcome to the Main Content Area</h1>
                <p>This is the main content of the page.</p>

                <div className="course-container">
                    {courses.map((course) => (
                        <CourseBlock
                            key={course.id}
                            courseId={course.id}
                            courseName={course.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}


export default Home;

