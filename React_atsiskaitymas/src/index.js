import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QuestionsProvider } from './context/QuestionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QuestionsProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QuestionsProvider>
);