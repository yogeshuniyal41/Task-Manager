import {configureStore} from '@reduxjs/toolkit'

import UserSlice from './user/UserSlice';
import taskSlice from './task/taskSlice';


 const store = configureStore ({
    reducer:{
        task:taskSlice,
        user:UserSlice
    }
})

export default store;