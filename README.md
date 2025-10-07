#  AgriMatch — Connecting Farmers and Buyers

AgriMatch is a mobile application designed to help **farmers sell their products directly to buyers**, eliminating unnecessary intermediaries.  
It aims to support fair trade, reduce product loss.

---

##  Overview

Farmers can create product listings by specifying:
-  City & region  
-  Crop type  
-  Pesticide usage  
-  Harvest time  
-  Price & quantity  

Buyers can:
- Search products based on **distance, category, or harvest date**
- Contact farmers directly  
- Arrange on-site visits before finalizing agreements  

All agreements are then recorded through a **blockchain-based tracking and invoicing system**, ensuring transparency and traceability.

---

##  Tech Stack

###  Frontend (Mobile)
- **React Native (Expo Router)**
- **AWS Amplify** (DataStore, AppSync, S3 integration)
- **AWS Cognito** for authentication
- **GraphQL** (through AWS AppSync)
- **React Native Swiper** for onboarding  
- **SecureStore** for local token management  

###  Backend
- **AWS AppSync (GraphQL API)**
- **AWS Lambda** for serverless functions  
- **DynamoDB** for storing product and user data  
- **Blockchain integration** for transaction logging (Ethereum test network)  

---

## Features

| Feature | Description |
|----------|--------------|
|  User Authentication | Secure sign-up and login with AWS Cognito |
|  Product Management | Add, edit, and delete farm listings |
|  Distance-Based Search | Buyers can find nearby farmers |
|  Invoice System | Generates blockchain-based transaction logs |
|  Media Upload | Upload product images directly to AWS S3 |
|  Dual Role | Users can act as both buyers and sellers |

---

