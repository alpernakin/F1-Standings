import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import standingReducer from './standings';
import raceReducer from './races';

export default configureStore({
    reducer: combineReducers({
        standings: standingReducer,
        races: raceReducer
    })
});