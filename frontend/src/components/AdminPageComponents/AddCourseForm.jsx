import React, { useState } from 'react';
import { supabase } from '../../supabase';

const AddCourseForm = ({ initialData = null, isEditing = false, onSuccess = () => { } }) => {
    const [formData, setFormData] = useState({
        slug: '',
        title: '',
        category: '',
        level: '',
        image: '',
        price: '',
        rating: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    React.useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                id: initialData.id,
                slug: initialData.slug,
                title: initialData.title,
                category: initialData.category,
                level: initialData.level,
                image: initialData.image,
                price: initialData.price,
                rating: initialData.rating,
            });
        }
    }, [isEditing, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const payload = {
                slug: formData.slug,
                title: formData.title,
                category: formData.category,
                level: formData.level,
                image: formData.image,
                price: formData.price,
                rating: Number(formData.rating)
            };

            let error;
            if (!isEditing) {
                const { error: insertError } = await supabase.from('courses').insert([payload]);
                error = insertError;
            } else {
                const { error: updateError } = await supabase
                    .from('courses')
                    .update(payload)
                    .eq('id', formData.id); // Assuming 'id' is available in formData from initialData
                error = updateError;
            }

            if (error) throw error;

            setMessage(isEditing ? 'Course updated successfully!' : 'Course added successfully!');
            if (!isEditing) {
                setFormData({
                    slug: '',
                    title: '',
                    category: '',
                    level: '',
                    image: '',
                    price: '',
                    rating: '',
                });
            }
            if (onSuccess) onSuccess();

        } catch (err) {
            setError(err.message || (isEditing ? 'Failed to update course' : 'Failed to add course'));
            console.error(err);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 mt-12 mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-8">
                <h2 className="text-3xl font-extrabold text-white text-center">
                    {isEditing ? 'Edit Course' : 'Add New Course'}
                </h2>
                <p className="mt-2 text-center text-blue-100">
                    {isEditing ? 'Update the details of the course below.' : 'Enter the details of the new course below.'}
                </p>
            </div>

            <div className="py-8 px-8">
                {message && (
                    <div className="mb-6 bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{message}</span>
                    </div>
                )}
                {error && (
                    <div className="mb-6 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Rating */}
                        <div>
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-1">
                                Rating
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="rating"
                                id="rating"
                                required
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition duration-200"
                                placeholder="e.g. 4.9"
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition duration-200"
                            placeholder="e.g. Network Analysis & Circuit Theory"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">
                            Slug
                        </label>
                        <input
                            type="text"
                            name="slug"
                            id="slug"
                            required
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition duration-200"
                            placeholder="e.g. network-analysis-circuit-theory"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition duration-200"
                                placeholder="e.g. Fundamentals"
                            />
                        </div>

                        {/* Level */}
                        <div>
                            <label htmlFor="level" className="block text-sm font-medium text-gray-300 mb-1">
                                Level
                            </label>
                            <select
                                name="level"
                                id="level"
                                required
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition duration-200"
                            >
                                <option value="" disabled>Select Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                                Price
                            </label>
                            <input
                                type="text"
                                name="price"
                                id="price"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition duration-200"
                                placeholder="e.g. ₹999"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
                                Image URL
                            </label>
                            <input
                                type="url"
                                name="image"
                                id="image"
                                required
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition duration-200"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition hover:scale-[1.02] duration-200"
                        >
                            Add Course
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCourseForm;
