# Testing Checklist

## Pre-Testing Setup
- [ ] MongoDB is running
- [ ] Dependencies installed (`npm install` in root and client)
- [ ] Database seeded (`node server/seed.js`)
- [ ] Application running (`npm run dev`)
- [ ] Both frontend (5173) and backend (5000) are accessible

## Authentication Tests

### Login
- [ ] Login with ambulance1/password123 - redirects to ambulance dashboard
- [ ] Login with hospital1/password123 - redirects to hospital dashboard
- [ ] Login with admin/password123 - redirects to admin dashboard
- [ ] Login with wrong credentials - shows error message
- [ ] Logout works and redirects to login page

## Ambulance Dashboard Tests

### Case Creation - Critical Severity
- [ ] Create case with:
  - Heart Rate: 130 (high)
  - Oxygen: 88 (low)
  - Consciousness: Unconscious
  - Injury: Cardiac
- [ ] Severity calculated as "Critical"
- [ ] Hospital assigned automatically
- [ ] ETA displayed
- [ ] Hospital resources shown

### Case Creation - Moderate Severity
- [ ] Create case with:
  - Heart Rate: 75 (normal)
  - Oxygen: 96 (normal)
  - Consciousness: Alert
  - Injury: Fracture
- [ ] Severity calculated as "Moderate" or "Stable"
- [ ] Hospital assigned
- [ ] Form clears after submission

### Edge Cases
- [ ] Submit with empty fields - validation prevents submission
- [ ] Create multiple cases rapidly - all processed correctly
- [ ] Very high heart rate (>150) - increases severity
- [ ] Very low oxygen (<85) - increases severity

## Hospital Dashboard Tests

### Queue Display
- [ ] Cases appear in severity order (Critical first)
- [ ] All case details visible (name, age, vitals, injury)
- [ ] Severity badges color-coded correctly:
  - Critical: Red
  - High: Orange
  - Moderate: Yellow
  - Stable: Green
- [ ] ETA displayed for each case
- [ ] Hospital resources shown at top

### Real-Time Updates
- [ ] Open hospital dashboard in one browser
- [ ] Create case from ambulance dashboard in another browser
- [ ] Case appears immediately in hospital dashboard (no refresh needed)
- [ ] Queue reorders automatically when higher severity case arrives

### Status Updates
- [ ] Change case status from "Assigned" to "In Transit"
- [ ] Change to "Arrived"
- [ ] Change to "Completed"
- [ ] Status updates reflect immediately

### Multiple Cases
- [ ] Create 5+ cases with different severities
- [ ] Verify queue maintains severity order
- [ ] Higher severity always at top
- [ ] Equal severity sorted by creation time

## Admin Dashboard Tests

### Metrics Display
- [ ] Total hospitals count correct
- [ ] Total cases count increases with new cases
- [ ] Active cases count correct
- [ ] Metrics update in real-time

### Hospital Load Distribution
- [ ] All hospitals listed
- [ ] Active case count per hospital shown
- [ ] Resource details visible (ICU, OT, ER)
- [ ] Hospital cards update when cases assigned

### Decision Logs
- [ ] Logs appear when cases created
- [ ] Each log shows:
  - Action type (HOSPITAL_ASSIGNMENT)
  - Reason with resource details
  - Hospital name
  - Timestamp
- [ ] Logs sorted by most recent first
- [ ] Maximum 20 logs displayed

### Real-Time Updates
- [ ] Create case from ambulance dashboard
- [ ] Admin dashboard updates immediately
- [ ] Hospital load increases
- [ ] New log entry appears

## Hospital Selection Logic Tests

### Resource-Based Selection
- [ ] Create case when one hospital has more ICU beds
- [ ] Verify that hospital is preferred
- [ ] Create multiple cases
- [ ] Verify load balancing (cases distributed)

### Load Balancing
- [ ] Assign 3 cases to same hospital
- [ ] Create new case
- [ ] Verify it goes to less loaded hospital (if resources similar)

## Severity Calculation Tests

Test different combinations:

### Critical Cases (Score ≥ 10)
- [ ] Cardiac + Unconscious + HR 130 + O2 88 = Critical
- [ ] Trauma + Unconscious + HR 140 + O2 85 = Critical
- [ ] Stroke + Confused + HR 125 + O2 89 = Critical

### High Cases (Score 7-9)
- [ ] Cardiac + Alert + HR 110 + O2 92 = High
- [ ] Respiratory + Confused + HR 95 + O2 91 = High

### Moderate Cases (Score 4-6)
- [ ] Fracture + Alert + HR 85 + O2 96 = Moderate
- [ ] Respiratory + Alert + HR 90 + O2 94 = Moderate

### Stable Cases (Score < 4)
- [ ] Minor + Alert + HR 75 + O2 98 = Stable
- [ ] Fracture + Alert + HR 70 + O2 99 = Stable

## Performance Tests

- [ ] Create 10 cases rapidly - all processed
- [ ] Open 3 browser tabs with different dashboards - all update
- [ ] Leave dashboard open 5 minutes - still receives updates
- [ ] Refresh page - data persists
- [ ] Logout and login - previous cases still visible

## Error Handling Tests

- [ ] Stop MongoDB - appropriate error message
- [ ] Invalid token - redirects to login
- [ ] Network error during case creation - error displayed
- [ ] Concurrent case creation - no data loss

## UI/UX Tests

- [ ] All dashboards responsive on different screen sizes
- [ ] Color coding consistent and clear
- [ ] Forms easy to fill
- [ ] Buttons have hover effects
- [ ] Loading states shown during operations
- [ ] Success messages clear
- [ ] Error messages helpful

## Browser Compatibility

- [ ] Chrome - all features work
- [ ] Firefox - all features work
- [ ] Safari - all features work
- [ ] Edge - all features work

## Security Tests

- [ ] Cannot access dashboards without login
- [ ] Token expires after 24 hours
- [ ] Passwords not visible in network requests
- [ ] Role-based access enforced (ambulance can't access hospital routes)

## Data Persistence Tests

- [ ] Create cases
- [ ] Restart server
- [ ] Cases still in database
- [ ] Login still works
- [ ] Hospital data intact

## Success Criteria

All checkboxes above should be checked for MVP completion.

## Known Limitations (Expected)

- No hospital resource editing UI (admin can't update resources from dashboard)
- No case deletion
- No user registration UI (must use API directly)
- No pagination for large case lists
- No filtering or search
- No export functionality
- No notifications/alerts
- No mobile app

These are out of scope for MVP and documented for future versions.
