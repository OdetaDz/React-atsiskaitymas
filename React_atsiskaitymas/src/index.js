import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QuestionsProvider } from './context/QuestionsContext';
import { UsersProvider } from './context/UserContext';
import { AwnsersProvider } from './context/AwnsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AwnsersProvider>
        <QuestionsProvider>
            <UsersProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </UsersProvider>
        </QuestionsProvider>
    </AwnsersProvider>
);