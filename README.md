# grabpay

# Introduction
Grab wants to provide a mobile wallet “GrabPay” service where every user can hold funds in their wallets in SGD.

Design a new HTTP based GrabPay service which should expose APIs such that users can perform the following operations:
1. Check their balance
2. Transfer money to another user
3. Retrieve a summary of their transactions

# Requirements
1. Users can check their balance
2. Users can transfer money to another user. If sender doesn't exit, transaction should fail
3. Users should be able to retrieve their transaction history for a period of time
4. All APIs should have proper access controls (User A should be able to view or transfer only his money)
5. Dockerize the application

# Deliverables
1. Zipped solution in any language of choice
2. README file with the following: <br>
    a. Explain all design considerations <br>
    b. All assumptions <br>
    c. Steps to run the application
3. Appropriate test cases
<br>
<br>
<hr>
<br>
<br>

# Design Considerations
1. Sign up for new users
2. Login for existing users

# Assumptions
1. Users only use their own phone number when they sign up



# Steps to run application
1. Install Node.js [https://nodejs.org/en/]
2. In the main directory, run the following command in the terminal: 
<br>
a) `npm install`
<br>
b) `npm start`
<br>
This will start up the Express.js server.
3. Open a new terminal. In the main directory, run the following commands:
<br>
a) `cd client`
<br>
b) `npm install`
<br>
c) `npm run start`
<br>
This will start up the ReactJS application.