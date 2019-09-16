<img src="https://uploads-ssl.webflow.com/5c4972f217c3bf47e63d2f0c/5c497bca5687184384bab07d_sorunlogo.svg" width="200">

# A demo on how you can use SOR'UN React components
## About this small project
I created this small project to make it easy for developers to implement SOR'UN components in their web or mobile applications.
Inside this project I am testing the following components from SOR'UN platform:
[https://www.npmjs.com/package/sorun-conversation](https://www.npmjs.com/package/sorun-conversation)
[https://www.npmjs.com/package/sorun-web-conversation](https://www.npmjs.com/package/sorun-web-conversation)
And also the story will be the same for the Native layout component:
[https://www.npmjs.com/package/sorun-native-conversation](https://www.npmjs.com/package/sorun-native-conversation)
But this project is created for only testing the web version.

You can find a detailed documentation on how to use each component in its npm package page.
This project supports both testing using auto inititialize feature or without it.
## Available Scripts

In the project directory, you can run:
###### `npm start`

Runs the app in the development mode so you can check our Webchat from your favorite browser.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.
In App.js I defined some constants that the developer can play with in order to test the components with different scenarios.
Be aware that the project will not work without adding an agent token in the code. Just search for "<Your token here>" and replace it with your token.

## Very important note
Please be aware that I am fetching a client token through front-end code for sake of testing, but the correct way to do that is in the backend, so you don't expose your agent token in a front-end project which can be getten easily to hack your SOR'UN account.