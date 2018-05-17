// import ApolloClient from "apollo-boost";
// import gql from "graphql-tag";
// import { graphql } from 'react-apollo';
// import { NULL } from "graphql/language/kinds";
import axios from 'axios';

export const GETNOTES = 'GETNOTES';

export const NOTEADDED = 'NOTEADDED';
export const NOTEUPDATED = 'NOTEUPDATED';
export const NOTEDELETED = 'NOTEDELETED';

export const LOGGEDIN = 'LOGGEDIN';
export const LOGGEDOUT = 'LOGGEDOUT';

let uri = "http://127.0.0.1:8000/graphql/";
// const client = new ApolloClient({
//     uri: "http://127.0.0.1:8000/graphql/"
// });

export const getNotes = notes => {
    return dispatch => {
        dispatch({type: GETNOTES, payload: notes})
    }
}
export const addNote = note => {
    return {
        type: NOTEADDED,
        payload: note
    }
}

export const updateNote = note => {
    return {
        type: NOTEUPDATED,
        payload: note
    }
}

export const deleteNote = id => {
    return {
        type: NOTEDELETED,
        payload: id
    }
}

export const loggedIn = (token) => {
    return dispatch => {
        dispatch({type: LOGGEDIN})
        window.localStorage.setItem('Authorizatioin', token);
    }
}

export const loggedOut = () => {
    return {
        type: LOGGEDOUT
    }
}


// export const GETTINGNOTES = 'GETTINGNOTES';
// export const NOTESRECEIVED = 'NOTESRECEIVED';

// export const ADDINGNOTE = 'ADDINGNOTE';

// export const UPDATINGNOTE = 'UPDATINGNOTE';

// export const DELETINGNOTE = 'DELETINGNOTE';

// export const ERROR = 'ERROR';


// actions for when the server is set up

// const url = 'url goes here'

// export const getNotes = () => {
//     return dispatch => {
//     dispatch({type: GETTINGNOTES})
//     axios.get(url)
//     .then(response => {dispatch({type: NOTESRECEIVED, payload: response.data})})
//     .catch(error => {dispatch({type: ERROR, payload: error})});
//     }
// }

// export const addNote = note => {
//     return dispatch => {
//         dispatch({type: ADDINGNOTE})
//         axios.post(url, note)
//         .then(response => {dispatch({type: NOTEADDED, payload: response.data})})
//         .catch(error => {dispatch({type: ERROR, payload: error})});
//     }
// }

// export const updateNote = (note, id) => {
//     return dispatch => {
//         dispatch({type: UPDATINGNOTE})
//         axios.put(`${url}/${id}`)
//         .then(response => {dispatch({type: NOTEUPDATED, payload: response.data})})
//         .catch(error => {dispatch({type: ERROR, payload: error})});
        
//     }
// }

// export const deleteNote = (note, id) => {
//     return dispatch => {
//         dispatch({type: DELETINGNOTE})
//         axios.delete(`${url}/${id}`)
//         .then(response => {dispatch({type: NOTEDELETED, payload: response.data})})
//         .catch(error => {dispatch({type: ERROR, payload: error})});
//     }
// }