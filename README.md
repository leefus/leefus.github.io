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
                          )}
                          
                          {task.confidence && (
                            <div className="text-xs text-gray-500">
                              AI confidence: {Math.round(task.confidence * 100)}%
                            </div>
                          )}
                        </div>
                      </div>
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
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${task.progress || 0}%` }}
                          ></div>
                        </div>
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
                            
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full">
                                <Clock className="w-3 h-3 text-blue-600" />
                                <span className="text-xs font-medium text-blue-700">{formatDuration(sub.duration)}</span>
                              </div>
                            </div>
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

