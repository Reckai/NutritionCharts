'use client';

import { Provider} from "react-redux";

import { setupStore } from "@/app/reduxTK/store";
import {PropsWithChildren} from "react";

export const GlobalProvider = ({children} : PropsWithChildren) => {
    return (
        <Provider store={setupStore()}>
            {children}
        </Provider>
    );
};


