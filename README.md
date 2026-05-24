# 🚗 Async Race

**Live Demo:**  
https://async-race-mu.vercel.app

A single-page racing simulator where users manage a garage of radio-controlled
cars, start races, and track winners with persistent statistics.

Built as part of the EPAM Frontend Engineering assessment.

---

# 🧱 Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode enabled)
- Zustand (state management)
- Axios (API communication)
- Tailwind CSS
- ESLint (Airbnb configuration)
- Prettier

---

# 🚀 Features

## Garage View

- Create cars
- Update cars
- Delete cars
- Generate 100 random cars
- Responsive garage layout
- Pagination

## Race System

- Start engine animation
- Stop engine animation
- Start race for all cars
- Reset race
- First finisher winner detection
- Winner announcement
- Responsive race animation
- Proper async race handling
- Engine failure handling

## Winners View

- Winners table
- Pagination
- Sorting by wins
- Sorting by best time
- Persistent winners statistics
- Best result preservation

---

# 📦 API Integration

The application works with the provided mock backend API.

Used endpoints:

- `/garage`
- `/engine`
- `/winners`

Backend is not included in deployment and should be run separately by the
evaluator.

---

# 📱 Deployment

Production URL:

https://async-race-mu.vercel.app

---

# 📥 Local Setup

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 3. Start development server

```bash
npm run dev
```

## 4. Run backend server separately

The provided mock server should run locally.

---

# 📊 Checklist (Self Evaluation)

## 🚀 UI Deployment (10/10)

- [x] Application deployed on Vercel

---

## ✅ Requirements to Commits and Repository (20/20)

- [x] Conventional commits used
- [x] Checklist included in README
- [x] Score calculation included
- [x] Deployment link included

---

# 🧱 Basic Structure (80/80)

## Two Views (10/10)

- [x] Garage view
- [x] Winners view

## Garage View Content (30/30)

- [x] Garage title
- [x] Car creation panel
- [x] Race controls
- [x] Garage section

## Winners View Content (10/10)

- [x] Winners title
- [x] Winners table
- [x] Pagination

## Persistent State (30/30)

- [x] Pagination preserved
- [x] Store state preserved
- [x] UI state preserved

---

# 🚗 Garage View (90/90)

## CRUD Operations (20/20)

- [x] Create car
- [x] Update car
- [x] Delete car

## Color Selection (10/10)

- [x] Color picker implemented

## Random Car Generation (20/20)

- [x] Generate 100 random cars
- [x] Random colors generated

## Car Management Buttons (10/10)

- [x] Select button
- [x] Delete button
- [x] Start button
- [x] Stop button

## Pagination (10/10)

- [x] 7 cars per page

---

# 🏆 Winners View (50/50)

## Display Winners (15/15)

- [x] Winners displayed after races

## Pagination for Winners (10/10)

- [x] 10 winners per page

## Winners Table (15/15)

- [x] Car number
- [x] Car color
- [x] Car name
- [x] Wins count
- [x] Best time

## Sorting Functionality (10/10)

- [x] Sort by wins
- [x] Sort by best time

---

# 🚦 Race (170/170)

## Start Engine Animation (20/20)

- [x] Animation starts correctly
- [x] Handles engine failures

## Stop Engine Animation (20/20)

- [x] Cars reset correctly

## Responsive Animation (30/30)

- [x] Works on small screens

## Start Race Button (10/10)

- [x] Starts all cars

## Reset Race Button (15/15)

- [x] Resets all cars

## Winner Announcement (5/5)

- [x] Winner announcement implemented

## Button States (20/20)

- [x] Correct disabled states

## Actions During Race (50/50)

- [x] Stable race handling
- [x] Predictable async behavior

---

# 🎨 ESLint & Prettier (10/10)

## Prettier Setup (5/5)

- [x] Formatting scripts configured

## ESLint Configuration (5/5)

- [x] Airbnb configuration used
- [x] Strict TypeScript enabled

---

# 🌟 Overall Code Quality

## Architecture & Code Quality

- Modular architecture
- API abstraction layer
- Zustand state separation
- TypeScript strict mode
- Reusable UI components
- Responsive design
- Minimal duplication
- Readable naming conventions

---

# 🧮 Final Score

## Estimated Score: **350 / 400**
