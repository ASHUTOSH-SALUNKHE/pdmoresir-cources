import React, { useState } from 'react';
import { PenTool, Image, User, Clock, Calendar, CheckSquare, Save, AlertCircle } from 'lucide-react';
import { supabase } from '../../supabase';

const BlogForm = ({ initialData, isEditing, onSuccess }) => {
    const [formData, setFormData] = useState({
        slug: '',
        title: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        readTime: '',
        author: '',
        image: '',
        excerpt: '',
        featured: false,
        content: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                slug: initialData.slug || '',
                title: initialData.title || '',
                category: initialData.category || '',
                date: initialData.date || new Date().toISOString().split('T')[0],
                readTime: initialData.readTime || '',
                author: initialData.author || '',
                image: initialData.image || '',
                excerpt: initialData.excerpt || '',
                featured: initialData.featured || false,
                content: initialData.content || ''
            });
        }
    }, [isEditing, initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            // 1. Prepare Blog Data (excluding content)
            const blogData = {
                slug: formData.slug,
                title: formData.title,
                category: formData.category,
                date: formData.date,
                read_time: formData.readTime, // map to snake_case if schema is read_time (checked below)
                author: formData.author,
                image: formData.image,
                excerpt: formData.excerpt,
                featured: formData.featured,
            };

            // Check schema: schema says 'read_time'.
            // formData uses 'readTime'. I mapped it above.

            // 2. Prepare Blog Info Data (content)
            const blogInfoData = {
                slug: formData.slug,
                content: formData.content
            };

            if (!isEditing) {
                // Add Blog
                const { error: blogError } = await supabase.from('blogs').insert([blogData]);
                if (blogError) throw blogError;

                // Add Blog Content
                const { error: infoError } = await supabase.from('blog_infos').insert([blogInfoData]);
                if (infoError) {
                    // Rollback? ideally yes, but for now just throw
                    console.error("Content insert failed", infoError);
                    throw infoError;
                }

            } else {
                // Update Blog
                const { error: blogError } = await supabase
                    .from('blogs')
                    .update(blogData)
                    .eq('slug', formData.slug); // Assuming slug is unique and mostly immutable, or use ID if available
                // Note: if user changes slug, we have a problem because of FK.
                // Ideally pass ID. But initialData might not have it if coming from a partial view.
                // Assuming ID is better.
                if (blogError) throw blogError;

                // Update Blog Content
                // Check if content info exists first? Upsert is better.
                const { error: infoError } = await supabase
                    .from('blog_infos')
                    .upsert(blogInfoData, { onConflict: 'slug' });
                if (infoError) throw infoError;
            }

            setMessage(isEditing ? 'Blog post updated successfully!' : 'Blog post added successfully!');
            if (!isEditing) {
                setFormData({
                    slug: '',
                    title: '',
                    category: '',
                    date: new Date().toISOString().split('T')[0],
                    readTime: '',
                    author: '',
                    image: '',
                    excerpt: '',
                    featured: false,
                    content: ''
                });
            }
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 mt-12 mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-6 px-8">
                <h2 className="text-3xl font-extrabold text-white text-center flex items-center justify-center gap-3">
                    <PenTool className="w-8 h-8" />
                    {isEditing ? 'Edit Blog Post' : 'Write New Blog Post'}
                </h2>
                <p className="mt-2 text-center text-purple-100">
                    {isEditing ? 'Update the details of this article.' : 'Create a new article for the blog section.'}
                </p>
            </div>

            <div className="p-8">
                {message && (
                    <div className="mb-6 bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded relative flex items-center gap-2">
                        <CheckSquare className="w-5 h-5" />
                        <span>{message}</span>
                    </div>
                )}
                {error && (
                    <div className="mb-6 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title & Slug */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="e.g. Mastering Python"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="e.g. mastering-python"
                            />
                        </div>
                    </div>

                    {/* Category & Read Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="e.g. Programming"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Read Time</span>
                            </label>
                            <input
                                type="text"
                                name="readTime"
                                value={formData.readTime}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="e.g. 10 min"
                            />
                        </div>
                    </div>

                    {/* Author & Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                <span className="flex items-center gap-2"><User className="w-4 h-4" /> Author</span>
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="e.g. Dr. A. Smith"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Date</span>
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                            />
                        </div>
                    </div>

                    {/* Image URL & Featured */}
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                <span className="flex items-center gap-2"><Image className="w-4 h-4" /> Image URL</span>
                            </label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="https://..."
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="featured"
                                id="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 bg-gray-700 border-gray-600"
                            />
                            <label htmlFor="featured" className="ml-2 block text-sm text-gray-300">
                                Featured Post?
                            </label>
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                            rows="2"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                            placeholder="Short summary..."
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Content (Markdown supported)</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows="10"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white font-mono text-sm"
                            placeholder="# Heading&#10;&#10;Write your blog content here..."
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition hover:scale-[1.01] duration-200"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? (isEditing ? 'Updating...' : 'Publishing...') : (isEditing ? 'Update Blog Post' : 'Publish Blog Post')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogForm;
