# GrabPay

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

## General
1. Sign up for new users
2. Login for existing users

## View Balance Page
1. Display user's account balance

## View Transaction History Page
1. Display user's transaction history
2. Allow user to filter based on transaction date/month
3. Display the total amount for credit and debit

## Send Payment Page
1. Check if receiver has an account. If the receiver has no account, user is unable to transfer.
2. Allow user to input their description of their transaction
3. Update user's and receiver's account balance after each transaction
4. Ensure user cannot send to self

# Assumptions
1. User input with expected data types
2. User can transfer money even if their account balance is less than the amount they are transferring (overdraft)
3. App is secure

# Steps to run application locally
1. Install Node.js [https://nodejs.org/en/]
2. Install MongoDB [https://docs.mongodb.com/manual/administration/install-community/]
3. Create a new `.env` file in the main directory. 
    
    Add these environment variables into the file and replace `<value>` with the relevant values:

    `MONGODB_URI=<mongodb URI>` (only for cloud server) <br> 
    `SECRET=<secret key>` (any string character) <br>
    `PORT=<port>` (default value is 4000)

4. Starting up Express.js server.

    In the main directory, run the following command in the terminal: 

    a) `npm install` <br>
    b) `npm run start` <br>

5. Starting up React App.

    Open a new terminal. In the main directory, run the following commands:

    a) `cd client` <br>
    b) `npm install` <br>
    c) `npm run start` <br>