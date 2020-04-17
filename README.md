# F1-Standings

ReactJs single page application with Redux. The application simply provides a UI for the F1 API ergast.com.

## Available Scripts

In the project directory, you can run:

###### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

###### `npm test`

Launches the test runner in the interactive watch mode.

Test files can be found alongside the implementation files with `test.ts` extension.

###### `npm run build`

Builds the app for production to the `build` folder.

## App Content

[**Components**](https://github.com/alpernakin/F1-Standings/tree/master/src/app/components)

Presentational components, which are isolated from the rest of the application.

[**Controllers**](https://github.com/alpernakin/F1-Standings/tree/master/src/app/controllers)

Controllers to manage data flow between components and avaiable data sources.

[**Pages**](https://github.com/alpernakin/F1-Standings/tree/master/src/app/pages)

The route components, which are matched with a path, see `appRoutes` [app file](https://github.com/alpernakin/F1-Standings/blob/master/src/App.tsx).

[**Redux**](https://github.com/alpernakin/F1-Standings/tree/master/src/app/redux)

Redux implementation takes place here. Actions and reducers are combined in `slice` files to simply the implementation with the help of [redux toolkit](https://redux-toolkit.js.org/).

[**Services**](https://github.com/alpernakin/F1-Standings/tree/master/src/app/services)

Services for API requests and caching. [Service container](https://github.com/alpernakin/F1-Standings/blob/master/src/app/services/container/service.container.ts) helps to deal with service dependencies throughout the application and tests.

[**Test**](https://github.com/alpernakin/F1-Standings/tree/master/src/app/test)

Common test mocks and dummy data.

[**Types**](https://github.com/alpernakin/F1-Standings/tree/master/src/app/types)

Common object types.

## Behaviour

Home page simply displays F1 winner standings for each season from 2005 to 2015. If the user clicks on a list item, it routes to the details page. The details page displays a list of races in the selected season.

The app caches the data to prevent unnecessary requests to the API. Please see [reducers](https://github.com/alpernakin/F1-Standings/tree/master/src/app/redux) and [f1 controller](https://github.com/alpernakin/F1-Standings/blob/master/src/app/controllers/f1.controller.ts).
