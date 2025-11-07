<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Episode Submission Form</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #3d2d1e;
            color: #333;
            line-height: 1.6;
        }

        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
            from { transform: scale(0); }
            to { transform: scale(1); }
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .fade-in {
            animation: fadeIn 0.5s ease-out;
        }

        .scale-in {
            animation: scaleIn 0.3s ease-out 0.2s both;
        }

        .spinner {
            animation: spin 1s linear infinite;
        }

        /* Background */
        .background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0,0,0,0.2), transparent, rgba(0,0,0,0.2));
            z-index: 1;
        }

        /* Paper Tear Sidebar */
        .paper-tear {
            position: fixed;
            left: 0;
            top: 0;
            width: 96px;
            height: 100%;
            background-image: url('https://i.imgur.com/3A92mAW.png');
            background-size: cover;
            background-position: right center;
            background-repeat: repeat-y;
            filter: drop-shadow(4px 0 8px rgba(0,0,0,0.3));
            z-index: 20;
        }

        .paper-tear-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.1));
        }

        /* Container */
        .container {
            position: relative;
            z-index: 10;
            max-width: 896px;
            margin: 0 auto;
            padding: 32px 16px;
            min-height: 100vh;
        }

        /* Header */
        .header {
            background: linear-gradient(to right, #92400e, #78350f);
            border-radius: 8px 8px 0 0;
            padding: 32px;
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
            position: relative;
            overflow: hidden;
            border-bottom: 4px solid #d97706;
        }

        .header-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, rgba(120, 53, 15, 0.8), rgba(146, 64, 14, 0.8));
        }

        .header-content {
            position: relative;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
        }

        .header-icon {
            background-color: #b45309;
            border-radius: 50%;
            padding: 12px;
            margin-right: 16px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .header-icon svg {
            width: 32px;
            height: 32px;
            color: white;
        }

        .header-title {
            color: white;
        }

        .header-title h1 {
            font-size: 36px;
            font-weight: bold;
            margin: 0;
        }

        .header-title p {
            color: #fef3c7;
            margin-top: 4px;
        }

        .header-badges {
            position: relative;
            z-index: 10;
            display: flex;
            justify-content: center;
            gap: 24px;
            color: #fef3c7;
            font-size: 14px;
            margin-top: 24px;
        }

        .badge {
            display: flex;
            align-items: center;
        }

        .badge svg {
            width: 16px;
            height: 16px;
            margin-right: 4px;
        }

        /* Form */
        .form {
            background: white;
            border-radius: 0 0 8px 8px;
            padding: 32px;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }

        .section {
            margin-bottom: 32px;
        }

        .section-header {
            display: flex;
            align-items: center;
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 2px solid #d97706;
        }

        .section-number {
            width: 32px;
            height: 32px;
            background-color: #fef3c7;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            color: #b45309;
            font-weight: bold;
        }

        /* Form Fields */
        .field {
            margin-bottom: 16px;
        }

        .label {
            display: block;
            color: #374151;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .input, .textarea, .select {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #d1d5db;
            border-radius: 8px;
            font-size: 16px;
            transition: all 0.3s;
        }

        .input:focus, .textarea:focus, .select:focus {
            outline: none;
            border-color: #d97706;
        }

        .input.error, .textarea.error {
            border-color: #ef4444;
        }

        .error-message {
            color: #ef4444;
            font-size: 14px;
            margin-top: 4px;
        }

        .grid {
            display: grid;
            gap: 16px;
        }

        @media (min-width: 768px) {
            .grid-2 {
                grid-template-columns: repeat(2, 1fr);
            }

            .col-span-2 {
                grid-column: span 2;
            }
        }

        /* Radio Buttons */
        .radio-group {
            display: flex;
            gap: 16px;
        }

        .radio-option {
            flex: 1;
            display: flex;
            align-items: center;
            background-color: #f9fafb;
            padding: 12px 16px;
            border-radius: 8px;
            border: 2px solid #d1d5db;
            cursor: pointer;
            transition: all 0.3s;
        }

        .radio-option:hover {
            border-color: #d97706;
        }

        .radio-option.selected {
            border-color: #d97706;
            background-color: #fef3c7;
        }

        .radio-option input[type="radio"] {
            width: 20px;
            height: 20px;
            margin-right: 8px;
        }

        .radio-option label {
            font-weight: 500;
            cursor: pointer;
        }

        /* File Upload */
        .file-upload {
            border: 2px dashed #d1d5db;
            border-radius: 8px;
            padding: 24px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        }

        .file-upload:hover {
            border-color: #d97706;
        }

        .file-upload.has-file {
            border-color: #10b981;
            background-color: #f0fdf4;
            border-style: solid;
        }

        .file-upload input[type="file"] {
            display: none;
        }

        .file-upload svg {
            width: 48px;
            height: 48px;
            color: #9ca3af;
            margin: 0 auto 8px;
        }

        .file-upload.has-file svg {
            color: #10b981;
        }

        .file-name {
            color: #1f2937;
            font-weight: 600;
        }

        .file-hint {
            color: #6b7280;
            font-size: 14px;
            margin-top: 4px;
        }

        /* Submit Button */
        .submit-section {
            display: flex;
            justify-content: flex-end;
            margin-top: 32px;
        }

        .submit-btn {
            background: linear-gradient(to right, #b45309, #92400e);
            color: white;
            font-weight: bold;
            padding: 16px 40px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            transition: all 0.3s;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            font-size: 16px;
        }

        .submit-btn:hover:not(:disabled) {
            background: linear-gradient(to right, #92400e, #78350f);
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
            transform: scale(1.05);
        }

        .submit-btn:active:not(:disabled) {
            transform: scale(0.95);
        }

        .submit-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .submit-btn svg {
            width: 20px;
            height: 20px;
            margin-right: 12px;
        }

        /* Success Screen */
        .success-screen {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 16px;
        }

        .success-card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
            padding: 32px;
            max-width: 448px;
            width: 100%;
            text-align: center;
        }

        .success-icon {
            width: 80px;
            height: 80px;
            background-color: #d1fae5;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
        }

        .success-icon svg {
            width: 48px;
            height: 48px;
            color: #10b981;
        }

        .success-title {
            font-size: 30px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 8px;
        }

        .success-message {
            color: #6b7280;
            margin-bottom: 24px;
        }

        .success-email {
            background-color: #fef3c7;
            border: 1px solid #fcd34d;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
        }

        .success-email strong {
            color: #78350f;
        }

        .reset-btn {
            background-color: #b45309;
            color: white;
            font-weight: 600;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .reset-btn:hover {
            background-color: #92400e;
            transform: scale(1.05);
        }

        /* Info Box */
        .info-box {
            background: linear-gradient(to right, #fef3c7, #fde68a);
            border-left: 4px solid #d97706;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-top: 24px;
        }

        .info-box h3 {
            color: #1f2937;
            font-weight: bold;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
        }

        .info-icon {
            width: 20px;
            height: 20px;
            background-color: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
        }

        .info-icon svg {
            width: 16px;
            height: 16px;
            color: white;
        }

        .info-box p {
            color: #374151;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 8px;
        }

        .info-box code {
            background-color: white;
            padding: 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            display: block;
            margin-top: 8px;
            overflow-x: auto;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .paper-tear {
                display: none;
            }

            .container {
                padding: 16px 8px;
            }

            .form {
                padding: 16px;
            }

            .header {
                padding: 24px 16px;
            }

            .header-content {
                flex-direction: column;
                text-align: center;
            }

            .header-icon {
                margin-right: 0;
                margin-bottom: 12px;
            }

            .header-title h1 {
                font-size: 28px;
            }

            .radio-group {
                flex-direction: column;
            }
        }

        @media (min-width: 1024px) {
            .container {
                margin-left: 128px;
            }
        }
    </style>
</head>
<body>
    <div class="background"></div>
    <div class="paper-tear">
        <div class="paper-tear-overlay"></div>
    </div>

    <div id="app"></div>

    <script>
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

        async function handleSubmit(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                render();
                const firstError = document.querySelector('.error');
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

        function render() {
            const app = document.getElementById('app');
            
            if (submitted) {
                app.innerHTML = `
                    <div class="success-screen fade-in">
                        <div class="success-card">
                            <div class="success-icon">
                                <svg class="scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 class="success-title">Submission Received!</h2>
                            <p class="success-message">
                                Thank you for submitting your podcast episode. We'll review it and get back to you soon.
                            </p>
                            <div class="success-email">
                                <p style="font-size: 14px; color: #78350f;">
                                    <strong>📧 Confirmation sent to:</strong><br>
                                    ${formData.email}
                                </p>
                            </div>
                            <button onclick="resetForm()" class="reset-btn">
                                Submit Another Episode
                            </button>
                        </div>
                    </div>
                `;
                return;
            }
            
            app.innerHTML = `
                <div class="container">
                    <div class="header">
                        <div class="header-overlay"></div>
                        <div class="header-content">
                            <div class="header-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                </svg>
                            </div>
                            <div class="header-title">
                                <h1>Episode Submission</h1>
                                <p>Submit your outdoor adventure content for review</p>
                            </div>
                        </div>
                        <div class="header-badges">
                            <div class="badge">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg>
                                <span>Professional Review</span>
                            </div>
                            <div class="badge">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Quick Turnaround</span>
                            </div>
                        </div>
                    </div>

                    <form onsubmit="handleSubmit(event)" class="form">
                        <!-- Contact Information -->
                        <div class="section">
                            <h2 class="section-header">
                                <span class="section-number">1</span>
                                Contact Information
                            </h2>
                            <div class="field">
                                <label class="label">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value="${formData.email}"
                                    oninput="handleInputChange(event)"
                                    class="input ${errors.email ? 'error' : ''}"
                                    placeholder="your.email@example.com"
                                />
                                ${errors.email ? `<p class="error-message">${errors.email}</p>` : ''}
                            </div>
                        </div>

                        <!-- Episode Details -->
                        <div class="section">
                            <h2 class="section-header">
                                <span class="section-number">2</span>
                                Episode Details
                            </h2>
                            <div class="grid grid-2">
                                <div class="field col-span-2">
                                    <label class="label">Podcast or Show Name *</label>
                                    <input
                                        type="text"
                                        name="podcastName"
                                        value="${formData.podcastName}"
                                        oninput="handleInputChange(event)"
                                        class="input ${errors.podcastName ? 'error' : ''}"
                                        placeholder="The Outdoor Adventure Podcast"
                                    />
                                    ${errors.podcastName ? `<p class="error-message">${errors.podcastName}</p>` : ''}
                                </div>
                                
                                <div class="field col-span-2">
                                    <label class="label">Episode Title *</label>
                                    <input
                                        type="text"
                                        name="episodeTitle"
                                        value="${formData.episodeTitle}"
                                        oninput="handleInputChange(event)"
                                        class="input ${errors.episodeTitle ? 'error' : ''}"
                                        placeholder="Hunting the Backcountry"
                                    />
                                    ${errors.episodeTitle ? `<p class="error-message">${errors.episodeTitle}</p>` : ''}
                                </div>

                                <div class="field">
                                    <label class="label">Season</label>
                                    <input
                                        type="text"
                                        name="season"
                                        value="${formData.season}"
                                        oninput="handleInputChange(event)"
                                        class="input"
                                        placeholder="Season 2"
                                    />
                                </div>

                                <div class="field">
                                    <label class="label">Episode Number</label>
                                    <input
                                        type="text"
                                        name="episodeNumber"
                                        value="${formData.episodeNumber}"
                                        oninput="handleInputChange(event)"
                                        class="input"
                                        placeholder="Episode 15"
                                    />
                                </div>

                                <div class="field">
                                    <label class="label">Release Date</label>
                                    <input
                                        type="date"
                                        name="releaseDate"
                                        value="${formData.releaseDate}"
                                        oninput="handleInputChange(event)"
                                        class="input"
                                    />
                                </div>

                                <div class="field">
                                    <label class="label">Guests</label>
                                    <input
                                        type="text"
                                        name="guests"
                                        value="${formData.guests}"
                                        oninput="handleInputChange(event)"
                                        class="input"
                                        placeholder="John Doe, Jane Smith"
                                    />
                                </div>

                                <div class="field col-span-2">
                                    <label class="label">Episode Description *</label>
                                    <textarea
                                        name="description"
                                        oninput="handleInputChange(event)"
                                        rows="4"
                                        class="textarea ${errors.description ? 'error' : ''}"
                                        placeholder="Describe your episode..."
                                    >${formData.description}</textarea>
                                    ${errors.description ? `<p class="error-message">${errors.description}</p>` : ''}
                                </div>

                                <div class="field col-span-2">
                                    <label class="label">Products Mentioned</label>
                                    <textarea
                                        name="productsMentioned"
                                        oninput="handleInputChange(event)"
                                        rows="3"
                                        class="textarea"
                                        placeholder="List any products, gear, or brands mentioned..."
                                    >${formData.productsMentioned}</textarea>
                                </div>
                            </div>
                        </div>

                        <!-- Ad Information -->
                        <div class="section">
                            <h2 class="section-header">
                                <span class="section-number">3</span>
                                Ad Information
                            </h2>
                            <div class="field">
                                <label class="label">Does your episode contain Ads already? *</label>
                                <div class="radio-group">
                                    <div class="radio-option ${formData.hasAds === 'yes' ? 'selected' : ''}" onclick="formData.hasAds='yes'; delete errors.hasAds; render();">
                                        <input type="radio" name="hasAds" value="yes" ${formData.hasAds === 'yes' ? 'checked' : ''}>
                                        <label>Yes</label>
                                    </div>
                                    <div class="radio-option ${formData.hasAds === 'no' ? 'selected' : ''}" onclick="formData.hasAds='no'; delete errors.hasAds; render();">
                                        <input type="radio" name="hasAds" value="no" ${formData.hasAds === 'no' ? 'checked' : ''}>
                                        <label>No</label>
                                    </div>
                                </div>
                                ${errors.hasAds ? `<p class="error-message">${errors.hasAds}</p>` : ''}
                            </div>

                            <div class="field">
                                <label class="label">Timestamps (for chapters and ad spots if already in the episode)</label>
                                <textarea
                                    name="timestamps"
                                    oninput="handleInputChange(event)"
                                    rows="4"
                                    class="textarea"
                                    placeholder="00:00 - Introduction&#10;05:30 - Ad Spot 1&#10;15:45 - Main Content&#10;45:00 - Ad Spot 2"
                                >${formData.timestamps}</textarea>
                            </div>

                            <div class="field">
                                <label class="label">Ad File (if ads are to be added after upload)</label>
                                <div class="file-upload ${adFile ? 'has-file' : ''}" onclick="document.getElementById('adFile').click()">
                                    <input
                                        type="file"
                                        accept="audio/*"
                                        onchange="handleFileChange(event, 'ad')"
                                        id="adFile"
                                    />
                                    ${adFile ? `
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <p class="file-name">${adFile.name}</p>
                                        <p class="file-hint">Click to change</p>
                                    ` : `
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                                        </svg>
                                        <p>Click to upload ad file (optional)</p>
                                        <p class="file-hint">MP3, WAV</p>
                                    `}
                                </div>
                            </div>
                        </div>

                        <!-- Content & Files -->
                        <div class="section">
                            <h2 class="section-header">
                                <span class="section-number">4</span>
                                Content & Files
                            </h2>
                            
                            <div class="field">
                                <label class="label">Episode Cover Photo</label>
                                <div class="file-upload ${coverPhoto ? 'has-file' : ''}" onclick="document.getElementById('coverPhoto').click()">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onchange="handleFileChange(event, 'cover')"
                                        id="coverPhoto"
                                    />
                                    ${coverPhoto ? `
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <p class="file-name">${coverPhoto.name}</p>
                                        <p class="file-hint">Click to change</p>
                                    ` : `
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <p>Click to upload cover photo</p>
                                        <p class="file-hint">PNG, JPG up to 10MB</p>
                                    `}
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Episode Upload Method</label>
                                <div class="radio-group">
                                    <div class="radio-option ${formData.contentMethod === 'drive' ? 'selected' : ''}" onclick="formData.contentMethod='drive'; render();">
                                        <input type="radio" name="contentMethod" value="drive" ${formData.contentMethod === 'drive' ? 'checked' : ''}>
                                        <label>Google Drive File</label>
                                    </div>
                                    <div class="radio-option ${formData.contentMethod === 'url' ? 'selected' : ''}" onclick="formData.contentMethod='url'; render();">
                                        <input type="radio" name="contentMethod" value="url" ${formData.contentMethod === 'url' ? 'checked' : ''}>
                                        <label>URL Link</label>
                                    </div>
                                </div>
                            </div>

                            ${formData.contentMethod === 'drive' ? `
                                <div class="field">
                                    <div class="file-upload ${contentFile ? 'has-file' : ''}" onclick="document.getElementById('contentFile').click()">
                                        <input
                                            type="file"
                                            accept="audio/*,video/*"
                                            onchange="handleFileChange(event, 'content')"
                                            id="contentFile"
                                        />
                                        ${contentFile ? `
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p class="file-name">${contentFile.name}</p>
                                            <p class="file-hint">Click to change</p>
                                        ` : `
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                                            </svg>
                                            <p>Click to upload content file</p>
                                            <p class="file-hint">MP3, WAV, MP4 (Large files should use URL method)</p>
                                        `}
                                    </div>
                                </div>
                            ` : `
                                <div class="field">
                                    <label class="label">Content File URL</label>
                                    <input
                                        type="url"
                                        name="contentUrl"
                                        value="${formData.contentUrl}"
                                        oninput="handleInputChange(event)"
                                        class="input"
                                        placeholder="https://drive.google.com/file/d/..."
                                    />
                                </div>
                            `}

                            <div class="field">
                                <label class="label">Is your Content Ready for Review? *</label>
                                <div class="radio-group">
                                    <div class="radio-option ${formData.contentReady === 'yes' ? 'selected' : ''}" onclick="formData.contentReady='yes'; delete errors.contentReady; render();">
                                        <input type="radio" name="contentReady" value="yes" ${formData.contentReady === 'yes' ? 'checked' : ''}>
                                        <label>Yes</label>
                                    </div>
                                    <div class="radio-option ${formData.contentReady === 'no' ? 'selected' : ''}" onclick="formData.contentReady='no'; delete errors.contentReady; render();">
                                        <input type="radio" name="contentReady" value="no" ${formData.contentReady === 'no' ? 'checked' : ''}>
                                        <label>No</label>
                                    </div>
                                </div>
                                ${errors.contentReady ? `<p class="error-message">${errors.contentReady}</p>` : ''}
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="submit-section">
                            <button
                                type="submit"
                                ${isSubmitting ? 'disabled' : ''}
                                class="submit-btn"
                            >
                                ${isSubmitting ? `
                                    <svg class="spinner" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"></circle>
                                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"></path>
                                    </svg>
                                    Submitting...
                                ` : `
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                    </svg>
                                    Submit Episode
                                `}
                            </button>
                        </div>
                    </form>

                    <!-- Info Box -->
            `;
        }

        render();
    </script>
</body>
</html>
