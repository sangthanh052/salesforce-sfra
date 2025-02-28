# Table of contents

- [Submitting your first Pull Request ](#submitting-your-first-Pull-request)

- [Submitting a Pull Request ](#submitting-a-Pull-request)

- [What to expect](#what-to-expect)

- [Team members](#SFRA-team-menbers)

- [Back to README](./README.md)

# Contributing to _SFRA_

To contribute to the SFRA base cartridge, follow the guidelines below. This helps us address your pull request in a more timely manner. 

## Submitting your first pull request
If this is your first pull request, follow these steps:

  1. Create a fork of the SFRA repository 

  2. Download the forked repository

  3. Checkout the integration branch

  4. Apply your code fix

  5. Create a pull request against the integration branch

## Submitting a pull request
  1. Create a branch off the integration branch.

       * To reduce merge conflicts, rebase your branch before submitting your pull request.
   
       * If applicable, reference the issue number in the comments of your pull request.
   
  2. In your pull request, include:

       * A brief description of the problem and your solution
   
       * (optional) Screen shots
   
       * (optional) Error logs
   
       * (optional) Steps to reproduce
   
  3. Grant SFRA team members access to your fork so we can run an automated test on your pull request prior to merging it into our integration branch.

       * From within your forked repository, find the 'Settings' link (see the site navigation on left of the page).
   
       * Under the settings menu, click 'User and group access'.
   
       * Add the new user to the input field under the heading 'Users' and give the new user write access.
   
  4. Indicate if there is any data that needs to be included with your code submission. 

  5. Your code should pass the automation process.

       * Lint your code:  
         `npm run lint` 	 
       * Run and pass the unit test:  
         `npm run test`
       * Run and pass the unit/intergration test:  
         `npm run test:integration`

## What to expect

After you submit your pull request, we'll look it over and consider it for merging.

As long as your submission has met the above guidelines, we should merge it in a timely manner.

Our sprints run for about two weeks; in that period of time, we typically review all pull requests, give feedback, and merge the request (depending on our current sprint priorities).

## SFRA team members 

To speed up the process of reviewing and merging your pull request, grant the following team members access to your fork:

  * SFRA team 
  
  * Jenkins automation - sg-jenkins
