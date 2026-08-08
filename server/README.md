# Core Modules
Auth ✅
Users 🟡
Companies ✅
Candidates 🟡
 - profile (Create, Update) ✅
 - experiences ✅
 - education 
 - skills 
Jobs ✅
Applications 🟡
Bookmarks
Uploads
Messaging
Notifications
Analytics
Admin
Audit Logs
Recruiters

# Major Features
## Authentication
Register ✅
Login ✅
Logout ✅
Refresh tokens ✅
Email verification
Forgot password
Reset password
## Companies
Create company ✅
Edit company profile ✅
Invite recruiters
Company verification
## Jobs
CRUD ✅
Search ✅
Filtering ✅
Pagination ✅
Draft/Published/Closed status ✅
## Applications
Apply to jobs ✅
Upload CV
Cover letters
Application timeline
Withdraw application ✅
## Messaging
Candidate ↔ Recruiter chat
Real-time messaging
Read receipts (optional)
## Notifications
New application
Interview invitation
Messages
Job status updates
Email notifications
## Candidate
Profile ✅
Experience 🟡
Education
Skills
Resume
Portfolio links
## Company Dashboard
Manage recruiters
Manage jobs ✅
View applicants ✅
Analytics
## Admin
Manage users
Manage companies
Reports
Moderation
Platform analytics

# NestJS Concepts to Learn
Modules ✅
Controllers ✅
Services ✅
Dependency Injection ✅
DTOs ✅
Validation Pipes ✅
Guards ✅
Exception Filters ✅
JWT ✅
Custom Decorators ✅
Role-Based Access Control ✅
Swagger ✅
Interceptors
Middleware
Custom Providers
Passport
Dynamic Modules
WebSockets
Event Emitter
BullMQ
Cron Jobs
Testing
# Backend Practices
RBAC ✅
Pagination ✅
Filtering ✅
Sorting ✅
Global exception handling
Global response interceptor
Request validation
Request logging
Audit logging
Transactions
Soft deletes
Environment configuration
Database seeding
Migrations ✅
API versioning
# Security
HttpOnly cookies ✅
JWT access tokens ✅
JWT refresh tokens ✅
Password hashing ✅
CORS ✅
Input validation ✅
CSRF considerations
Email verification
Rate limiting
Helmet
Authorization policies
# Milestones
## Milestone 1 — Foundation
Project setup ✅
Prisma ✅
PostgreSQL ✅
Authentication ✅
Swagger ✅
Global guards ✅
Global exception filter
Global response interceptor
## Milestone 2 — Users
Candidate profiles
User management
File uploads
Avatar support
## Milestone 3 — Companies
Company creation ✅
Company profiles ✅
Recruiter invitations
Company administration
## Milestone 4 — Jobs
Job CRUD ✅
Search ✅
Filters ✅
Pagination ✅
Bookmarks
## Milestone 5 — Applications
Apply for jobs ✅
Resume uploads
Application status workflow
Recruiter review tools
## Milestone 6 — Communication
WebSocket messaging
Notifications
Email queue
Background jobs
## Milestone 7 — Administration
Admin dashboard
Moderation
Audit logs
Platform analytics
## Milestone 8 — Production Readiness
Unit tests
Integration tests
Docker
CI/CD
Logging
Monitoring
Deployment
Performance optimization

# Stretch Goals

Saved searches
Job recommendations
AI-assisted resume analysis
AI-generated job descriptions
Interview scheduling
Calendar integration
Two-factor authentication (2FA)
OAuth (Google, GitHub, LinkedIn)
Multi-language support
Organization-level permissions
Activity feed
Public company pages

# Definition of Done
Clean, modular NestJS architecture.
Secure authentication and authorization.
Well-designed relational database models.
Production-ready REST APIs with Swagger documentation.
Background processing and real-time communication.
Automated testing.
Containerized deployment.
CI/CD automation.
A polished frontend integrated with a scalable backend.

## *TODO*
1. Finish Candidates
→ experience
 - add new experience ✅
 - update experience 🟡
 - delete experience 🟡🟡
→ education 
→ skills
→ portfolio
→ resume structure

2. Finish Applications
→ CV upload
→ cover letter
→ application timeline
→ robust status transitions

3. Finish Company recruitment
→ recruiter invitations
→ recruiter/company permissions

4. Bookmarks

5. Upload infrastructure

6. Global API infrastructure
→ response interceptor
→ logging
→ configuration
→ security hardening

7. Testing

8. Then Messaging + Notifications

