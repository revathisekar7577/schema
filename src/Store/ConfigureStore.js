import React from 'react';
import { configureStore } from '@reduxjs/toolkit'
import SegementReducer from './Reducer/SegementReducer';


export const ConfigureStore = configureStore({
        reducer:{
            SegementReducer: SegementReducer
    }
})


