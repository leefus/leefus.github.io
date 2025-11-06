<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Episode Submission Form</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
            from { transform: scale(0); }
            to { transform: scale(1); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
        }
        .animate-scaleIn {
            animation: scaleIn 0.3s ease-out 0.2s both;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        body {
            background-color: #3d2d1e;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }
        html {
            margin: 0;
            padding: 0;
        }
        .bg-pattern {
            background-image: url('https://imgur.com/VXxU8MT');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }
        .paper-tear {
            background-image: url('https://imgur.com/3A92mAW');
            background-size: cover;
            background-position: right center;
            background-repeat: repeat-y;
            filter: drop-shadow(4px 0 8px rgba(0,0,0,0.3));
        }
    </style>
</head>
<body>
    <div id="app"></div>

    <script>
        // Form State
        let formData = {
            email: '',
            podcastName: '',
            episodeTitle: '',
            season: '',
            episodeNumber: '',
            releaseDate: '',
            guests: '',
            description: '',
            productsMentioned: '',
            hasAds: '',
            timestamps: '',
            contentMethod: 'drive',
            contentUrl: '',
            contentReady: '',
        };
        
        let coverPhoto = null;
        let contentFile = null;
        let adFile = null;
        let submitted = false;
        let isSubmitting = false;
        let errors = {};

        // Validation
        function validateForm() {
            const newErrors = {};
            
            if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Valid email is required';
            }
            if (!formData.podcastName.trim()) {
                newErrors.podcastName = 'Podcast name is required';
            }
            if (!formData.episodeTitle.trim()) {
                newErrors.episodeTitle = 'Episode title is required';
            }
            if (!formData.description.trim()) {
                newErrors.description = 'Description is required';
            }
            if (!formData.hasAds) {
                newErrors.hasAds = 'Please select an option';
            }
            if (!formData.contentReady) {
                newErrors.contentReady = 'Please select an option';
            }
            
            errors = newErrors;
            return Object.keys(newErrors).length === 0;
        }

        // Submit Handler
        async function handleSubmit(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                render();
                const firstError = document.querySelector('.border-red-500');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            
            isSubmitting = true;
            render();
            
            const submissionData = {
                email: formData.email,
                podcastName: formData.podcastName,
                episodeTitle: formData.episodeTitle,
                season: formData.season,
                episodeNumber: formData.episodeNumber,
                releaseDate: formData.releaseDate,
                guests: formData.guests,
                description: formData.description,
                productsMentioned: formData.productsMentioned,
                hasAds: formData.hasAds,
                timestamps: formData.timestamps,
                adFile: adFile?.name || '',
                coverPhoto: coverPhoto?.name || '',
                contentMethod: formData.contentMethod,
                contentFile: contentFile?.name || '',
                contentUrl: formData.contentUrl,
                contentReady: formData.contentReady,
                submittedAt: new Date().toISOString()
            };
            
            try {
                await fetch('https://script.google.com/macros/s/AKfycbxrrMxVY-7OKOKVxEAW1WM9bCTOzxSsvYKYedCTgxhUsFC4Ex3gBWChPH3wLeBH5kQS/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submissionData)
                });
                
                console.log('Form Data Submitted:', submissionData);
                isSubmitting = false;
                submitted = true;
                render();
            } catch (error) {
                console.error('Submission error:', error);
                isSubmitting = false;
                alert('There was an error submitting the form. Please try again.');
                render();
            }
        }

        function handleInputChange(e) {
            const { name, value } = e.target;
            formData[name] = value;
            if (errors[name]) {
                delete errors[name];
            }
        }

        function handleFileChange(e, type) {
            const file = e.target.files[0];
            if (file) {
                if (type === 'cover') coverPhoto = file;
                if (type === 'content') contentFile = file;
                if (type === 'ad') adFile = file;
                render();
            }
        }

        function resetForm() {
            formData = {
                email: '', podcastName: '', episodeTitle: '', season: '',
                episodeNumber: '', releaseDate: '', guests: '', description: '',
                productsMentioned: '', hasAds: '', timestamps: '',
                contentMethod: 'drive', contentUrl: '', contentReady: ''
            };
            coverPhoto = null;
            contentFile = null;
            adFile = null;
            errors = {};
            submitted = false;
            render();
        }

        // Render Function
        function render() {
            const app = document.getElementById('app');
            
            if (submitted) {
                app.innerHTML = `
                    <div class="min-h-screen flex items-center justify-center p-4 relative">
                        <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
                        
                        <div class="fixed left-0 top-0 h-full w-24 z-20 hidden lg:block paper-tear">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center relative z-10 animate-fadeIn">
                            <div class="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                <svg class="w-12 h-12 text-green-600 animate-scaleIn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 class="text-3xl font-bold text-gray-800 mb-2">Submission Received!</h2>
                            <p class="text-gray-600 mb-6">
                                Thank you for submitting your podcast episode. We'll review it and get back to you soon.
                            </p>
                            <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                                <p class="text-sm text-amber-900">
                                    <strong>📧 Confirmation sent to:</strong><br>
                                    ${formData.email}
                                </p>
                            </div>
                            <button
                                onclick="resetForm()"
                                class="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                            >
                                Submit Another Episode
                            </button>
                        </div>
                    </div>
                `;
                return;
            }
            
            app.innerHTML = `
                <div class="min-h-screen py-8 px-4 relative">
                    <div class="absolute inset-0 opacity-30 bg-pattern"></div>
                    <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>
                    
                    <div class="fixed left-0 top-0 h-full w-24 z-20 hidden lg:block paper-tear">
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
                    </div>
                    
                    <div class="max-w-4xl mx-auto relative z-10 lg:ml-32">
                        <div class="bg-gradient-to-r from-amber-800 to-amber-900 rounded-t-lg p-8 shadow-lg relative overflow-hidden border-b-4 border-amber-600">
                            <div class="absolute inset-0 opacity-20 bg-pattern"></div>
                            <div class="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-amber-800/80"></div>
                            <div class="relative z-10 flex items-center justify-center mb-4">
                                <div class="bg-amber-700 rounded-full p-3 mr-4 shadow-lg">
                                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h1 class="text-4xl font-bold text-white">Episode Submission</h1>
                                    <p class="text-amber-100 mt-1">Submit your outdoor adventure content for review</p>
                                </div>
                            </div>
                            <div class="flex justify-center gap-6 text-amber-100 text-sm mt-6 relative z-10">
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                    </svg>
                                    <span>Professional Review</span>
                                </div>
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Quick Turnaround</span>
                                </div>
                            </div>
                        </div>

                        <form onsubmit="handleSubmit(event)" class="bg-white rounded-b-lg shadow-2xl p-4 md:p-8 backdrop-blur-sm">
                            <!-- Contact Information -->
                            <div class="mb-8">
                                <h2 class="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-amber-600 flex items-center">
                                    <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                                        <span class="text-amber-700 font-bold">1</span>
                                    </div>
                                    Contact Information
                                </h2>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-gray-700 font-semibold mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value="${formData.email}"
                                            oninput="handleInputChange(event)"
                                            class="w-full px-4 py-3 border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:border-amber-600 focus:outline-none transition-all"
                                            placeholder="your.email@example.com"
                                        />
                                        ${errors.email ? `<p class="text-red-500 text-sm mt-1">${errors.email}</p>` : ''}
                                    </div>
                                </div>
                            </div>

                            <!-- Episode Details -->
                            <div class="mb-8">
                                <h2 class="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-amber-600 flex items-center">
                                    <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                                        <span class="text-amber-700 font-bold">2</span>
                                    </div>
                                    Episode Details
                                </h2>
                                <div class="grid md:grid-cols-2 gap-4">
                                    <div class="md:col-span-2">
                                        <label class="block text-gray-700 font-semibold mb-2">Podcast or Show Name *</label>
                                        <input
                                            type="text"
                                            name="podcastName"
                                            value="${formData.podcastName}"
                                            oninput="handleInputChange(event)"
                                            class="w-full px-4 py-3 border-2 ${errors.podcastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:border-amber-600 focus:outline-none transition-all"
                                            placeholder="The Outdoor Adventure Podcast"
                                        />
                                        ${errors.podcastName ? `<p class="text-red-500 text-sm mt-1">${errors.podcastName}</p>` : ''}
                                    </div>
                                    
                                    <div class="md:col-span-2">
                                        <label class="block text-gray-700 font-semibold mb-2">Episode Title *</label>
                                        <input
                                            type="text"
                                            name="episodeTitle"
                                            value="${formData.episodeTitle}"
                                            oninput="handleInputChange(event)"
                                            class="w-full px-4 py-3 border-2 ${errors.episodeTitle ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:border-amber-600 focus:outline-none transition-all"
                                            placeholder="Hunting the Backcountry"
                                        />
                                        ${errors.episodeTitle ? `<p class="text-red-500 text-sm mt-1">${errors.episodeTitle}</p>` : ''}
                                    </div>

                                    <div>
                                        <label class="block text-gray-700 font-semibold mb-2">Season</label>
                                        <input
                                            type="text"
                                            name="season"
                                            value="${formData.season}"
                                            oninput="handleInputChange(event)"
                                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none transition-all"
                                            placeholder="Season 2"
                                        />
                                    </div>

                                    <div>
                                        <label class="block text-gray-700 font-semibold mb-2">Episode Number</label>
                                        <input
                                            type="text"
                                            name="episodeNumber"
                                            value="${formData.episodeNumber}"
                                            oninput="handleInputChange(event)"
                                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none transition-all"
                                            placeholder="Episode 15"
                                        />
                                    </div>

                                    <div>
                                        <label class="block text-gray-700 font-semibold mb-2">Release Date</label>
                                        <input
                                            type="date"
                                            name="releaseDate"
                                            value="${formData.releaseDate}"
                                            oninput="handleInputChange(event)"
                                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label class="block text-gray-700 font-semibold mb-2">Guests</label>
                                        <input
                                            type="text"
                                            name="guests"
                                            value="${formData.guests}"
                                            oninput="handleInputChange(event)"
                                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none transition-all"
                                            placeholder="John Doe, Jane Smith"
                                        />
                                    </div>

                                    <div class="md:col-span-2">
                                        <label class="block text-gray-700 font-semibold mb-2">Episode Description *</label>
                                        <textarea
                                            name="description"
                                            value="${formData.description}"
                                            oninput="handleInputChange(event)"
                                            rows="4"
                                            class="w-full px-4 py-3 border-2 ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:border-amber-600 focus:outline-none transition-all"
                                            placeholder="Describe your episode..."
                                        >${formData.description}</textarea>
                                        ${errors.description ? `<p class="text-red-500 text-sm mt-1">${errors.description}</p>` : ''}
                                    </div>

                                    <div class="md:col-span-2">
                                        <label class="block text-gray-700 font-semibold mb-2">Products Mentioned</label>
                                        <textarea
                                            name="productsMentioned"
                                            value="${formData.productsMentioned}"
                                            oninput="handleInputChange(event)"
                                            rows="3"
                                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none transition-all"
                                            placeholder="List any products, gear, or brands mentioned..."
                                        >${formData.productsMentioned}</textarea>
                                    </div>
                                </div>
                            </div>

                            <!-- Ad Information -->
                            <div class="mb-8">
                                <h2 class="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-amber-600 flex items-center">
                                    <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                                        <span class="text-amber-700 font-bold">3</span>
                                    </div>
                                    Ad Information
                                </h2>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-gray-700 font-semibold mb-2">Does your episode contain Ads already? *</label>
                                        <div class="flex gap-4">
                                            <label class="flex items-center cursor-pointer bg-gray-50 px-4 py-3 rounded-lg border-2 ${formData.hasAds === 'yes' ? 'border-amber-600' : 'border-gray-300'} hover:border-amber-600 transition-all flex-1">
                                                <input
                                                    type="radio"
                                                    name="hasAds"
                                                    value="yes"
                                                    ${formData.hasAds === 'yes' ? 'checked' : ''}
                                                    onchange="handleInputChange(event); render();"
                                                    class="w-5 h-5"
                                                />
                                                <span class="ml-2 text-gray-700 font-medium">Yes</span>
                                            </label>
                                            <label class="flex items-center cursor-pointer bg-gray-50 px-4 py-3 rounded-lg border-2 ${formData.hasAds === 'no' ? 'border-amber-600' : 'border-gray-300'} hover:border-amber-600 transition-all flex-1">
                                                <input
                                                    type="radio"
                                                    name="hasAds"
                                                    value="no"
                                                    ${formData.hasAds === 'no' ? 'checked' : ''}
                                                    onchange="handleInputChange(event); render();"
                                                    class="w-5 h-5"
                                                />
                                                <span class="ml-2 text-gray-700 font-medium">No</span>
                                            </label>
                                        </div>
                                        ${errors.hasAds ? `<p class="text-red-500 text-sm mt-1">${errors.hasAds}</p>` : ''}
                                    </div>

                                    <div>
                                        <label class="block text-gray-700 font-semibold mb-2">Timestamps (for chapters and ad spots if already in the episode)</label>
                                        <textarea
                                            name="timestamps"
                                            value="${formData.timestamps}"
                                            oninput="handleInputChange(event)"
                                            rows="4"
                                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none transition-all"
                                            placeholder="00:00 - Introduction&#10;05:30 - Ad Spot 1&#10;15:45 - Main Content&#10;45:00 - Ad Spot 2"
                                        >${formData.timestamps}</textarea>
                                    </div>

                                    <div>
                                        <label class="block text-gray-700 font-semibold mb-2">Ad File (if ads are to be added after upload)</label>
                                        <div class="border-2 border-dashed ${adFile ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-lg p-6 text-center hover:border-amber-600 transition-all cursor-pointer">
                                            <input
                                                type="file"
                                                accept="audio/*"
                                                onchange="handleFileChange(event, 'ad')"
                                                class="hidden"
                                                id="adFile"
                                            />
                                            <label for="adFile" class="cursor-pointer">
                                                ${adFile ? `
                                                    <div class="flex items-center justify-center">
                                                        <svg class="w-12 h-12 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                        <div class="text-left">
                                                            <p class="text-gray-800 font-semibold">${adFile.name}</p>
                                                            <p class="text-sm text-gray-500">Click to change</p>
                                                        </div>
                                                    </div>
                                                ` : `
                                                    <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                                                    </svg>
                                                    <p class="text-gray-600">Click to upload ad file (optional)</p>
                                                    <p class="text-sm text-gray-500 mt-1">MP3, WAV</p>
                                                `}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Content & Files -->
                            <div class="mb-8">
                                <h2 class="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-amber-600 flex items-center">
                                    <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                                        <span class="text-amber-700 font-bold">4</span>
                                    </div>
                                    Content & Files
                                </h2>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-gray-700 font-semibold mb-2">Episode Cover Photo</label>
                                        <div class="border-2 border-dashed ${coverPhoto ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-lg p-6 text-center hover:border-amber-600 transition-all cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onchange="handleFileChange(event, 'cover')"
                                                class="hidden"
                                                id="coverPhoto"
                                            />
                                            <label for="coverPhoto" class="cursor-pointer">
                                                ${coverPhoto ? `
                                                    <div class="flex items-center justify-center">
                                                        <svg class="w-12 h-12 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                        <div class="text-left">
                                                            <p class="text-gray-800 font-semibold">${coverPhoto.name}</p>
                                                            <p class="text-sm text-gray-500">Click to change</p>
                                                        </div>
                                                    </div>
                                                ` : `
                                                    <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                    </svg>
                                                    <p class="text-gray-600">Click to upload cover photo</p>
                                                    <p class="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                                                `}
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-gray-700 font-semibold mb-2">Episode Upload Method</label>
                                        <div class="flex gap-4 mb-4">
                                            <label class="flex items-center cursor-pointer bg-gray-50 px-4 py-3 rounded-lg border-2 ${formData.contentMethod === 'drive' ? 'border-amber-600' : 'border-gray-300'} hover:border-amber-600 transition-all flex-1">
                                                <input
                                                    type="radio"
                                                    name="contentMethod"
                                                    value="drive"
                                                    ${formData.contentMethod === 'drive' ? 'checked' : ''}
                                                    onchange="handleInputChange(event); render();"
                                                    class="w-5 h-5"
                                                />
                                                <span class="ml-2 text-gray-700 font-medium">Google Drive File</span>
                                            </label>
                                            <label class="flex items-center cursor-pointer bg-gray-50 px-4 py-3 rounded-lg border-2 ${formData.contentMethod === 'url' ? 'border-amber-600' : 'border-gray-300'} hover:border-amber-600 transition-all flex-1">
                                                <input
                                                    type="radio"
                                                    name="contentMethod"
                                                    value="url"
                                                    ${formData.contentMethod === 'url' ? 'checked' : ''}
                                                    onchange="handleInputChange(event); render();"
                                                    class="w-5 h-5"
                                                />
                                                <span class="ml-2 text-gray-700 font-medium">URL Link</span>
                                            </label>
                                        </div>

                                        ${formData.contentMethod === 'drive' ? `
                                            <div class="border-2 border-dashed ${contentFile ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-lg p-6 text-center hover:border-amber-600 transition-all cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept="audio/*,video/*"
                                                    onchange="handleFileChange(event, 'content')"
                                                    class="hidden"
                                                    id="contentFile"
                                                />
                                                <label for="contentFile" class="cursor-pointer">
                                                    ${contentFile ? `
                                                        <div class="flex items-center justify-center">
                                                            <svg class="w-12 h-12 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            <div class="text-left">
                                                                <p class="text-gray-800 font-semibold">${contentFile.name}</p>
                                                                <p class="text-sm text-gray-500">Click to change</p>
                                                            </div>
                                                        </div>
                                                    ` : `
                                                        <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                                                        </svg>
                                                        <p class="text-gray-600">Click to upload content file</p>
                                                        <p class="text-sm text-gray-500 mt-1">MP3, WAV, MP4 (Note: Large files should use URL method)</p>
                                                    `}
                                                </label>
                                            </div>
                                        ` : `
                                            <div>
                                                <label class="block text-gray-700 font-semibold mb-2">Content File URL</label>
                                                <input
                                                    type="url"
                                                    name="contentUrl"
                                                    value="${formData.contentUrl}"
                                                    oninput="handleInputChange(event)"
                                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none transition-all"
                                                    placeholder="https://drive.google.com/file/d/..."
                                                />
                                            </div>
                                        `}
                                    </div>

                                    <div>
                                        <label class="block text-gray-700 font-semibold mb-2">Is your Content Ready for Review? *</label>
                                        <div class="flex gap-4">
                                            <label class="flex items-center cursor-pointer bg-gray-50 px-4 py-3 rounded-lg border-2 ${formData.contentReady === 'yes' ? 'border-amber-600' : 'border-gray-300'} hover:border-amber-600 transition-all flex-1">
                                                <input
                                                    type="radio"
                                                    name="contentReady"
                                                    value="yes"
                                                    ${formData.contentReady === 'yes' ? 'checked' : ''}
                                                    onchange="handleInputChange(event); render();"
                                                    class="w-5 h-5"
                                                />
                                                <span class="ml-2 text-gray-700 font-medium">Yes</span>
                                            </label>
                                            <label class="flex items-center cursor-pointer bg-gray-50 px-4 py-3 rounded-lg border-2 ${formData.contentReady === 'no' ? 'border-amber-600' : 'border-gray-300'} hover:border-amber-600 transition-all flex-1">
                                                <input
                                                    type="radio"
                                                    name="contentReady"
                                                    value="no"
                                                    ${formData.contentReady === 'no' ? 'checked' : ''}
                                                    onchange="handleInputChange(event); render();"
                                                    class="w-5 h-5"
                                                />
                                                <span class="ml-2 text-gray-700 font-medium">No</span>
                                            </label>
                                        </div>
                                        ${errors.contentReady ? `<p class="text-red-500 text-sm mt-1">${errors.contentReady}</p>` : ''}
                                    </div>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="flex justify-end mt-8">
                                <button
                                    type="submit"
                                    ${isSubmitting ? 'disabled' : ''}
                                    class="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold py-4 px-10 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} transform hover:scale-105 active:scale-95"
                                >
                                    ${isSubmitting ? `
                                        <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        Submitting...
                                    ` : `
                                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                        </svg>
                                        Submit Episode
                                    `}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
        }

        // Initial render
        render();
    </script>
</body>
</html>



