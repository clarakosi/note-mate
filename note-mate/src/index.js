import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './Component/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './Reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { BrowserRouter as Router} from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
const client = new ApolloClient({
    uri: "http://127.0.0.1:8000/graphql/"
  });
  
//   client
//   .query({
//     query: gql`
//       {
//         notes {
//           id
//           title
//         }
//       }
//     `
//   })
// .then(result => console.log(result));
ReactDOM.render(
<Provider store={store}>
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
</Provider>, document.getElementById('root'));
