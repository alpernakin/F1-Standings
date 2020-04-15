import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import standingReducer from './standing.slice';
import raceReducer from './race.slice';

export default configureStore({
    reducer: combineReducers({
        standings: standingReducer,
        races: raceReducer
    })
});