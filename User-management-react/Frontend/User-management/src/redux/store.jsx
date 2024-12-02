import {configureStore} from '@reduxjs/toolkit'
import usereducer from './userSlice'
import adminreducer from './adminSlice'

const store=configureStore({
    reducer:{
        user:usereducer,
        admin:adminreducer
    }
})
export default store