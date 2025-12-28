import React, { useEffect, useState } from "react";
import { Trash2, Loader2, Phone, Mail, Calendar } from "lucide-react";
import { supabase } from "../../supabase";

const EnrollmentList = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('enrollments')
                .select('*')
                .order('submitted_at', { ascending: false });

            if (error) throw error;
            setEnrollments(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching enrollments:", err);
            setError("Failed to load enrollments.");
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this enrollment?")) return;

        try {
            const { error } = await supabase.from('enrollments').delete().eq('id', id);
            if (error) throw error;
            setEnrollments(enrollments.filter((e) => e.id !== id));
        } catch (err) {
            console.error("Error deleting enrollment:", err);
            alert("Failed to delete enrollment.");
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12 text-gray-400">
                <Loader2 className="animate-spin mr-2" /> Loading enrollments...
            </div>
        );
    }

    if (error) {
        return <div className="text-red-400 p-8 text-center">{error}</div>;
    }

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Enrollment Submissions</h2>
                <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
                    Total: {enrollments.length}
                </span>
            </div>

            {enrollments.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                    No enrollments found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-750 text-gray-400 text-sm uppercas border-b border-gray-700">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Student Name</th>
                                <th className="px-6 py-4 font-semibold">Contact Info</th>
                                <th className="px-6 py-4 font-semibold">Course</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {enrollments.map((enrollment) => (
                                <tr
                                    key={enrollment.id}
                                    className="hover:bg-gray-700/50 transition duration-150"
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">
                                            {enrollment.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 text-sm text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="text-blue-400" />
                                                {enrollment.email}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone size={14} className="text-green-400" />
                                                {enrollment.phone_number}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block px-2 py-1 text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-md">
                                            {enrollment.course_slug}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            {new Date(enrollment.submitted_at).toLocaleDateString()}
                                        </div>
                                        <div className="text-xs text-gray-600 mt-1">
                                            {new Date(enrollment.submitted_at).toLocaleTimeString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(enrollment.id)}
                                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EnrollmentList;
