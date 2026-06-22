// ============================================================================
// BACKEND API & DATABASE CONFIGURATION
// ============================================================================

// ============================================================================
// 1. MongoDB Models (models/index.ts)
// ============================================================================

import mongoose from 'mongoose';

// User Schema
const UserSchema = new mongoose.Schema({
  uid: String,
  email: String,
  name: String,
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  activityLevel: String,
  fitnessGoal: String,
  dailyCalorieGoal: { type: Number, default: 2000 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Meal Schema
const MealSchema = new mongoose.Schema({
  userId: String,
  dish: String,
  state: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
  fiber: Number,
  sodium: Number,
  cholesterol: Number,
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'] },
  servings: { type: Number, default: 1 },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

// Water Log Schema
const WaterLogSchema = new mongoose.Schema({
  userId: String,
  amount: Number, // in ml
  timestamp: { type: Date, default: Date.now },
  date: Date,
});

// Weight Log Schema
const WeightLogSchema = new mongoose.Schema({
  userId: String,
  weight: Number, // in kg
  date: { type: Date, default: Date.now },
  bodyFat: Number,
  notes: String,
});

// Meal Plan Schema
const MealPlanSchema = new mongoose.Schema({
  userId: String,
  weekStartDate: Date,
  days: [
    {
      date: Date,
      meals: [
        {
          mealType: String,
          dish: String,
          calories: Number,
          protein: Number,
          carbs: Number,
          fats: Number,
        },
      ],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

// Achievement Schema
const AchievementSchema = new mongoose.Schema({
  userId: String,
  type: String, // '7-day-streak', '30-day-streak', 'protein-goal', 'water-goal'
  unlockedAt: { type: Date, default: Date.now },
  progress: Number,
});

export const models = {
  User: mongoose.model('User', UserSchema),
  Meal: mongoose.model('Meal', MealSchema),
  WaterLog: mongoose.model('WaterLog', WaterLogSchema),
  WeightLog: mongoose.model('WeightLog', WeightLogSchema),
  MealPlan: mongoose.model('MealPlan', MealPlanSchema),
  Achievement: mongoose.model('Achievement', AchievementSchema),
};

// ============================================================================
// 2. API Routes (api/routes.ts)
// ============================================================================

// Authentication Routes
export const authRoutes = {
  // POST /api/auth/register
  register: async (email: string, password: string, name: string) => {
    // Firebase Authentication implementation
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    return response.json();
  },

  // POST /api/auth/login
  login: async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // POST /api/auth/logout
  logout: async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    return response.json();
  },

  // POST /api/auth/google
  googleSignIn: async (idToken: string) => {
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
    return response.json();
  },
};

// Meal Routes
export const mealRoutes = {
  // GET /api/meals
  getMeals: async (userId: string, date?: Date) => {
    const query = date ? `?date=${date}` : '';
    const response = await fetch(`/api/meals/${userId}${query}`);
    return response.json();
  },

  // POST /api/meals
  addMeal: async (mealData: any) => {
    const response = await fetch('/api/meals', {
      method: 'POST',
      body: JSON.stringify(mealData),
    });
    return response.json();
  },

  // PUT /api/meals/:id
  updateMeal: async (mealId: string, mealData: any) => {
    const response = await fetch(`/api/meals/${mealId}`, {
      method: 'PUT',
      body: JSON.stringify(mealData),
    });
    return response.json();
  },

  // DELETE /api/meals/:id
  deleteMeal: async (mealId: string) => {
    const response = await fetch(`/api/meals/${mealId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// Water Routes
export const waterRoutes = {
  // GET /api/water
  getWaterLogs: async (userId: string, date?: Date) => {
    const query = date ? `?date=${date}` : '';
    const response = await fetch(`/api/water/${userId}${query}`);
    return response.json();
  },

  // POST /api/water
  addWaterLog: async (waterData: any) => {
    const response = await fetch('/api/water', {
      method: 'POST',
      body: JSON.stringify(waterData),
    });
    return response.json();
  },
};

// Weight Routes
export const weightRoutes = {
  // GET /api/weight
  getWeightLogs: async (userId: string) => {
    const response = await fetch(`/api/weight/${userId}`);
    return response.json();
  },

  // POST /api/weight
  addWeightLog: async (weightData: any) => {
    const response = await fetch('/api/weight', {
      method: 'POST',
      body: JSON.stringify(weightData),
    });
    return response.json();
  },
};

// Meal Plan Routes
export const mealPlanRoutes = {
  // GET /api/meal-plans
  getMealPlans: async (userId: string) => {
    const response = await fetch(`/api/meal-plans/${userId}`);
    return response.json();
  },

  // POST /api/meal-plans/generate
  generateMealPlan: async (userId: string, preferences: any) => {
    const response = await fetch('/api/meal-plans/generate', {
      method: 'POST',
      body: JSON.stringify({ userId, ...preferences }),
    });
    return response.json();
  },
};

// Analytics Routes
export const analyticsRoutes = {
  // GET /api/analytics/daily
  getDailyReport: async (userId: string, date: Date) => {
    const response = await fetch(`/api/analytics/daily/${userId}?date=${date}`);
    return response.json();
  },

  // GET /api/analytics/weekly
  getWeeklyReport: async (userId: string, weekStart: Date) => {
    const response = await fetch(`/api/analytics/weekly/${userId}?weekStart=${weekStart}`);
    return response.json();
  },

  // GET /api/analytics/monthly
  getMonthlyReport: async (userId: string, month: string) => {
    const response = await fetch(`/api/analytics/monthly/${userId}?month=${month}`);
    return response.json();
  },
};

// ============================================================================
// 3. Express API Server Setup (server/index.ts)
// ============================================================================

import express from 'express';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { connectDB } from './db';

export const createServer = () => {
  const app = express();

  // ===== Middleware =====
  app.use(helmet()); // Security headers
  app.use(cors());
  app.use(express.json());
  app.use(mongoSanitize());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);

  // ===== Connect Database =====
  connectDB();

  // ===== Authentication Routes =====
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, name } = req.body;
      // Firebase authentication logic
      const user = await models.User.create({ email, name });
      res.json({ success: true, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      // Firebase authentication logic
      const user = await models.User.findOne({ email });
      res.json({ success: true, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== Meal Routes =====
  app.get('/api/meals/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { date } = req.query;

      let query = { userId };
      if (date) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setDate(endOfDay.getDate() + 1);
        query = { ...query, date: { $gte: startOfDay, $lt: endOfDay } };
      }

      const meals = await models.Meal.find(query);
      res.json(meals);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/api/meals', async (req, res) => {
    try {
      const meal = await models.Meal.create(req.body);
      res.json({ success: true, meal });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put('/api/meals/:id', async (req, res) => {
    try {
      const meal = await models.Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ success: true, meal });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete('/api/meals/:id', async (req, res) => {
    try {
      await models.Meal.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== Water Routes =====
  app.get('/api/water/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { date } = req.query;

      let query = { userId };
      if (date) {
        query = { ...query, date };
      }

      const waterLogs = await models.WaterLog.find(query);
      res.json(waterLogs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/api/water', async (req, res) => {
    try {
      const waterLog = await models.WaterLog.create(req.body);
      res.json({ success: true, waterLog });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== Weight Routes =====
  app.get('/api/weight/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const weightLogs = await models.WeightLog.find({ userId }).sort({ date: -1 });
      res.json(weightLogs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/api/weight', async (req, res) => {
    try {
      const weightLog = await models.WeightLog.create(req.body);
      res.json({ success: true, weightLog });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== Analytics Routes =====
  app.get('/api/analytics/daily/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { date } = req.query;

      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setDate(endOfDay.getDate() + 1);

      const meals = await models.Meal.find({
        userId,
        date: { $gte: startOfDay, $lt: endOfDay },
      });

      const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
      const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
      const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
      const totalFats = meals.reduce((sum, meal) => sum + meal.fats, 0);

      res.json({
        date,
        meals,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFats,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== Health Check =====
  app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
  });

  return app;
};

export default createServer;

// ============================================================================
// 4. Database Connection (server/db.ts)
// ============================================================================

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nutrition-tracker';

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// ============================================================================
// 5. State Management (hooks/useNutrition.ts)
// ============================================================================

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface NutritionState {
  meals: any[];
  waterLogs: any[];
  weightLogs: any[];
  user: any;
  addMeal: (meal: any) => void;
  removeMeal: (mealId: string) => void;
  addWaterLog: (amount: number) => void;
  addWeightLog: (weight: number) => void;
  setUser: (user: any) => void;
  getDailyStats: () => any;
  getWeeklyStats: () => any;
}

export const useNutrition = create<NutritionState>()(
  devtools(
    persist(
      (set, get) => ({
        meals: [],
        waterLogs: [],
        weightLogs: [],
        user: null,

        addMeal: (meal) =>
          set((state) => ({
            meals: [...state.meals, meal],
          })),

        removeMeal: (mealId) =>
          set((state) => ({
            meals: state.meals.filter((m) => m.id !== mealId),
          })),

        addWaterLog: (amount) =>
          set((state) => ({
            waterLogs: [...state.waterLogs, { amount, timestamp: Date.now() }],
          })),

        addWeightLog: (weight) =>
          set((state) => ({
            weightLogs: [...state.weightLogs, { weight, date: new Date() }],
          })),

        setUser: (user) => set({ user }),

        getDailyStats: () => {
          const { meals } = get();
          const today = new Date().toDateString();
          const todayMeals = meals.filter((m) => new Date(m.timestamp).toDateString() === today);

          return {
            calories: todayMeals.reduce((sum, m) => sum + m.calories, 0),
            protein: todayMeals.reduce((sum, m) => sum + m.protein, 0),
            carbs: todayMeals.reduce((sum, m) => sum + m.carbs, 0),
            fats: todayMeals.reduce((sum, m) => sum + m.fats, 0),
            meals: todayMeals,
          };
        },

        getWeeklyStats: () => {
          const { meals } = get();
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          const weekMeals = meals.filter((m) => new Date(m.timestamp) >= weekAgo);

          const dailyStats = {};
          weekMeals.forEach((m) => {
            const day = new Date(m.timestamp).toDateString();
            if (!dailyStats[day]) {
              dailyStats[day] = { calories: 0, protein: 0, carbs: 0, fats: 0 };
            }
            dailyStats[day].calories += m.calories;
            dailyStats[day].protein += m.protein;
            dailyStats[day].carbs += m.carbs;
            dailyStats[day].fats += m.fats;
          });

          return dailyStats;
        },
      }),
      {
        name: 'nutrition-store',
      }
    )
  )
);
