# Team Roster Template Engine

## Description
The teamplate engine is a command-line application that allows a user to build a roster for their team, consisting of a manager plus any number of engineers and interns. The app prompts to user to provide basic information about each employee, and leverages templates to write this information to a roster page, saving the resulting .html file in an output directory.

## Usage
The template engine is run at the command line using [Node.js](https://nodejs.org/en/). Navigate to the directory containing app.js and package.json, and `npm install` the dependencies (inquirer and jest for testing).

Then run the application by typing `node app.js` and following the prompts, as shown below:

![template engine demo gif](/template-engine-demo.gif)

View as [.mp4 file](https://github.com/angelagongli/template-engine/blob/master/template-engine-demo.mp4) (larger).

## Tests
The tests for the template engine were pre-written by the Coding Boot Camp at UT, and were used to build the classes of employees in accordance with the principle of test-driven development. Type `npm run test` to run the tests.

## Credits
The [inquirer](https://www.npmjs.com/package/inquirer) module is used to collect user input at the command line, and the recursive prompting using inquirer in app.js was adapted from the code in [this blog post](http://www.penandpaperprogrammer.com/blog/2018/12/16/repeating-questions-with-inquirerjs) by Zachary Abresch.

[Bootstrap](https://getbootstrap.com/) is used to style the generated roster page, and the favicon image and icons were taken from the collection of icons at [Font Awesome](https://fontawesome.com/).

The design of the template engine is based on guidelines by the Coding Boot Camp at UT.

## License
Copyright (c) Angela Li. All rights reserved.
Licensed under the [MIT License](LICENSE).