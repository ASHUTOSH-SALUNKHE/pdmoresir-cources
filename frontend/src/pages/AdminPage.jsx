import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, BookOpen, Users, FileText, Info, LogOut, ClipboardList } from 'lucide-react';
import { supabase } from '../supabase';
import CourseInfoForm from '../components/AdminPageComponents/CourseInfoForm';
import ManageCourses from '../components/AdminPageComponents/ManageCourses';
import ContactList from '../components/AdminPageComponents/ContactList';
import BlogForm from '../components/AdminPageComponents/BlogForm';
import AddCourseForm from '../components/AdminPageComponents/AddCourseForm';
import EnrollmentList from '../components/AdminPageComponents/EnrollmentList';

const AdminPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('enrollments');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    navigate('/login');
                }
            } catch (err) {
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                navigate('/login');
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
    }

    const tabs = [
        { id: 'enrollments', label: 'Enrollments', icon: ClipboardList, component: EnrollmentList },
        { id: 'courses', label: 'Add New Course', icon: BookOpen, component: AddCourseForm },
        { id: 'manage-courses', label: 'Manage & Delete Courses', icon: BookOpen, component: ManageCourses },
        { id: 'inquiries', label: 'Student Inquiries', icon: Users, component: ContactList },
        { id: 'blog', label: 'Write New Blog Post', icon: FileText, component: BlogForm },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
                        <Layout className="w-8 h-8 text-blue-400" />
                        Admin Panel
                    </h1>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-2 px-4">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <li key={tab.id}>
                                    <button
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${activeTab === tab.id
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200 group"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header for mobile or just visual context */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-white">
                                {tabs.find(t => t.id === activeTab)?.label}
                            </h2>
                            <p className="text-gray-400 mt-1">
                                Manage your application from here.
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="animate-fade-in-up">
                        {tabs.map((tab) => {
                            if (activeTab === tab.id) {
                                const Component = tab.component;
                                <Component key={tab.id} />;
                            }
                            return null;
                        })}
                        {/* Fix: logic for rendering component was slightly broken in my copy-paste above, fixing it below */}
                        {tabs.map((tab) => {
                            if (activeTab === tab.id) {
                                const Component = tab.component;
                                return <Component key={tab.id} />;
                            }
                            return null;
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
