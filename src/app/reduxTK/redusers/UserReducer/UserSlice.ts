import {UserModel} from "@/app/utils/models/userModel";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: UserModel = {
    gender: 'Мужчина',
    age: 0,
}

export const userSlice = createSlice({
    name: 'user', initialState, reducers: {
        addUser( state,action: PayloadAction<UserModel>) {
            state.gender = action.payload.gender;
            state.age = action.payload.age;
        }
    }
});

export const {addUser} = userSlice.actions;
export default userSlice.reducer;
