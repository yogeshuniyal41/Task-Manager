import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, signupUser } from './UserAPI';
import { setAccessToken, setRefreshToken, removeTokens  } from '../utils/utils';
import { useSelector } from 'react-redux';

const initialState = {
    user: null,
    status: 'idle',
    error: null,
};

export const loginAsync = createAsyncThunk(
    'user/login',
    async (credentials, thunkAPI) => {
        try {
            const data = await loginUser(credentials);
            // Store tokens in secure storage
            setAccessToken(data.access_token);
            setRefreshToken(data.refresh_token);
            
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const signupAsync = createAsyncThunk(
    'user/signup',
    async (userDetails, thunkAPI) => {
        try {
            
            const data = await signupUser(userDetails);
            
            return data;
        } catch (error) {
           
            if (error.status === 409) {
                // User already exists error
                
                return thunkAPI.rejectWithValue('User already exists');
            } else {
                // Other errors
                return thunkAPI.rejectWithValue(error.response?.data || error.message);
            }
        }
    }
);

export const logoutAsync= createAsyncThunk('/user/logout',
    async(token,thunkAPI)=>{
        try {
            const data = await logoutUser(token);
            if(data.status===200)
                {
                    removeTokens();
                }
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
        
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'logging in...';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'logged in';
                state.user = action.payload.id;
                state.error = null;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'failed';
                
                state.error = action.error.message;
            })

            .addCase(signupAsync.pending, (state) => {
                state.status = 'Signing up.....';
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                
            })
            .addCase(logoutAsync.pending,(state)=>{
                state.status='logging out...';
            })
            .addCase(logoutAsync.fulfilled, (state,action)=>{
                state.status='logged out';
               
                state.user='null';
            } )
            .addCase(logoutAsync.rejected,(state,action)=>{
                state.status='failed';
                state.error=action.payload;
            })
            
    },
});

// Export the logout action and the user slice reducer

export default userSlice.reducer;




