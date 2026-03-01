# Product Requirements Document (PRD)

## Smart Emergency Orchestration System

**Version:** MVP 1.0\
**Document Type:** Hackathon Prototype PRD

------------------------------------------------------------------------

## 1. Product Overview

The Smart Emergency Orchestration System is a real-time emergency
coordination platform designed to optimize patient routing, hospital
resource allocation, and emergency prioritization.

The system connects ambulances, hospitals, and city-level administrators
into a unified intelligent network. It improves emergency response
efficiency by automating severity-based prioritization,
survival-optimized routing, and hospital load balancing.

The goal of the MVP is to demonstrate a working prototype that:

-   Calculates patient severity using structured scoring logic\
-   Selects the most suitable hospital based on survival probability
    factors\
-   Dynamically reorders emergency queues\
-   Displays real-time dashboards\
-   Logs system decisions transparently

------------------------------------------------------------------------

## 2. Problem Statement

Current emergency systems face:

-   Routing based only on nearest hospital, not optimal hospital\
-   Overcrowding at specific hospitals\
-   Manual prioritization conflicts\
-   Delayed treatment start\
-   Lack of real-time visibility across hospitals\
-   Missing or inconsistent emergency records

These inefficiencies can negatively impact survival outcomes.

------------------------------------------------------------------------

## 3. Goals and Objectives

### Primary Goals

1.  Reduce emergency decision latency\
2.  Optimize hospital selection based on multiple factors\
3.  Automate severity-based prioritization\
4.  Provide real-time operational visibility\
5.  Maintain transparent decision logging

### Success Criteria

-   Real-time case creation and routing works end-to-end\
-   Hospital dashboard reflects dynamic queue updates\
-   Routing logic selects hospital based on defined rules\
-   Priority reordering works automatically\
-   All actions are logged

------------------------------------------------------------------------

## 4. Target Users

### 1. Ambulance Staff

-   Input patient data\
-   View recommended hospital\
-   Track ETA and alerts

### 2. Hospital Emergency Staff

-   Monitor incoming cases\
-   View live severity-based queue\
-   Track resource availability

### 3. City-Level Administrators

-   Monitor hospital load distribution\
-   Analyze response times\
-   Identify system-level bottlenecks

------------------------------------------------------------------------

## 5. Core Features (MVP Scope)

### 5.1 User Authentication

-   Secure login system\
-   Role-based access (Ambulance / Hospital / Admin)

### 5.2 Emergency Case Creation

-   Patient information input\
-   Vitals entry\
-   Injury type selection\
-   Automatic severity calculation

System must store: - Severity score\
- Severity category\
- Timestamp

### 5.3 Clinical Severity Scoring

-   Rule-based severity calculation\
-   Categorization into:
    -   Critical\
    -   High\
    -   Moderate\
    -   Stable

Must be transparent and explainable.

### 5.4 Hospital Selection Logic

System evaluates:

-   ICU bed availability\
-   OT availability\
-   ER capacity\
-   Travel time\
-   Active emergency count

System selects hospital based on weighted logic prioritizing survival
probability factors.

### 5.5 Dynamic Priority Queue

-   Cases automatically sorted by severity score\
-   If higher severity case arrives:
    -   Queue reorders automatically\
-   Dashboard reflects changes in real time

### 5.6 Basic Load Balancing

-   Track number of active cases per hospital\
-   Prevent routing to overloaded hospitals

### 5.7 Real-Time Dashboard

Hospital Dashboard must show:

-   Live emergency queue\
-   Incoming ambulances\
-   Resource status\
-   Decision log

City Admin Dashboard must show:

-   Hospital load distribution\
-   Emergency metrics\
-   System performance indicators

### 5.8 Decision Logging

System must log:

-   Hospital assignment\
-   Priority updates\
-   Routing changes

Each log must include: - Timestamp\
- Action type\
- Reason

------------------------------------------------------------------------

## 6. Out of Scope (Future Versions)

-   Advanced predictive overload forecasting\
-   AI-based survival prediction using trained ML models\
-   Deep integration with real hospital EHR systems\
-   IoT live medical device integration\
-   Disaster-mode scaling

------------------------------------------------------------------------

## 7. Functional Requirements

1.  System must allow case creation within 30 seconds.\
2.  Severity must be calculated immediately after submission.\
3.  Hospital selection must be automatic and rule-based.\
4.  Dashboard must update in real time without page refresh.\
5.  Queue must automatically reorder based on severity score.\
6.  All decisions must be logged in database.

------------------------------------------------------------------------

## 8. Non-Functional Requirements

### Performance

-   Real-time updates under 2 seconds

### Reliability

-   No data loss during case creation

### Security

-   Passwords must be hashed\
-   Role-based access control

### Scalability

-   Database structure must support multiple hospitals

### Usability

-   Clean, minimal interface\
-   Color-coded severity indicators\
-   Fast visual scanning

------------------------------------------------------------------------

## 9. Data Model Overview

Collections:

-   Users\
-   Cases\
-   Hospitals\
-   Assignments\
-   DecisionLogs

Relationships:

-   Users create Cases\
-   Cases are assigned to Hospitals\
-   Hospitals manage resources\
-   DecisionLogs track all actions

------------------------------------------------------------------------

## 10. System Flow

1.  User logs in\
2.  Ambulance creates emergency case\
3.  System calculates severity\
4.  System selects optimal hospital\
5.  Hospital dashboard updates in real time\
6.  Queue auto-reorders if necessary\
7.  Decision logs recorded

------------------------------------------------------------------------

## 11. Risks and Mitigation

### Risk

Survival prediction model questioned

### Mitigation

Use rule-based clinical scoring instead of black-box ML

### Risk

Scope too large

### Mitigation

Focus strictly on MVP features

### Risk

Real-time sync failure

### Mitigation

Use event-driven updates and test thoroughly

------------------------------------------------------------------------

## 12. Future Roadmap

-   Predictive analytics layer\
-   City-wide emergency heatmaps\
-   Ambulance repositioning intelligence\
-   ML-enhanced survival prediction\
-   Government EMS integration
