### Setup

1- run 'Meteor npm install' to install the project
2- run 'Meteor run' to run the project

### Architecture

The project was designed in the following manner:

1- MongoDB collection named exports, with 3 props: createdAt, progress and url
2- When creating an export, it is created without 'url' prop, and with progress = 0
3- it is then updated every second with additional 5 progress
4- when it finishes ie: it reaches 100, a url is generated randomely from the pool and assigned to the export. 
5- the export list is published and subsribed to in the frontend for reactivity.
6- a fast mode was added to quickly test the export functionality.
