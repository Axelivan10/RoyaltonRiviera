import { configureStore } from "@reduxjs/toolkit";
import { RouteInterface, UserInterface } from "../interfaces/redux/redux.interface";
import {userSlice} from "./slices/user";
import {routeSlice} from "./slices/routes";

export interface AppStore {
    user: UserInterface,
    route: RouteInterface
}

export  const store = configureStore<AppStore>({
    reducer: {
        user: userSlice.reducer,
        route: routeSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//AQUI ES DONDE GUARDAMOS TODO, CONFIGURAMOS NUESTRA STORE Y INSTANCIAMOS EL REDUCER.
