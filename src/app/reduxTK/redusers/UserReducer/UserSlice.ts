import {UserModel} from "@/app/utils/models/userModel";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: UserModel = {
    userWeight: '',
}

export const userSlice = createSlice({
    name: 'user', initialState, reducers: {
setUserWeight(state, action: PayloadAction<string>) {
            state.userWeight = action.payload;
}

    }
});

export const {setUserWeight} = userSlice.actions;
export default userSlice.reducer;
