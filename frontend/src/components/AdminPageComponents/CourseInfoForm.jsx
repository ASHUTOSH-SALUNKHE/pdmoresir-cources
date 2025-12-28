import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Save, Layers, BookOpen, Star, Briefcase, List, AlertCircle } from 'lucide-react';
import { supabase } from '../../supabase';

const CollapsibleSection = ({ title, icon: Icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border border-gray-700 rounded-lg overflow-hidden mb-4 bg-gray-800/50">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 bg-gray-800 hover:bg-gray-750 transition-colors border-b border-gray-700/50"
            >
                <div className="flex items-center gap-2">
                    {Icon && <Icon className="w-5 h-5 text-green-400" />}
                    <span className="font-semibold text-lg text-white">{title}</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            {isOpen && <div className="p-5 space-y-4">{children}</div>}
        </div>
    );
};

const InputGroup = ({ label, value, onChange, type = "text", placeholder = "", className = "" }) => (
    <div className={className}>
        <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        {type === 'textarea' ? (
            <textarea
                value={value}
                onChange={onChange}
                rows={3}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-500"
                placeholder={placeholder}
            />
        ) : (
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-500"
                placeholder={placeholder}
            />
        )}
    </div>
);

const CourseInfoForm = ({ slugToEdit = null, onSuccess = () => { } }) => {
    const [slug, setSlug] = useState(slugToEdit || '');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (slugToEdit) {
            setSlug(slugToEdit);
            const fetchInfo = async () => {
                try {
                    setLoading(true);
                    const { data, error } = await supabase
                        .from('course_infos')
                        .select('*')
                        .eq('slug', slugToEdit)
                        .single();

                    if (data) {
                        setFormData(prev => ({
                            ...prev,
                            hero: data.hero ? { ...prev.hero, ...data.hero } : prev.hero,
                            problemSolution: data.problem_solution ? { ...prev.problemSolution, ...data.problem_solution } : prev.problemSolution,
                            learningPoints: data.learning_points || prev.learningPoints,
                            projects: data.projects || prev.projects,
                            curriculum: data.curriculum ? { ...prev.curriculum, ...data.curriculum } : prev.curriculum,
                            reviews: data.reviews || prev.reviews
                        }));
                    } else if (error && error.code !== 'PGRST116') {
                        // PGRST116 is "Relation null" (no rows found)
                        throw error;
                    }
                } catch (err) {
                    console.error("Failed to fetch course details for editing", err);
                    // Don't error hard on 404 (no info yet)
                    if (err.code !== 'PGRST116') {
                        setError("Could not load existing details. Server error.");
                    }
                } finally {
                    setLoading(false);
                }
            };
            fetchInfo();
        }
    }, [slugToEdit]);

    const [formData, setFormData] = useState({
        hero: {
            badge: 'Best Seller',
            titlePrefix: 'Master',
            titleHighlight: 'Course',
            titleSuffix: 'Complete Guide',
            description: 'Learn everything you need to know about this topic from scratch.',
            buttons: {
                primary: "Enroll Now",
                secondary: "View Curriculum"
            },
            stats: [
                { value: '4.8', label: 'Rating' },
                { value: '10k+', label: 'Students' },
                { value: '25+', label: 'Projects' },
                { value: '50h', label: 'Content' }
            ]
        },
        problemSolution: {
            title: "Why learn this?",
            paragraphs: ["This is a problem...", "This is the solution..."]
        },
        learningPoints: [
            { title: "Point 1", icon: "Check", desc: "Description 1", colorClass: "text-green-400" }
        ],
        projects: [
            {
                id: "Project 1",
                title: "My Project",
                image: "https://via.placeholder.com/300",
                desc: "Project description",
                checkpoints: ["Task 1", "Task 2"]
            }
        ],
        curriculum: {
            summary: "Course creates structure...",
            sections: [
                {
                    title: "Section 1",
                    duration: "2h 30m",
                    lessons: [{ title: "Intro", time: "10m" }]
                }
            ]
        },
        reviews: [
            { name: "John Doe", role: "Developer", text: "Great course!" }
        ]
    });

    // Helper functions
    const updateHero = (key, val) => {
        setFormData(prev => ({
            ...prev,
            hero: { ...prev.hero, [key]: val }
        }));
    };

    const updateHeroStat = (index, key, val) => {
        setFormData(prev => {
            const newStats = [...prev.hero.stats];
            newStats[index] = { ...newStats[index], [key]: val };
            return {
                ...prev,
                hero: { ...prev.hero, stats: newStats }
            };
        });
    };

    const updateProblemSolution = (key, val) => {
        setFormData(prev => ({
            ...prev,
            problemSolution: { ...prev.problemSolution, [key]: val }
        }));
    };

    const updateParagraph = (index, val) => {
        setFormData(prev => {
            const newParas = [...prev.problemSolution.paragraphs];
            newParas[index] = val;
            return { ...prev, problemSolution: { ...prev.problemSolution, paragraphs: newParas } };
        });
    };

    const addParagraph = () => {
        setFormData(prev => ({
            ...prev,
            problemSolution: { ...prev.problemSolution, paragraphs: [...prev.problemSolution.paragraphs, ""] }
        }));
    };

    const removeParagraph = (index) => {
        setFormData(prev => ({
            ...prev,
            problemSolution: { ...prev.problemSolution, paragraphs: prev.problemSolution.paragraphs.filter((_, i) => i !== index) }
        }));
    };

    const updateLearningPoint = (index, key, val) => {
        setFormData(prev => {
            const newPoints = [...prev.learningPoints];
            newPoints[index] = { ...newPoints[index], [key]: val };
            return { ...prev, learningPoints: newPoints };
        });
    };

    const addLearningPoint = () => {
        setFormData(prev => ({
            ...prev,
            learningPoints: [...prev.learningPoints, { title: "", icon: "Check", desc: "", colorClass: "" }]
        }));
    };

    const removeLearningPoint = (index) => {
        setFormData(prev => ({
            ...prev,
            learningPoints: prev.learningPoints.filter((_, i) => i !== index)
        }));
    };

    const updateProject = (index, key, val) => {
        setFormData(prev => {
            const newProjs = [...prev.projects];
            newProjs[index] = { ...newProjs[index], [key]: val };
            return { ...prev, projects: newProjs };
        });
    };

    const addProject = () => {
        setFormData(prev => ({
            ...prev,
            projects: [...prev.projects, { id: `Project ${prev.projects.length + 1}`, title: "", image: "", desc: "", checkpoints: [] }]
        }));
    };

    const removeProject = (index) => {
        setFormData(prev => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index)
        }));
    };

    const updateProjectCheckpoint = (pIndex, cIndex, val) => {
        setFormData(prev => {
            const newProjs = [...prev.projects];
            const newCPs = [...newProjs[pIndex].checkpoints];
            newCPs[cIndex] = val;
            newProjs[pIndex] = { ...newProjs[pIndex], checkpoints: newCPs };
            return { ...prev, projects: newProjs };
        });
    };

    const addProjectCheckpoint = (pIndex) => {
        setFormData(prev => {
            const newProjs = [...prev.projects];
            newProjs[pIndex] = { ...newProjs[pIndex], checkpoints: [...newProjs[pIndex].checkpoints, ""] };
            return { ...prev, projects: newProjs };
        });
    };

    const removeProjectCheckpoint = (pIndex, cIndex) => {
        setFormData(prev => {
            const newProjs = [...prev.projects];
            newProjs[pIndex] = { ...newProjs[pIndex], checkpoints: newProjs[pIndex].checkpoints.filter((_, i) => i !== cIndex) };
            return { ...prev, projects: newProjs };
        });
    };

    const updateCurriculumSection = (index, key, val) => {
        setFormData(prev => {
            const newSections = [...prev.curriculum.sections];
            newSections[index] = { ...newSections[index], [key]: val };
            return { ...prev, curriculum: { ...prev.curriculum, sections: newSections } };
        });
    };

    const addSection = () => {
        setFormData(prev => ({
            ...prev,
            curriculum: { ...prev.curriculum, sections: [...prev.curriculum.sections, { title: "", duration: "", lessons: [] }] }
        }));
    };

    const removeSection = (index) => {
        setFormData(prev => ({
            ...prev,
            curriculum: { ...prev.curriculum, sections: prev.curriculum.sections.filter((_, i) => i !== index) }
        }));
    };

    const updateLesson = (sIndex, lIndex, key, val) => {
        setFormData(prev => {
            const newSections = [...prev.curriculum.sections];
            const newLessons = [...newSections[sIndex].lessons];
            newLessons[lIndex] = { ...newLessons[lIndex], [key]: val };
            newSections[sIndex] = { ...newSections[sIndex], lessons: newLessons };
            return { ...prev, curriculum: { ...prev.curriculum, sections: newSections } };
        });
    };

    const addLesson = (sIndex) => {
        setFormData(prev => {
            const newSections = [...prev.curriculum.sections];
            newSections[sIndex] = { ...newSections[sIndex], lessons: [...newSections[sIndex].lessons, { title: "", time: "" }] };
            return { ...prev, curriculum: { ...prev.curriculum, sections: newSections } };
        });
    };

    const removeLesson = (sIndex, lIndex) => {
        setFormData(prev => {
            const newSections = [...prev.curriculum.sections];
            newSections[sIndex] = {
                ...newSections[sIndex],
                lessons: newSections[sIndex].lessons.filter((_, i) => i !== lIndex)
            };
            return { ...prev, curriculum: { ...prev.curriculum, sections: newSections } };
        });
    };

    const updateReview = (index, key, val) => {
        setFormData(prev => {
            const newReviews = [...prev.reviews];
            newReviews[index] = { ...newReviews[index], [key]: val };
            return { ...prev, reviews: newReviews };
        });
    };

    const addReview = () => {
        setFormData(prev => ({
            ...prev,
            reviews: [...prev.reviews, { name: "", role: "", text: "" }]
        }));
    };

    const removeReview = (index) => {
        setFormData(prev => ({
            ...prev,
            reviews: prev.reviews.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!slug) {
            setError('Slug is required');
            return;
        }

        try {
            // Map camelCase to snake_case for Supabase
            const payload = {
                slug,
                hero: formData.hero,
                problem_solution: formData.problemSolution,
                learning_points: formData.learningPoints,
                projects: formData.projects,
                curriculum: formData.curriculum,
                reviews: formData.reviews
            };

            // Use Upsert to handle both Create and Update seamlessly
            // 'slug' is unique, so upsert works perfectly
            const { error: upsertError } = await supabase
                .from('course_infos')
                .upsert(payload, { onConflict: 'slug' });

            if (upsertError) throw upsertError;

            setMessage('Course Info saved successfully!');

            if (!slugToEdit) {
                setSlug(''); // Clear for new entry if not editing
            }

            window.scrollTo(0, 0);
            if (onSuccess) onSuccess();

        } catch (err) {
            setError(err.message || 'Failed to save course info');
            console.error(err);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 mt-12 max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 py-6 px-8">
                <h2 className="text-3xl font-extrabold text-white text-center">
                    Add Course Details
                </h2>
                <p className="mt-2 text-center text-green-100">
                    Configure the Hero, Curriculum, Projects, and Reviews for your course page.
                </p>
            </div>

            <div className="p-8">
                {message && (
                    <div className="mb-6 bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded relative flex items-center gap-2">
                        <Save className="w-5 h-5" />
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
                    {/* Slug Input */}
                    {/* Slug Input */}
                    <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600">
                        <label htmlFor="info-slug" className="block text-lg font-medium text-white mb-2">
                            Course Slug <span className="text-red-400">*</span>
                        </label>
                        {slugToEdit ? (
                            <p className="text-sm text-yellow-400 mb-4 flex items-center gap-2">
                                <AlertCircle size={14} />
                                Slug is locked to the selected course.
                            </p>
                        ) : (
                            <p className="text-sm text-gray-400 mb-4">
                                This must match the slug of an existing course (e.g., <code>network-analysis-circuit-theory</code>).
                            </p>
                        )}
                        <input
                            type="text"
                            id="info-slug"
                            required
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            readOnly={!!slugToEdit}
                            className={`w-full px-5 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-500 text-lg ${slugToEdit ? 'cursor-not-allowed opacity-70 text-gray-400' : ''}`}
                            placeholder="e.g. network-analysis-circuit-theory"
                        />
                    </div>

                    {/* Hero Section */}
                    <CollapsibleSection title="Hero Section" icon={Layers} defaultOpen={true}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup label="Badge Text" value={formData.hero.badge} onChange={(e) => updateHero('badge', e.target.value)} />
                            <InputGroup label="Title Prefix" value={formData.hero.titlePrefix} onChange={(e) => updateHero('titlePrefix', e.target.value)} />
                            <InputGroup label="Title Highlight" value={formData.hero.titleHighlight} onChange={(e) => updateHero('titleHighlight', e.target.value)} className="text-green-400 font-bold" />
                            <InputGroup label="Title Suffix" value={formData.hero.titleSuffix} onChange={(e) => updateHero('titleSuffix', e.target.value)} />
                            <InputGroup label="Primary Button" value={formData.hero.buttons?.primary || ""} onChange={(e) => setFormData(p => ({ ...p, hero: { ...p.hero, buttons: { ...p.hero.buttons, primary: e.target.value } } }))} />
                            <InputGroup label="Secondary Button" value={formData.hero.buttons?.secondary || ""} onChange={(e) => setFormData(p => ({ ...p, hero: { ...p.hero, buttons: { ...p.hero.buttons, secondary: e.target.value } } }))} />
                        </div>
                        <InputGroup label="Description" type="textarea" value={formData.hero.description} onChange={(e) => updateHero('description', e.target.value)} />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900/50 p-4 rounded-lg">
                            {formData.hero.stats.map((stat, i) => (
                                <div key={i} className="space-y-2">
                                    <InputGroup label={`Stat ${i + 1} Value`} value={stat.value} onChange={(e) => updateHeroStat(i, 'value', e.target.value)} />
                                    <InputGroup label="Label" value={stat.label} onChange={(e) => updateHeroStat(i, 'label', e.target.value)} />
                                </div>
                            ))}
                        </div>
                    </CollapsibleSection>

                    {/* Problem / Solution Section */}
                    <CollapsibleSection title="Problem & Solution" icon={AlertCircle}>
                        <InputGroup label="Section Title" value={formData.problemSolution.title} onChange={(e) => updateProblemSolution('title', e.target.value)} />

                        <div className="space-y-3">
                            <h4 className="text-gray-300 font-medium">Paragraphs</h4>
                            {formData.problemSolution.paragraphs.map((para, i) => (
                                <div key={i} className="flex gap-2">
                                    <textarea
                                        value={para}
                                        onChange={(e) => updateParagraph(i, e.target.value)}
                                        rows={2}
                                        className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                                    />
                                    <button type="button" onClick={() => removeParagraph(i)} className="text-red-400 hover:text-red-300">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={addParagraph} className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300">
                                <Plus className="w-4 h-4" /> Add Paragraph
                            </button>
                        </div>
                    </CollapsibleSection>

                    {/* Learning Points */}
                    <CollapsibleSection title="Learning Points" icon={List}>
                        <div className="space-y-4">
                            {formData.learningPoints.map((point, i) => (
                                <div key={i} className="p-4 bg-gray-900 rounded-lg border border-gray-700 relative group">
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button type="button" onClick={() => removeLearningPoint(i)} className="text-red-400 hover:text-red-300">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputGroup label="Title" value={point.title} onChange={(e) => updateLearningPoint(i, 'title', e.target.value)} />
                                        <InputGroup label="Icon Name (Lucide)" value={point.icon} onChange={(e) => updateLearningPoint(i, 'icon', e.target.value)} />
                                        <InputGroup label="Description" value={point.desc} onChange={(e) => updateLearningPoint(i, 'desc', e.target.value)} className="md:col-span-2" />
                                        <InputGroup label="Color Class (Tailwind)" value={point.colorClass} onChange={(e) => updateLearningPoint(i, 'colorClass', e.target.value)} className="md:col-span-2 text-xs font-mono" />
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addLearningPoint} className="w-full py-2 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-green-500 hover:text-green-500 transition-colors flex justify-center items-center gap-2">
                                <Plus className="w-5 h-5" /> Add Learning Point
                            </button>
                        </div>
                    </CollapsibleSection>

                    {/* Projects */}
                    <CollapsibleSection title="Projects" icon={Briefcase}>
                        <div className="space-y-6">
                            {formData.projects.map((proj, i) => (
                                <div key={i} className="p-6 bg-gray-900 rounded-xl border border-gray-700 relative">
                                    <h4 className="text-lg font-bold text-gray-200 mb-4 flex justify-between">
                                        {proj.id}
                                        <button type="button" onClick={() => removeProject(i)} className="text-red-400 hover:text-red-300 text-sm font-normal flex items-center gap-1">
                                            <Trash2 className="w-4 h-4" /> Remove
                                        </button>
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <InputGroup label="Project Title" value={proj.title} onChange={(e) => updateProject(i, 'title', e.target.value)} />
                                        <InputGroup label="Image URL" value={proj.image} onChange={(e) => updateProject(i, 'image', e.target.value)} />
                                    </div>
                                    <InputGroup label="Description" type="textarea" value={proj.desc} onChange={(e) => updateProject(i, 'desc', e.target.value)} className="mb-4" />

                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Checkpoints</label>
                                        <div className="space-y-2">
                                            {proj.checkpoints.map((cp, cpIndex) => (
                                                <div key={cpIndex} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={cp}
                                                        onChange={(e) => updateProjectCheckpoint(i, cpIndex, e.target.value)}
                                                        className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white"
                                                    />
                                                    <button type="button" onClick={() => removeProjectCheckpoint(i, cpIndex)} className="text-red-400 hover:text-red-300">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addProjectCheckpoint(i)} className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 mt-2">
                                                <Plus className="w-3 h-3" /> Add Checkpoint
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addProject} className="w-full py-2 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-green-500 hover:text-green-500 transition-colors flex justify-center items-center gap-2">
                                <Plus className="w-5 h-5" /> Add Project
                            </button>
                        </div>
                    </CollapsibleSection>

                    {/* Curriculum */}
                    <CollapsibleSection title="Curriculum" icon={BookOpen}>
                        <InputGroup label="Curriculum Summary" value={formData.curriculum.summary} onChange={(e) => setFormData(p => ({ ...p, curriculum: { ...p.curriculum, summary: e.target.value } }))} className="mb-6" />

                        <div className="space-y-6 pl-4 border-l-2 border-gray-700">
                            {formData.curriculum.sections.map((section, i) => (
                                <div key={i} className="relative">
                                    <button type="button" onClick={() => removeSection(i)} className="absolute -left-[34px] top-0 bg-gray-800 text-red-500 p-1 rounded-full border border-gray-600 hover:bg-red-900/20">
                                        <Trash2 className="w-4 h-4" />
                                    </button>

                                    <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <InputGroup label={`Section ${i + 1} Title`} value={section.title} onChange={(e) => updateCurriculumSection(i, 'title', e.target.value)} className="md:col-span-2" />
                                        <InputGroup label="Duration" value={section.duration} onChange={(e) => updateCurriculumSection(i, 'duration', e.target.value)} />
                                    </div>

                                    <div className="bg-gray-900/50 p-4 rounded-lg space-y-2">
                                        {section.lessons.map((lesson, lIndex) => (
                                            <div key={lIndex} className="flex gap-2 items-center">
                                                <span className="text-gray-500 text-sm mono w-6">{lIndex + 1}.</span>
                                                <input
                                                    type="text"
                                                    value={lesson.title}
                                                    onChange={(e) => updateLesson(i, lIndex, 'title', e.target.value)}
                                                    placeholder="Lesson Title"
                                                    className="flex-1 px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white"
                                                />
                                                <input
                                                    type="text"
                                                    value={lesson.time}
                                                    onChange={(e) => updateLesson(i, lIndex, 'time', e.target.value)}
                                                    placeholder="Time"
                                                    className="w-20 px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white text-center"
                                                />
                                                <button type="button" onClick={() => removeLesson(i, lIndex)} className="text-red-400 p-1">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addLesson(i)} className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 mt-2 ml-8">
                                            <Plus className="w-3 h-3" /> Add Lesson
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addSection} className="flex items-center gap-2 text-sm text-green-400 font-medium hover:text-green-300">
                                <Plus className="w-4 h-4" /> Add New Section
                            </button>
                        </div>
                    </CollapsibleSection>

                    {/* Reviews */}
                    <CollapsibleSection title="Reviews" icon={Star}>
                        <div className="grid grid-cols-1 gap-4">
                            {formData.reviews.map((review, i) => (
                                <div key={i} className="p-4 bg-gray-900 rounded-lg border border-gray-700 relative">
                                    <button type="button" onClick={() => removeReview(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-300">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                        <InputGroup label="Name" value={review.name} onChange={(e) => updateReview(i, 'name', e.target.value)} />
                                        <InputGroup label="Role" value={review.role} onChange={(e) => updateReview(i, 'role', e.target.value)} />
                                    </div>
                                    <InputGroup label="Review Text" type="textarea" value={review.text} onChange={(e) => updateReview(i, 'text', e.target.value)} />
                                </div>
                            ))}
                            <button type="button" onClick={addReview} className="w-full py-2 border border-gray-600 rounded-lg text-gray-400 hover:bg-gray-700 transition-colors flex justify-center items-center gap-2">
                                <Plus className="w-4 h-4" /> Add Review
                            </button>
                        </div>
                    </CollapsibleSection>

                    <div className="pt-6 sticky bottom-0 bg-gray-800 pb-4 border-t border-gray-700">
                        <button
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 py-4 px-6 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition hover:scale-[1.01] duration-200"
                        >
                            <Save className="w-6 h-6" />
                            Save Course Configuration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseInfoForm;
