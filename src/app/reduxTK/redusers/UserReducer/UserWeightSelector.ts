import {RootState} from "@/app/reduxTK/store";

export const getUserWeight = (state: RootState) => state.user.weight;
