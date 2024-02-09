# URL Shortener FrontEnd
## Overview
- Create a Shorter URL for Given URL 
- can Check number if Short URL created per month and week using Chart.js
- Update the URL Count for everytime the URL is Clicked

### SignUp
- In SignUp page new user is registered in the database and a Inactive account is created
- And a Temporary activation code is send to the user email using __node mailer__ the lick have a expirey time of 2 Days
- when user click the activation link there account is activated
### Login
  - when user entered a data , checks if the user existed in the database
  - if there is no user found or account is not activated user will not be allowed to logged in
  - user can resend activation email if there account is inactive  
  - if the user credential is wrong it will throw an error
  - have a forgot password option to update a new password
### Forgot Password
   - get user registed email id as a input and send a link with temporary token to the user email
   - the token will have a 15 minutes of expirey time
   - when user clicks the link if will check the user data and token to allow the user to update new password
### DashBoard
   - Once user logged In they will be redirected to Dashboard
   - DashBoard have a option to get a Full URL as a input and give Short URL
   - The created Short URL will be updated in the table
   - The table will have a datas like Short URL , Number of times the URL is Clicked, Full URL , Created Time
   - And the Number of Short URL Created per Week and Month will be shows in the Graph Bar using Chart.js

## Technologies Used
  - React + Vite
  - Tailwind CSS
  - Chart.js

## Back End Code
- [BackEnd](https://github.com/Praveen8161/urlshortener-backend.git)

## Live Site
- [Live Site](https://url-shortener-8161.netlify.app/)
