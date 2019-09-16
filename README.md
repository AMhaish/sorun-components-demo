<img src="https://uploads-ssl.webflow.com/5c4972f217c3bf47e63d2f0c/5c497bca5687184384bab07d_sorunlogo.svg" width="200">

# A demo on how you can use SOR'UN React components
## About this small project
I created this small project to make it easy for developers to implement SOR'UN components in their web or mobile applications.
Inside this project I am testing the following components from SOR'UN platform:
[https://www.npmjs.com/package/sorun-conversation](https://www.npmjs.com/package/sorun-conversation) <br>
[https://www.npmjs.com/package/sorun-web-conversation](https://www.npmjs.com/package/sorun-web-conversation) <br>
And also the story will be the same for the Native layout component: <br>
[https://www.npmjs.com/package/sorun-native-conversation](https://www.npmjs.com/package/sorun-native-conversation) <br>
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

# Documentation about the components

## System architect

The system architect is organized in layered architecture; the first abstraction is the Sorun-JS library, which implemented in pure JavaScript and can be used in any front-end framework. The main backend calls and processes flows are implemented in this library.

Sorun-Conversation is a container component that supports the conversational window and contains the business logic, in order to use it one view implementation should be used as its layout. Sorun-Web-Conversation and Sorun-Native-Conversation are two view implementations for web and mobile platforms in order.

Sorun-JS library implements Observer Pattern where Sorun-Conversation can subscribe to authentication and messages events. So an instance of Sorun-JS library is compulsory dependency for Sorun-Conversation in order to work. But we developed Sorun-Conversation in two modes, where the second one can do initialization process including initializing the Sorun-JS instance internally.

There are some libraries that should be installed inside your application to make the system works properly as peer dependencies for these components, they are as follows:

-  **Jquery**: It will be removed soon, but it&#39;s a dependency for now using the version ^3.3.1
-  **React**: Using versions ^15.0.0 or ^16.0.0.
-  **Sorun-JS**: Using any version after 1.4.0, it&#39;s preferable to use last version always
-  **React-dom**: Just for web platform, using versions ^15.0.0 or ^16.0.0
-  **React-Native**: Just for web platform, tested on Expo 31 SDK but should work on all versions.
-  **Native-Base**: Just for mobile platforms, using versions ^2.8.1
-  **PropTypes**: Using versions ^15.5.4,
-  **React-native-markdown-renderer:** Using versions ^3.2.8
-  **React-native-google-places-autocomplete**: Using versions ^1.3.9

## Sorun-JS

The library responsible for supporting the app with the abstraction to access the backend APIs and to manage the life cycle for both the authentication and chatting processes as we considered before by using subscribe-publish pattern.

It can be installed from the following link: https://www.npmjs.com/package/sorun-js and it is published with documentation about the services available inside it. The library reads the important parameters from Query-String in web version or from the passing props to it.

The important thing is that the library should be initialized one time before using the SORUN chat service. The initializing method will take a first parameter as constant to choose the target platform (SORUNJS\_BROWSER\_TYPES or SORUNJS\_NATIVE\_TYPES), the second parameter is an object contains props object with the needed parameters, if the second parameter passed in web platform the library will stop checking the query string parameters, the most important parameters as following:

- **api** : That will determine the backend service path
- **company** : That will determine the company id that the app will work on
- **lang** : That will determine that target language for the whole app, it will take either the &#39;en&#39; value or the &#39;tr&#39; value

The next table contains all the parameters that can be passed either directly to initFactory method or using query string:

| **Parameter** | **Description** |
| --- | --- |
| platform | Can take four values (WEBCHAT,ANDROID,IOS,CLIENTWEB) which used to define the platform the webchat are working on. The parameter is send also with the server side calls to support filtration of requests using the platform. And the default value is WEBCHAT. Can be accessed with &#39;platform&#39; property. |
| sourceURL | It&#39;s used in communication with server side so that the calls can be filtered by their source. |
| chatColor1 | Can be used to customize chat skin, it will specify the background color of the agent messages. Can be accessed with &#39;chatColor1&#39; property. |
| chatColor2 | Can be used to customize chat skin, it will specify the font color of the agent messages |
| chatColor3 | Can be used to customize chat skin, it will specify the card objects color |
| chatColor | Can be used to customize chat skin, it will specify the font color of the client messages |
| headerColor | Can be used to customize chat skin, it will specify the top header background color |
| companyFilter | An array of integers (Companies ids) to filter out companies list according to them |
| urlCompany | This parameter can be used to force the system using specific company in authentication, its an integer which is the id of the company. |
| urlToken / token | This parameter can be used to force the system using specific token in authentication. Can be accessed with &#39;token&#39; property. |
| variable / var | To pass any kind of string type parameters to chatbots. If more than one variable needs to be passed stringified json can be added to this field  |
| poolFilter | List comma separated message category ids can be entered here. If this parameter used only given message categories will be asked to client. If one pool id given, the client will directly start the conversation with this conversation category. Any existing open conversation will not be affected with this parameter but it should be ended. This parameter also can be used with inactive conversation categories which is helpful to start some client with hidden conversation categories.  |
| showHeader | Its a boolean parameter that is used to either show or hide the header section. |
| lang | This parameter is used to determine the target language or the controllers. |
| hideLocation | Its a boolean parameter that is used to hide or show the location share button in message input box. |
| hideFile | Its a boolean parameter that is used to hide or show the upload file button in message input box. |
| api | This parameter is used to force a specific back-end path. |

## Sorun-Conversation

A component library that works as a React container component to support applications with SORUN conversational window. It can be installed from the following link [https://www.npmjs.com/package/sorun-conversation](https://www.npmjs.com/package/sorun-conversation) , this component need a view dependency for either web or mobile platforms that can be installed from the following links:

- [https://www.npmjs.com/package/sorun-web-conversation](https://www.npmjs.com/package/sorun-web-conversation): A component view for web platforms.
- [https://www.npmjs.com/package/sorun-native-conversation](https://www.npmjs.com/package/sorun-native-conversation): A component view for mobile platforms.

The view components can be passed through Layout property to be either (WebConversation or NativeConversation).

The component designed to work in two modes (Auto initialization mode, and manual initialization mode). In the first one the authentication is being done inside the component using a token prop, and with manual initialization it expects that the authentication will happened outside, the token will be get inside SorunJS library and just this component will need a variable to tell if the user is authenticated or not and the authenticate output action if the component needs to authenticate the user.

The main props that should be passed to the Conversation component is as following:

- **language** : Will take one of the next four values, &#39;en&#39; for English, &#39;tr&#39; for Turkish, &#39;ar&#39; for Arabic and &#39;de&#39; for German language. The property will decide the views language.
- **companyId** : the company id that the conversational window should work on
- **Layout** : the view layout of the container component, it depends of the imported view library (SORUN-Web-Conversation or SORUN-Native-Conversation).

Another common props that are optional to the component will be as following:

- **lang** : It&#39;s an object map of keys values for each text appears in different places in the component in case the developer wants to use his own text in the views.
- **showHeader** : Boolean to show or hide the conversational window header
- **company** : The company object with all company settings, if it&#39;s not passed the container component will automatically make a call to get that value
- **logout** : An output callback that will be called if the logout button has been clicked.

### Auto initialization mode:

In auto initialization mode, the component will initialize Sorun-JS library alone, the component will need the following props as a dependency:

- **autoInit** : Boolean variable that it&#39;s default value is false, but should be set to true to enable auto initialization mode.
- **api** : The url path of the back-end APIs, this one can be passed to Sorun-JS through its props or query string. But in auto initialization case it should be passed directly to the component while the component will initialize the Sorun-JS instance internally.
- **token** : While its auto initialization; the component accept a token to complete authentication process (Checking that it&#39;s a valid token or get a new token).
- **authFailed** : Output function that will be called in case of failure in getting a token if its not already provided to the component.

**Important note:** Auto initialization with invalid token will only works if the company allows authentication without phone authentication.


### Manual initialization mode:

In manual initialization mode, the component expect that the authentication is happening outside to get a valid token in any method. Also the component will expect the Sorun-JS instance to initialized outside and passed as props to it. The component will need the following props as a dependency:

- **core** : The needed Sorun-JS instance
- **authenticate** : A call back action that will be called to authenticate the user, the call should include the authentication process

While the authentication is happening outside in manual initialization, the Sorun-JS will get a token in this authentication process and will store it internally so the component will use that token that will be passed with the library instance already. Also the api path will be chosen when initializing the Sorun-JS instance, so no need to pass it to the component.