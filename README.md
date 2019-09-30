
# vocalink-demo
The deliverable is compound by two folders: 
* backend. Contains the sources for the streaming application.
* frontend. Contains the sources for the frontend application.

## Backend

**Description:**

The backend application was developed using Java 11 + Spring 5 + Akka toolkit. Maven is used as a dependency management tool. The tests are executed with JUnit 5 Jupiter engine. 
The application receives a list of files to process. A transaction is compound of a list of the file paths of the files to read. The transaction will be successfull if all the files can be opened and read properly and none of them contain the token "#1234#".

Prerequisites to run the server.
1.	Maven ^3.0 installed
2.	JRE 11 installed 

To run the tests of the application:
1.	Open a terminal and point to the server directory.
2.	Set *JAVA_HOME* env variable to a JDK 11 home directory.
3.	Run *mvn –DTest=<test_file>  test*. This command will run a specific test under a test suite. If you want to run all the tests, just exec mvn test.

To install the application:
1.	Open a terminal and point to the server directory.
2.	Set *JAVA_HOME* env variable to a JDK 11 home directory.
3.	Run *mvn clean install*. This command will create a jar bundle under the target folder.

Tests are located under source folder ‘src/test/java’.

## Frontend

**Description:**

It was developed a SPA in React 16.9 + Typescript 3 using Node Package Manager 8 (NPM) as a dependency management tool. Webpack 4 was used as a module bundler to run the app locally using the webpack-dev-server and to build the app sources to deploy into production. Other tools were used:
*	SASS as a CSS preprocessor
* Jest to unit test the UI components
*	Enzyme to navigate over the UI components DOM tree and to compare the model values with the rendered values in the output DOM.
*	Ts linter to promote code quality assurance
* Yup library for form state handling
* Material-UI as a UI framework 

 Prerequisites to run the frontend.
* NPM ^8.0 installed

To run the frontend app:
1.	Open a terminal and point to the frontend directory
2.	Run *npm install*. This command will generate all the project dependencies in the node_modules folder.
3.	If you want to run the app in a browser, type *npm run start* and it will be launched by webpack dev server in the url http://localhost:4200.
4.	If you want to build the app for a production environment, type *npm run build* and sources will be generated under ‘dist‘ folder.

To run unit tests:
1.	Open a terminal and point to the frontend directory
2.	Run *npm run test*. 
3.	Test results will be displayed in the console output

To run end-to-end tests:
1.	Open a terminal and point to the frontend directory
2.	Run *npm run e2e*. 
3.	Test results will be displayed in the console output

### Considerations

* The tests are located in source files with name matching pattern **.test.tsx.
* The frontend app will retrieve data from the beers endpoint url parameter in the environment files.


## Some tasks remaining
1.	Unit test for some remaining components, such as the ErrorModal component. 
2.	Add some tests to test border use cases
3. Add a coverage analysis tool to get code coverage data after running tests
