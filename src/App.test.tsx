import { render } from '@testing-library/react';
import App from './App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/redux/store';

////////////////
// TEST SUITE //
////////////////

describe('App Component', () => {

    it('should create', () => {
        let app = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>);
        expect(app).toBeTruthy();
    });
});