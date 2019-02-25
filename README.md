# Mailinator Routing Micro Service 
This is a simple solution for Mailinators temporary inbox.  You would use this micro service if you needed to send something to a public temporary email inbox and store the email you're looking for. 

This was created to poll inboxes until it finds a specified piece of information in any given email in any given inbox. The information it is matching against can be specified (Subject, email content, sender address). Is bundled with NSSM to allow use as a windows service, as well.

This project is currently loading a list of public temporary inboxes to poll from an excel sheet on a USB drive.  


## A little bit about the project
This is an IOC Event driven architecture. 
Much thanks to Inversify for Inversion of control Dependency injection in this Typescript mailing router micro service. 

Learned a lot from this article by Samuele Resca to get a basic IOC app up and running: https://medium.com/@samueleresca/inversion-of-control-and-dependency-injection-in-typescript-3040d568aabe Thank you! 

Grunt + Typescript Boilerplate created with this article by Brian Love: http://brianflove.com/2016/11/08/typescript-2-express-node/
Thank you Brian! 

## Install

Install the node packages via:

`$ npm install --save`

And then run the grunt task to compile the TypeScript:

`$ npm run grunt`

## Starting

To start the server run:

`$ npm start`

## Moving On From Here...

While testing use the following command to compile and then serve the application. 

`$ npm run rebuild`

To test the default get handler use the following curl command (Assuming curl is already installed).

`curl http://127.0.0.1:8080`

## Data binding

Take a look at the excelParser.ts and FSCheck.ts files if you would like to trigger events based on something other than manually plugging in a USB excel sheet. 

Inside the src directory, there will be a "Models" directy.  This is where all our data models will be stored and accessed. You must add in the email account our code will use to SEND email addresses upon match.

The email account for Nodemailer (SendingEmail) MUST have "Allow less secure apps" turned on and enabled in google's account settings for this to work. 

``` javascript 
export const PermanentEmail = "destinationAddress@example.com"; // Where matches will be sent too
export const SendingEmail = 'example@gmail.com'; // Account for NodeMailer to use
export const SendingEmailPassword = "examplePassword"; // Account for NodeMailer to use
```


