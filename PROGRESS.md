# TaskFlow: Progress

**Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS · Vitest
**Theme:** navy blue + cyan
**Goal:** prove complex state management, accessibility and testing.
**Timeline:** 14 days. Tick each box when done and commit daily.

---

## Week 1: Core logic and UI

### Day 1: Setup and data model
- [x] Create the project with create-next-app
- [x] Clean the starter page
- [x] Define Task and Status types in types.ts
- [x] Push to GitHub

### Day 2: The reducer
- [x] Create lib/taskReducer.ts
- [x] Actions: ADD, EDIT, DELETE, MOVE
- [x] Keep the reducer pure

### Day 3: Reducer tests (Vitest)
- [x] Install and configure Vitest
- [x] One test per action
- [x] Edge cases: empty title, unknown id, same column
- [x] Add npm test script

### Day 4: State wiring
- [x] TaskProvider with useReducer and Context
- [x] useTasks() hook
- [x] Wrap the app in the provider

### Day 5: Board layout
- [x] Three columns: To do, Doing, Done
- [x] Responsive Tailwind grid
- [x] Semantic HTML

### Day 6: Task cards and add form
- [ ] TaskCard component
- [ ] AddTaskForm with a proper label
- [ ] Validation and error message

### Day 7: Edit, delete, move, week 1 review
- [ ] Edit a task inline
- [ ] Delete with confirmation
- [ ] Move between columns with buttons
- [ ] Refactor, lint, test, commit

---

## Week 2: Accessibility, persistence, polish, ship

### Day 8: Drag and drop
- [ ] Add @dnd-kit
- [ ] Keep buttons as the non-drag fallback
- [ ] Dispatch MOVE on drop

### Day 9: Accessibility
- [ ] Full keyboard navigation
- [ ] ARIA labels
- [ ] Visible focus styles
- [ ] Focus management after add and delete
- [ ] aria-live announcements

### Day 10: Persistence
- [ ] Save tasks to localStorage
- [ ] Load safely on the client (no hydration mismatch)
- [ ] Tests for save and load helpers

### Day 11: Features and states
- [ ] Search or filter
- [ ] Empty states
- [ ] Task counts per column
- [ ] Polish the navy and cyan theme

### Day 12: Quality pass
- [ ] Lighthouse: 100 on Accessibility, Best Practices, SEO; 90+ Performance
- [ ] axe check
- [ ] Test on a real phone
- [ ] A few component tests if time allows

### Day 13: Deploy and document
- [ ] Deploy to Vercel
- [ ] Write the README
- [ ] Add screenshots
- [ ] Add live link and repo link

### Day 14: Showcase and buffer
- [ ] Add TaskFlow to data/projects.ts
- [ ] Update CV
- [ ] Update LinkedIn
- [ ] Update About page project count
- [ ] Fix anything unfinished

---

## Daily log

| Day | Date | Done? | Notes |
|-----|------|-------|-------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |
| 9 | | | |
| 10 | | | |
| 11 | | | |
| 12 | | | |
| 13 | | | |
| 14 | | | |
