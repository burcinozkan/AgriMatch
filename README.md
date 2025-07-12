
# AgriMatch 🌾

AgriMatch is a cloud-native mobile marketplace platform that enables farmers to sell bulk and packaged agricultural products directly to buyers. The project aims to reduce intermediary costs and improve agricultural accessibility across rural regions.

---

## ⚙️ Tech Stack

**Backend:**
- Java 17
- Spring Boot (RESTful API, Validation, Exception Handling)
- JPA (Hibernate)

**Authentication:**
- AWS Cognito (User Pool, JWT)
- Role-based access control (RBAC)

**Cloud & DevOps:**
- AWS RDS (PostgreSQL)
- AWS S3 (Media Hosting)
- AWS AppSync (GraphQL for real-time messaging)
- AWS Lambda (Scheduled Tasks)
- Docker (Dev environment)
- GitHub Actions (CI/CD)

**Frontend (Mobile):**
- React Native
- Expo
- React Navigation
- AWS Amplify

---

## 🚀 Features

- 🔐 Secure user authentication via AWS Cognito
- 📦 Product listing for bulk and packaged goods
- 🧾 Blockchain-based order tracking & transparency
- 🪄 Real-time messaging (GraphQL) for buyer-seller communication
- 🖼️ Image upload to AWS S3 via Amplify
- 🐳 Docker support for local backend testing
- 🧪 CI/CD pipeline via GitHub Actions

---

## 🧱 System Architecture

```text
[Mobile App]
     ↓
[API Gateway] — [Spring Boot Backend] — [PostgreSQL (RDS)]
     ↓                     ↓
[Cognito (Auth)]     [S3 (Media)]
     ↓
[AppSync (Real-Time Messaging)]
