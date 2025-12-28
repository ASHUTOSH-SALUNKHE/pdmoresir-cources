import React, { useEffect, useState } from 'react';
import { Trash2, Loader2, Mail, Phone, Calendar, MessageSquare, RefreshCcw } from 'lucide-react';
import { supabase } from '../../supabase';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState(null);

    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setContacts(data);
        } catch (err) {
            console.error('Error fetching contacts:', err);
            setError('Failed to fetch messages. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        setDeletingId(id);
        try {
            const { error } = await supabase.from('contacts').delete().eq('id', id);
            if (error) throw error;

            // Remove from state immediately for better UI feel
            setContacts(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            console.error('Error deleting contact:', err);
            alert('Failed to delete message. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading && contacts.length === 0) {
        return (
            <div className="flex justify-center items-center h-48 bg-gray-800 rounded-xl mt-8 border border-gray-700">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 mt-12 mb-12">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 py-6 px-8 flex justify-between items-center">
                <h2 className="text-3xl font-extrabold text-white text-center">
                    Student Inquiries
                </h2>
                <button
                    onClick={fetchContacts}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    title="Refresh Messages"
                >
                    <RefreshCcw className="w-5 h-5 text-white" />
                </button>
            </div>

            <div className="p-8">
                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-6 text-center">
                        {error}
                    </div>
                )}

                {contacts.length === 0 && !error ? (
                    <div className="text-center text-gray-400 py-12">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-xl">No messages yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {contacts.map((contact) => (
                            <div key={contact.id} className="bg-gray-900 rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-colors">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold text-xl">
                                            {contact.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    <a href={`mailto:${contact.email}`} className="hover:text-blue-400 transition-colors">{contact.email}</a>
                                                </div>
                                                {contact.phone && (
                                                    <div className="flex items-center gap-1 border-l border-gray-700 pl-3">
                                                        <Phone className="w-3 h-3" />
                                                        <a href={`tel:${contact.phone}`} className="hover:text-amber-400 transition-colors">{contact.phone}</a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(contact.created_at).toLocaleDateString()} at {new Date(contact.created_at).toLocaleTimeString()}
                                        </div>

                                        <button
                                            onClick={() => handleDelete(contact.id)}
                                            disabled={deletingId === contact.id}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-red-900/30 text-red-400 border border-red-900/50 rounded hover:bg-red-900/50 hover:text-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {deletingId === contact.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gray-800/50 rounded p-4 border border-gray-700/50">
                                    <h4 className="text-sm font-semibold text-gray-300 mb-1">Subject: <span className="text-white font-normal">{contact.subject}</span></h4>
                                    <p className="text-gray-300 whitespace-pre-wrap">{contact.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactList;
