import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { supabase } from "../supabase";

const EnrollmentModal = ({ isOpen, onClose, courseSlug, courseTitle }) => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.from('enrollments').insert([{
                name: formData.name,
                phone_number: formData.phoneNumber, // map to snake_case
                email: formData.email,
                course_slug: courseSlug, // map to snake_case
            }]);

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
                setFormData({ name: "", phoneNumber: "", email: "" });
            }, 2000);
        } catch (err) {
            setError(
                err.message || "Failed to submit enrollment"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-[#1e1e2e] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                >
                    <X size={24} />
                </button>

                <div className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Enroll Now</h2>
                    <p className="text-gray-400 mb-6">
                        Join <strong>{courseTitle}</strong> and start learning today!
                    </p>

                    {success ? (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-center">
                            <p className="font-semibold">Successfully Enrolled!</p>
                            <p className="text-sm mt-1">We will contact you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your name"
                                    className="w-full bg-[#15151e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition placeholder-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your phone number"
                                    className="w-full bg-[#15151e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition placeholder-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                    className="w-full bg-[#15151e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition placeholder-gray-600"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 mt-4"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Enrollment"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnrollmentModal;
