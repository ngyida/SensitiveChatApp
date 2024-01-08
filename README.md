# SensitiveChatApp

SensitiveChatApp is a personal project to create a data crowd sourcing application. 

Specifically, it aims to provide an instant messaging service with integrated machine learning models to provide classification information on user messages which can be screend by users. These anonymous dataset can be provided to train models specific to different characteristics, including messaging services, geographical locations, users demographic etc.

## Setting up

An env file is required with the following keys:
- PORT => server will run on this port
- IBM_APIKEY => IBM service account
- IBM_URL => IBM API URL
- NODE_ENV => an ENUM of value "production" and "development"

# Implementation

The first stage of development focuses on utilising general natural language processing models trained by IBM and Google to classify messages. These models are not specific to messaging services but their classification result serves as a base to kick off the crowd-sourcing process.

The second stage of development focuses on developing a NLP model that is trained on screened data acquired from the users. This stage involve studying of user process and analysis of base data to fine-tune the model. 

The third stage of development focuses on implementing a fully-functioning messaing service app to roll out the in-house NLP model and start the crowd-sourcing.

Further stages can involve exploring other messaging service related features such as documents sharing, voice calling, video calling etc. Similarly, the aim is to integrate machine learning into these features to classify them accordingly.