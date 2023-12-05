import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QuestionsProvider } from './context/QuestionsContext';
import { UsersProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QuestionsProvider>
        <UsersProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UsersProvider>
    </QuestionsProvider>
);