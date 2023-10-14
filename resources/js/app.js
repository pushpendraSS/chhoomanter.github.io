/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
  

// import React from 'react';
// import ReactDOM from 'react-dom';
// // import UserForm from './components/UserForm';
// import UserList from './components/UserList';

// if (document.getElementById('app')) {
//     ReactDOM.render(<UserList />, document.getElementById('app'));
// }

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

// import Main from './Main';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserForm />} />
                <Route path="/users" element={<UserList />} />
            </Routes>
        </Router>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}

