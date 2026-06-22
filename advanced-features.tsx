// ============================================================================
// ADVANCED FEATURES & PAGES
// ============================================================================

// ============================================================================
// 1. AI Nutrition Assistant (pages/AIAssistant.tsx)
// ============================================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const AIAssistant = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      type: 'assistant',
      content: 'Hello! I\'m your AI Nutrition Assistant. I can help you with meal recommendations, nutrition advice, and personalized guidance. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    '🍗 Suggest a high-protein meal under 500 calories',
    '💪 How can I gain muscle weight healthily?',
    '🥗 Create a vegetarian meal plan',
    '⚖️ What\'s my ideal daily protein intake?',
    '🏃 Best meals for post-workout recovery',
    '🌙 Healthy late-night snacks',
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate API call to AI
    setTimeout(() => {
      const responses = [
        'Based on your goals, I recommend Grilled Paneer with Brown Rice and Steamed Broccoli. This provides 45g protein, 55g carbs, and 12g fat for approximately 450 calories.',
        'For muscle gain, focus on: 1. High protein intake (1.6-2.2g per kg body weight), 2. Caloric surplus (200-300 above maintenance), 3. Regular strength training.',
        'Here\'s a balanced vegetarian meal plan: Breakfast (Oats with nuts), Lunch (Dal with Rice), Dinner (Paneer Curry with Roti), Snacks (Greek Yogurt with fruits).',
        'Your ideal protein intake is approximately 120-150g daily based on your weight and activity level. Spread this across 4-5 meals for optimal muscle protein synthesis.',
        'Post-workout meals should contain protein and carbs: Chicken with Sweet Potato, or Paneer with Rice, consumed within 1-2 hours after exercise.',
        'Healthy late-night snacks: Greek Yogurt, Almonds, Protein shake, Cottage Cheese, or Berries. Avoid heavy and high-fat foods.',
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [
        ...prev,
        { type: 'assistant', content: randomResponse }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-gray-900 mb-2">🤖 AI Nutrition Assistant</h1>
        <p className="text-gray-600">Get personalized nutrition advice powered by artificial intelligence</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          {/* Chat Messages */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 h-96 overflow-y-auto mb-6">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about nutrition..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700"
            >
              Send
            </motion.button>
          </div>
        </motion.div>

        {/* Suggested Questions */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 sticky top-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Questions</h3>
            <div className="space-y-3">
              {suggestedQuestions.map((question, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setInput(question);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 text-sm font-medium text-gray-900 transition-colors"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// 2. Meal Planner Page (pages/MealPlanner.tsx)
// ============================================================================

export const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [preferences, setPreferences] = useState({
    duration: 'weekly',
    dietType: 'balanced',
    calorieTarget: 2000,
    allergies: '',
  });

  const generateMealPlan = async () => {
    setGenerating(true);
    // Simulate meal plan generation
    setTimeout(() => {
      const plan = {
        Monday: [
          { meal: 'Breakfast', dish: 'Idli with Sambar', calories: 250 },
          { meal: 'Lunch', dish: 'Biryani with Raita', calories: 600 },
          { meal: 'Dinner', dish: 'Dal Makhani with Naan', calories: 450 },
        ],
        Tuesday: [
          { meal: 'Breakfast', dish: 'Upma with Chutney', calories: 300 },
          { meal: 'Lunch', dish: 'Paneer Tikka with Rice', calories: 550 },
          { meal: 'Dinner', dish: 'Rajma with Chawal', calories: 400 },
        ],
        Wednesday: [
          { meal: 'Breakfast', dish: 'Poha', calories: 280 },
          { meal: 'Lunch', dish: 'Chole Bhature', calories: 620 },
          { meal: 'Dinner', dish: 'Fish Curry with Rice', calories: 480 },
        ],
        Thursday: [
          { meal: 'Breakfast', dish: 'Masala Dosa', calories: 320 },
          { meal: 'Lunch', dish: 'Butter Chicken with Naan', calories: 580 },
          { meal: 'Dinner', dish: 'Sambar Rice', calories: 400 },
        ],
        Friday: [
          { meal: 'Breakfast', dish: 'Medhu Vada with Chutney', calories: 290 },
          { meal: 'Lunch', dish: 'Prawn Curry with Rice', calories: 520 },
          { meal: 'Dinner', dish: 'Chikhalwali with Chapati', calories: 420 },
        ],
        Saturday: [
          { meal: 'Breakfast', dish: 'Uttapam', calories: 310 },
          { meal: 'Lunch', dish: 'Tandoori Chicken with Rice', calories: 590 },
          { meal: 'Dinner', dish: 'Aloo Gobi with Roti', calories: 380 },
        ],
        Sunday: [
          { meal: 'Breakfast', dish: 'Khichdi with Pickle', calories: 300 },
          { meal: 'Lunch', dish: 'Vegetable Biryani', calories: 550 },
          { meal: 'Dinner', dish: 'Dal Chawal', calories: 420 },
        ],
      };
      setMealPlan(plan);
      setGenerating(false);
    }, 2000);
  };

  const days = Object.keys(mealPlan || {});

  return (
    <motion.div
      className="p-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-gray-900 mb-2">📅 Meal Planner</h1>
        <p className="text-gray-600">Generate personalized meal plans based on your goals and preferences</p>
      </motion.div>

      {!mealPlan ? (
        <motion.div
          className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Meal Plan</h2>

          <div className="space-y-6">
            {/* Duration */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Duration</label>
              <div className="flex gap-3">
                {['weekly', 'monthly'].map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setPreferences({ ...preferences, duration: option })}
                    className={`px-6 py-2 rounded-lg font-bold capitalize transition-colors ${
                      preferences.duration === option
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Diet Type */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Diet Type</label>
              <select
                value={preferences.dietType}
                onChange={(e) => setPreferences({ ...preferences, dietType: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
              >
                <option value="balanced">Balanced</option>
                <option value="highprotein">High Protein</option>
                <option value="lowcarb">Low Carb</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            {/* Calorie Target */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Daily Calorie Target</label>
              <input
                type="number"
                value={preferences.calorieTarget}
                onChange={(e) => setPreferences({ ...preferences, calorieTarget: Number(e.target.value) })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateMealPlan}
              disabled={generating}
              className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-50"
            >
              {generating ? 'Generating Your Plan...' : 'Generate Meal Plan'}
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {days.map((day, dayIdx) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIdx * 0.1 }}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">{day}</h3>
                <div className="space-y-4">
                  {mealPlan[day].map((item: any, idx: number) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="p-3 bg-emerald-50 rounded-lg border-l-4 border-emerald-500"
                    >
                      <p className="text-sm font-bold text-emerald-700">{item.meal}</p>
                      <p className="text-sm text-gray-900 font-medium mt-1">{item.dish}</p>
                      <p className="text-xs text-gray-600 mt-1">{item.calories} cal</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMealPlan(null)}
            className="mt-8 px-8 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 mx-auto block"
          >
            Generate New Plan
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

// ============================================================================
// 3. Authentication Component (components/AuthFlow.tsx)
// ============================================================================

import { useState } from 'react';

export const AuthFlow = ({ onAuthSuccess }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          ...(isLogin ? {} : { name }),
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      onAuthSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // Implement Google Sign-In
    console.log('Google Sign-In clicked');
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <motion.h1 className="text-3xl font-black text-emerald-600 mb-2 text-center">🥗 NutriAI</motion.h1>
        <p className="text-gray-600 text-center mb-8">Your AI-Powered Nutrition Companion</p>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {!isLogin && (
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
          />

          {error && <p className="text-red-600 text-sm font-bold">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
          </motion.button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300" />
          <p className="text-gray-600 text-sm">or</p>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoogleSignIn}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-bold text-gray-900 hover:bg-gray-50"
        >
          🔐 Sign in with Google
        </motion.button>

        <p className="text-center text-gray-600 text-sm mt-6">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-600 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// 4. Achievements Page (pages/Achievements.tsx)
// ============================================================================

export const Achievements = () => {
  const achievements = [
    { icon: '🔥', title: '7-Day Streak', desc: 'Log meals for 7 consecutive days', unlocked: true },
    { icon: '🏆', title: '30-Day Consistency', desc: 'Log meals for 30 consecutive days', unlocked: false },
    { icon: '💪', title: 'Protein Goal Master', desc: 'Meet your protein goal 10 times', unlocked: true },
    { icon: '💧', title: 'Water Goal Master', desc: 'Complete water intake goal 7 times', unlocked: false },
    { icon: '📊', title: 'Analytics Enthusiast', desc: 'Check your analytics 20 times', unlocked: true },
    { icon: '🥗', title: 'Foodie Explorer', desc: 'Try 50 different dishes', unlocked: false },
    { icon: '⚖️', title: 'Weight Goal Achieved', desc: 'Reach your target weight', unlocked: false },
    { icon: '🤖', title: 'AI Advisor Fan', desc: 'Ask the AI assistant 10 questions', unlocked: true },
  ];

  return (
    <motion.div
      className="p-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-gray-900 mb-2">🏆 Achievements</h1>
        <p className="text-gray-600">Unlock achievements and track your progress</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl text-center border-2 transition-all ${
              achievement.unlocked
                ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-amber-300'
                : 'bg-gray-50 border-gray-300 opacity-50'
            }`}
          >
            <motion.div
              className="text-5xl mb-3"
              animate={achievement.unlocked ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {achievement.icon}
            </motion.div>
            <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
            <p className="text-sm text-gray-600">{achievement.desc}</p>
            {achievement.unlocked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3 text-xs font-bold text-amber-600"
              >
                ✓ Unlocked
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};