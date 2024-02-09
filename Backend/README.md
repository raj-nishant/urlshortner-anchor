# URL Shortener Backend

## Overview
- SignUp check the existing database and update the new user
  - By default inactive account is created and a activation link will be sent to the user email through node mailer
- Login check the user data and allow the login
- Endpoint to resend the activation email
- Forgot Password creates a temporary token and send a mail to the user to update the password
- Gets a Full URL from user and create a Hsort URL
- when the Short URL is clicked it will Redirect the user to Full URL
- Update the Short URL Count everytime the short url is clicked

**Base URL**

URL - https://urlshortener-mhsq.onrender.com/

### POST
**signup**
  `https://urlshortener-mhsq.onrender.com/signup/newuser`
Get the user data and store it in the dataBase
Automatically send a email to the user for Authentication

***Request Format***

{
    "email": "okok@gmail.com",
    "password": "example"
}

### POST
**login**
  `https://urlshortener-mhsq.onrender.com/login/user`
Get the user data and check the user details in the database

***Request Format***

{
    "email": "oki@gmail.com",
    "password": "example"
}

### POST
**forgot passoword**
  `https://urlshortener-mhsq.onrender.com/forgot`
Get the user email and check the user details in the database and send a Password Reset link to the User email

***Request Format***

{
    "email": "oki@gmail.com"
}

### GET
**verify reset page**
  `https://urlshortener-mhsq.onrender.com/reset/:id/:token`
When the User click the password reset email it will check the data and allow the user to update the new password

### PATCH
**update new password**
  `https://urlshortener-mhsq.onrender.com/forgot`
  
***Request Format***

{
  "newPassword": "123",
  "confirmPassword": "123"
}

## Front End Live Site
- [Live Site](url-shortener-8161.netlify.app/)

## Live Site
- [Live Site](https://urlshortener-mhsq.onrender.com/)
