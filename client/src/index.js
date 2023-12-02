import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StudentContextProvider } from './Contexts/studentContext';
import { FacultyContextProvider } from './Contexts/facultyContext';
import { ReviewContextProvider } from './Contexts/review.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <FacultyContextProvider>
    <ReviewContextProvider>
      <StudentContextProvider>
         <App />
      </StudentContextProvider>
    </ReviewContextProvider>
    </FacultyContextProvider>
    </BrowserRouter>
  //</React.StrictMode> 
);


