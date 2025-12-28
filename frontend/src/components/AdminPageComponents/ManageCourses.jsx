import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { supabase } from "../../supabase";
import AddCourseForm from "./AddCourseForm";
import CourseInfoForm from "./CourseInfoForm";

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingCourse, setEditingCourse] = useState(null);
    const [editingCourseInfo, setEditingCourseInfo] = useState(null);

    // Fetch all courses
    const fetchCourses = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('courses').select('*');
            if (error) throw error;
            setCourses(data);
            setError("");
        } catch (err) {
            setError("Failed to fetch courses");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Delete Course
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course? This action implies deleting basic info AND detailed course info.")) return;

        try {
            const { error } = await supabase.from('courses').delete().eq('id', id);
            if (error) throw error;
            // Optimistic update
            setCourses(courses.filter((course) => course.id !== id));
        } catch (err) {
            alert("Failed to delete course");
            console.error(err);
        }
    };

    // Edit Basic Course Info
    const handleEditCourse = (course) => {
        setEditingCourse(course);
        setEditingCourseInfo(null);
    };

    // Edit Course Info (Details)
    const handleEditCourseInfo = (slug) => {
        // We'll pass the slug, and the form component should fetch the details or we fetch them here
        // Ideally, CourseInfoForm should handle fetching if we pass just slug or initial data
        // For simplicity, let's just pass the slug and let the user re-enter or we fetch.
        // Actually, better to fetch here so we can populate the form.
        setEditingCourseInfo(slug); // We will pass this to the form
        setEditingCourse(null);
    };

    const handleCloseEdit = () => {
        setEditingCourse(null);
        setEditingCourseInfo(null);
        fetchCourses(); // Refresh list
    };

    if (editingCourse) {
        return (
            <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Edit Course: {editingCourse.title}</h2>
                    <button onClick={handleCloseEdit} className="text-gray-400 hover:text-white">Cancel</button>
                </div>
                <AddCourseForm initialData={editingCourse} isEditing={true} onSuccess={handleCloseEdit} />
            </div>
        );
    }

    if (editingCourseInfo) {
        return (
            <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Edit Details for Slug: {editingCourseInfo}</h2>
                    <button onClick={handleCloseEdit} className="text-gray-400 hover:text-white">Cancel</button>
                </div>
                {/* We pass the slug so the form can fetch details if needed, or we could fetch here. 
                    Let's update CourseInfoForm to handle fetching by slug if possible or we assume it's just for 'Add' right now.
                    Wait, previous context showed CourseInfoForm might not support editing yet. We will check/update it.
                */}
                <CourseInfoForm slugToEdit={editingCourseInfo} onSuccess={handleCloseEdit} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Manage Courses</h2>

            {loading ? (
                <p className="text-gray-400">Loading courses...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-500 transition-all">
                            <div>
                                <h3 className="text-xl font-bold text-white">{course.title}</h3>
                                <p className="text-gray-400 text-sm mt-1">Slug: <span className="text-blue-400">{course.slug}</span> | ID: {course.id}</p>
                                <p className="text-gray-500 text-xs mt-1">Category: {course.category} | Level: {course.level}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleEditCourse(course)}
                                    className="px-3 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg text-sm font-medium transition-colors border border-blue-600/30"
                                >
                                    Edit Basics
                                </button>
                                <button
                                    onClick={() => handleEditCourseInfo(course.slug)}
                                    className="px-3 py-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg text-sm font-medium transition-colors border border-purple-600/30"
                                >
                                    Edit Info
                                </button>
                                <button
                                    onClick={() => handleDelete(course.id)}
                                    className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors border border-red-600/30"
                                    title="Delete Course"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {courses.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No courses found. Add one from the "Add New Course" tab.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ManageCourses;
