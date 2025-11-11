Skip to content
Navigation Menu
leefus
leefus.github.io

Type / to search
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
Commit 5a0ecd9
leefus
leefus
authored
2 minutes ago
·
·
Verified
AI HELPER README.md
main
1 parent 
781cbb2
 commit 
5a0ecd9
File tree
Filter files…
README.md
1 file changed
+719
-1064
lines changed
Search within code
 
‎README.md‎
+719
-1,064
Lines changed: 719 additions & 1064 deletions


Original file line number	Diff line number	Diff line change
@@ -1,1081 +1,736 @@
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
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, Flame, Zap, Coffee, Trophy, Trash2, Plus, ChevronDown, ChevronRight, Sparkles, Loader, Brain, BarChart3, Target, Calendar } from 'lucide-react';
export default function ClaudePoweredTodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [streak, setStreak] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState(new Set());
  const [analyzingTask, setAnalyzingTask] = useState(false);
  const [breakdownMethod, setBreakdownMethod] = useState('auto');
  // Load and save functions remain the same...
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    saveData();
  }, [tasks, streak, totalCompleted]);
  const loadData = async () => {
    try {
      const tasksData = await window.storage.get('tasks');
      const streakData = await window.storage.get('streak');
      const completedData = await window.storage.get('totalCompleted');
      
      if (tasksData) setTasks(JSON.parse(tasksData.value));
      if (streakData) setStreak(parseInt(streakData.value));
      if (completedData) setTotalCompleted(parseInt(completedData.value));
    } catch (error) {
      console.log('Starting fresh');
    }
  };
  const saveData = async () => {
    try {
      await window.storage.set('tasks', JSON.stringify(tasks));
      await window.storage.set('streak', streak.toString());
      await window.storage.set('totalCompleted', totalCompleted.toString());
    } catch (error) {
      console.error('Save error');
    }
  };
  // Analysis functions remain the same...
  const analyzeTaskWithClaude = async (taskText, method = 'auto') => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const text = taskText.toLowerCase();
    let duration, substeps, strategyUsed = method;
    const taskPatterns = [
      {
        pattern: /presentation.*client|client.*presentation/i,
        type: 'presentation',
        baseDuration: 180,
        getSubsteps: () => [
          { text: 'Research client background and needs', duration: 30, category: 'research' },
          { text: 'Review previous meeting notes and data', duration: 20, category: 'research' },
          { text: 'Create presentation outline with key points', duration: 25, category: 'planning' },
          { text: 'Design slides with company branding', duration: 40, category: 'creation' },
          { text: 'Add charts and data visualizations', duration: 25, category: 'creation' },
          { text: 'Write speaker notes for each slide', duration: 20, category: 'preparation' },
          { text: 'Practice presentation and timing', duration: 15, category: 'practice' },
          { text: 'Final review and polish', duration: 5, category: 'review' }
        ]
      },
      // ... other patterns remain the same
    ];
    const matchedPattern = taskPatterns.find(pattern => pattern.pattern.test(text));
    
    if (matchedPattern) {
      duration = matchedPattern.baseDuration;
      substeps = matchedPattern.getSubsteps();
      strategyUsed = `pattern:${matchedPattern.type}`;
    } else {
      const analysis = analyzeGenericTask(taskText, method);
      duration = analysis.duration;
      substeps = analysis.substeps;
      strategyUsed = analysis.strategy;
    }
    if (method !== 'auto') {
      substeps = applyBreakdownMethod(substeps, method, duration);
    }
    return {
      duration,
      priority: getPriorityLevel(duration),
      substeps: substeps.map((s, i) => ({
        id: `sub-${Date.now()}-${i}`,
        text: s.text,
        duration: s.duration,
        category: s.category || 'general',
        completed: false,
        order: i
      })),
      confidence: 0.85 + Math.random() * 0.1,
      breakdownStrategy: strategyUsed
    };
  };
  const analyzeGenericTask = (taskText, method) => {
    const words = taskText.split(' ');
    const wordCount = words.length;
    const hasMultipleActions = (taskText.match(/\band\b|,\s*then\b|after.*\b/i) || []).length > 0;
    const complexityIndicators = ['research', 'analyze', 'develop', 'create', 'build', 'design', 'plan'].filter(
      word => taskText.toLowerCase().includes(word)
    ).length;
    let baseDuration, baseSubsteps;
    if (wordCount < 5 && complexityIndicators === 0) {
      baseDuration = 15;
      baseSubsteps = [
        { text: 'Understand the task requirements', duration: 3, category: 'analysis' },
        { text: 'Execute the main action', duration: 10, category: 'execution' },
        { text: 'Verify completion and quality', duration: 2, category: 'review' }
      ];
    } else if (wordCount < 10 || complexityIndicators === 1) {
      baseDuration = 45;
      baseSubsteps = [
        { text: 'Research and gather information', duration: 10, category: 'research' },
        { text: 'Plan approach and steps', duration: 10, category: 'planning' },
        { text: 'Execute primary work', duration: 20, category: 'execution' },
        { text: 'Review and make adjustments', duration: 5, category: 'review' }
      ];
    } else {
      baseDuration = 60;
      baseSubsteps = [
        { text: 'Prepare and setup', duration: 10, category: 'preparation' },
        { text: 'Complete main work', duration: 40, category: 'execution' },
        { text: 'Review and finalize', duration: 10, category: 'review' }
      ];
    }
    return {
      duration: baseDuration,
      substeps: baseSubsteps,
      strategy: `generic:${hasMultipleActions ? 'complex' : 'standard'}`
    };
  };
  const applyBreakdownMethod = (substeps, method, totalDuration) => {
    switch (method) {
      case 'time':
        const targetChunkSize = 25;
        const numChunks = Math.ceil(totalDuration / targetChunkSize);
        const chunkDuration = Math.ceil(totalDuration / numChunks);

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
        return Array.from({ length: numChunks }, (_, i) => ({
          text: `Work session ${i + 1} of ${numChunks}`,
          duration: chunkDuration,
          category: 'focused-work'
        }));
      case 'sequential':
        return substeps.map(step => ({
          ...step,
          text: `Step ${substeps.indexOf(step) + 1}: ${step.text}`
        }));
      case 'complexity':
        const complexSteps = substeps.flatMap(step => 
          step.duration > 30 ? [
            { ...step, duration: Math.ceil(step.duration * 0.6), text: `${step.text} (Part 1)` },
            { ...step, duration: Math.ceil(step.duration * 0.4), text: `${step.text} (Part 2)` }
          ] : [step]
        );
        return complexSteps;
      default:
        return substeps;
    }
  };
  const getPriorityLevel = (duration) => {
    if (duration <= 15) return 'quick';
    if (duration <= 60) return 'medium';
    return 'long';
  };
  const addTask = async () => {
    if (!newTask.trim()) return;
    
    setAnalyzingTask(true);
    
    try {
      const analysis = await analyzeTaskWithClaude(newTask, breakdownMethod);
      
      const task = {
        id: Date.now(),
        text: newTask,
        duration: analysis.duration,
        completed: false,
        createdAt: new Date().toISOString(),
        priority: analysis.priority,
        substeps: analysis.substeps,
        aiAnalyzed: true,
        confidence: analysis.confidence,
        breakdownStrategy: analysis.breakdownStrategy,
        categories: [...new Set(analysis.substeps.map(s => s.category))]
      };
      
      setTasks([...tasks, task]);
      setExpandedTasks(new Set([...expandedTasks, task.id]));
      setNewTask('');
    } catch (error) {
      console.error('Analysis failed:', error);
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        duration: 30,
        completed: false,
        priority: 'medium',
        substeps: [
          { id: `sub-${Date.now()}-0`, text: 'Plan and prepare', duration: 10, completed: false, category: 'planning' },
          { id: `sub-${Date.now()}-1`, text: 'Execute main work', duration: 15, completed: false, category: 'execution' },
          { id: `sub-${Date.now()}-2`, text: 'Review and complete', duration: 5, completed: false, category: 'review' }
        ],
        aiAnalyzed: false
      }]);
      setNewTask('');
    } finally {
      setAnalyzingTask(false);
    }
  };
  const toggleSubstep = (taskId, substepId) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId && t.substeps) {
        const newSubs = t.substeps.map(s =>
          s.id === substepId ? { ...s, completed: !s.completed } : s
        );
        
        const completedCount = newSubs.filter(s => s.completed).length;
        const totalCount = newSubs.length;
        const allDone = completedCount === totalCount;
        
        if (allDone && !t.completed) {
          setStreak(streak + 1);
          setTotalCompleted(totalCompleted + 1);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
          return { ...t, substeps: newSubs, completed: true, progress: 100 };
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
        
        return { 
          ...t, 
          substeps: newSubs, 
          progress: Math.round((completedCount / totalCount) * 100) 
        };
      }
      return t;
    }));
  };
  const toggleExpanded = (id) => {
    const n = new Set(expandedTasks);
    n.has(id) ? n.delete(id) : n.add(id);
    setExpandedTasks(n);
  };
  const toggleComplete = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task.completed) {
      setStreak(streak + 1);
      setTotalCompleted(totalCompleted + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    const n = new Set(expandedTasks);
    n.delete(id);
    setExpandedTasks(n);
  };
  const requestBetterBreakdown = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    setAnalyzingTask(true);
    try {
      const analysis = await analyzeTaskWithClaude(task.text, 'complexity');
      
      setTasks(tasks.map(t => 
        t.id === taskId 
          ? { 
              ...t, 
              substeps: analysis.substeps,
              duration: analysis.duration,
              breakdownStrategy: analysis.breakdownStrategy,
              categories: [...new Set(analysis.substeps.map(s => s.category))]
            }
          : t
      ));
    } catch (error) {
      console.error('Re-analysis failed:', error);
    } finally {
      setAnalyzingTask(false);
    }
  };
  const getSortedTasks = () => {
    let filtered = [...tasks];
    if (filter === 'active') filtered = filtered.filter(t => !t.completed);
    if (filter === 'completed') filtered = filtered.filter(t => t.completed);
    if (filter === 'quick') filtered = filtered.filter(t => t.duration <= 15 && !t.completed);
    
    return filtered.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const order = { quick: 0, medium: 1, long: 2 };
      return order[a.priority] - order[b.priority];
    });
  };
  const formatDuration = (min) => {
    if (min < 60) return `${min}m`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };
  const getPriorityIcon = (p) => {
    if (p === 'quick') return <Zap className="w-4 h-4 text-green-500" />;
    if (p === 'medium') return <Clock className="w-4 h-4 text-blue-500" />;
    return <Coffee className="w-4 h-4 text-orange-500" />;
  };
  const totalTimeRemaining = tasks
    .filter(t => !t.completed)
    .reduce((sum, t) => sum + t.duration, 0);
  const completedToday = tasks.filter(t => 
    t.completed && new Date(t.createdAt).toDateString() === new Date().toDateString()
  ).length;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Task Intelligence
                </h1>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  AI-powered task breakdown and time estimation
                </p>
              </div>
            </div>

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
            <div className="flex gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg text-white min-w-20">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className="w-5 h-5" />
                  <span className="font-bold text-lg">{streak}</span>
                </div>
                <div className="text-xs opacity-90">Day Streak</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg text-white min-w-20">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold text-lg">{totalCompleted}</span>
                </div>
                <div className="text-xs opacity-90">Completed</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">{formatDuration(totalTimeRemaining)}</div>
              <div className="text-xs text-blue-600">Remaining Work</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">{tasks.filter(t => !t.completed).length}</div>
              <div className="text-xs text-green-600">Active Tasks</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">{completedToday}</div>
              <div className="text-xs text-purple-600">Today</div>
            </div>
          </div>
        </div>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        )}
        {/* Enhanced Add Task */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              Describe your task for AI analysis
            </label>
            <div className="relative">
              <textarea
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), addTask())}
                placeholder="E.g., 'Create Q4 performance presentation for client meeting with data visualization and executive summary'"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                rows="3"
                disabled={analyzingTask}
              />
              <div className="absolute bottom-3 right-3">
                <span className={`text-xs ${newTask.length > 100 ? 'text-green-600' : 'text-gray-400'}`}>
                  💡 More detail = better analysis
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={addTask}
            disabled={analyzingTask || !newTask.trim()}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 flex items-center justify-center gap-3 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:-translate-y-0.5"
          >
            {analyzingTask ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                AI is analyzing your task...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze & Add Task
                <Zap className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
        {/* Enhanced Breakdown Strategy Selector */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Breakdown Strategy
            </label>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">AI-Powered</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              { value: 'auto', label: 'Auto Smart', desc: 'AI chooses optimal method', icon: Brain },
              { value: 'time', label: 'Time Blocks', desc: '25-min focused sessions', icon: Clock },
              { value: 'sequential', label: 'Step-by-Step', desc: 'Linear progression', icon: ChevronRight },
              { value: 'complexity', label: 'Complexity Focus', desc: 'Break hard parts', icon: Target }
            ].map(({ value, label, desc, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setBreakdownMethod(value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                  breakdownMethod === value 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 bg-white/50 hover:border-blue-300 hover:bg-blue-25'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    breakdownMethod === value 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`font-semibold text-sm ${
                    breakdownMethod === value ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {label}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-tight">{desc}</p>
              </button>
            ))}
          </div>
        </div>
        {/* Enhanced Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'All Tasks', count: tasks.length },
            { key: 'active', label: 'Active', count: tasks.filter(t => !t.completed).length },
            { key: 'quick', label: 'Quick Wins', count: tasks.filter(t => t.duration <= 15 && !t.completed).length },
            { key: 'completed', label: 'Completed', count: tasks.filter(t => t.completed).length }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 min-w-max ${
                filter === key 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white/80 text-gray-600 shadow-sm hover:bg-white hover:shadow-md'
              }`}
            >
              {label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                filter === key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
        {/* Enhanced Tasks List */}
        <div className="space-y-4">
          {getSortedTasks().length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-16 text-center">
              <div className="text-8xl mb-6 opacity-20">🎯</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Add your first task and watch our AI break it down into manageable steps with time estimates.
              </p>
            </div>
          ) : (
            getSortedTasks().map(task => (
              <div 
                key={task.id} 
                className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${
                  task.completed ? 'border-green-200 opacity-75' : 'border-gray-200'
                }`}
              >
                <div className="p-5">
                  {/* Main Task Header */}
                  <div className="flex items-start gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button 
                        onClick={() => toggleComplete(task.id)}
                        className={`flex-shrink-0 mt-1 transition-transform duration-200 hover:scale-110 ${
                          task.completed ? 'text-green-500' : 'text-gray-300 hover:text-blue-500'
                        }`}
                      >
                        {task.completed ? 
                          <CheckCircle2 className="w-6 h-6" /> : 
                          <Circle className="w-6 h-6" />
                        }
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className={`text-lg font-medium leading-tight ${
                            task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                          }`}>
                            {task.text}
                          </p>
                          {task.aiAnalyzed && (
                            <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" title="AI Analyzed" />
                          )}
                        </div>
                        <div class="header-badges">
                            <div class="badge">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg>
                                <span>Professional Review</span>
                        
                        <div className="flex items-center gap-3 flex-wrap mt-2">
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full">
                            {getPriorityIcon(task.priority)}
                            <span className="text-xs font-medium text-blue-700">{formatDuration(task.duration)}</span>
                          </div>
                          
                          {task.substeps && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              {task.substeps.filter(s => s.completed).length}/{task.substeps.length} steps
                            </div>
                            <div class="badge">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Quick Turnaround</span>
                          )}
                          
                          {task.confidence && (
                            <div className="text-xs text-gray-500">
                              AI confidence: {Math.round(task.confidence * 100)}%
                            </div>
                          )}
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
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {task.substeps && (
                        <button 
                          onClick={() => toggleExpanded(task.id)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        >
                          {expandedTasks.has(task.id) ? 
                            <ChevronDown className="w-5 h-5" /> : 
                            <ChevronRight className="w-5 h-5" />
                          }
                        </button>
                      )}
                      
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  {/* Enhanced Substeps */}
                  {task.substeps && expandedTasks.has(task.id) && (
                    <div className="mt-6 ml-9 space-y-3 border-l-2 border-blue-200 pl-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-blue-700">AI-Generated Action Plan</span>
                          <div className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full capitalize">
                            {task.breakdownStrategy?.replace(':', ' • ')}
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
                        <button 
                          onClick={() => requestBetterBreakdown(task.id)}
                          disabled={analyzingTask}
                          className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 disabled:opacity-50 transition-colors duration-200 font-medium"
                        >
                          {analyzingTask ? 'Thinking...' : 'Improve Plan'}
                        </button>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{task.progress || 0}%</span>
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
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${task.progress || 0}%` }}
                          ></div>
                        </div>
                        <!-- Content & Files -->
                        <div class="section">
                            <h2 class="section-header">
                                <span class="section-number">4</span>
                                Content & Files
                            </h2>
                      </div>
                      
                      {/* Substeps List */}
                      <div className="space-y-2">
                        {task.substeps.map((sub, index) => (
                          <div 
                            key={sub.id} 
                            className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-200 ${
                              sub.completed 
                                ? 'bg-green-50 border-green-200 opacity-75' 
                                : 'bg-gray-50/50 border-gray-200 hover:bg-white hover:shadow-sm'
                            }`}
                          >
                            <button 
                              onClick={() => toggleSubstep(task.id, sub.id)}
                              className={`flex-shrink-0 transition-transform duration-200 hover:scale-110 ${
                                sub.completed ? 'text-green-500' : 'text-gray-300 hover:text-blue-500'
                              }`}
                            >
                              {sub.completed ? 
                                <CheckCircle2 className="w-5 h-5" /> : 
                                <Circle className="w-5 h-5" />
                              }
                            </button>
                            
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
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm leading-tight ${
                                sub.completed ? 'line-through text-gray-400' : 'text-gray-700'
                              }`}>
                                {sub.text}
                              </p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                                  {sub.category}
                                </span>
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
                            
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full">
                                <Clock className="w-3 h-3 text-blue-600" />
                                <span className="text-xs font-medium text-blue-700">{formatDuration(sub.duration)}</span>
                              </div>
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
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        {/* Enhanced Feature Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-200 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 mb-3 text-lg">AI Task Intelligence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-800">Automatic time estimation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-800">Intelligent step breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-800">Multiple strategy options</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-800">Progress tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

        render();
    </script>
</body>
</html>
0 commit comments
Comments
0
 (0)
Comment
You're not receiving notifications from this thread.

AI HELPER README.md · leefus/leefus.github.io@5a0ecd9There are no files selected for viewing
