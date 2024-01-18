import { createSlice } from "@reduxjs/toolkit";
import { RouteInterface } from "../../interfaces/redux/redux.interface";


export const  EmptyUserState: RouteInterface = {
    component: "",
}


const persistLocalStorageRoute = (routeInfo: RouteInterface) =>{
    const component = String(routeInfo);
    if(component){
        localStorage.setItem("route", component);   
    }
}

// const ChildrenLocalStorage = (routeInfo: RouteInterface) =>{
//     if (routeInfo.component) {
//         localStorage.setItem("route", routeInfo.component);
//     }
//     if (routeInfo.checker) {
//         localStorage.setItem("checker", routeInfo.checker);
//     }
// }


const persistRoute = () =>{
    localStorage.removeItem("route")
}


export const routeSlice = createSlice({    //ESTAS SON MIS REDUCERS 
    name: 'route',
    initialState: EmptyUserState,
    reducers: {
        createRoute: (state, action) =>{
            persistLocalStorageRoute(action.payload)   //SE RESOLVIO EL PEDO QUE TENIA, PARA QUE SE GUARDE EN MI ESTADO HAY QUE RETORNAR SOLO EL PAYLOAD
            return action.payload;                      //NO LA FUNCION O OTRA COSA
        },

        // childrenRoute: (state, action) =>{        
        //     return ChildrenLocalStorage(action.payload);
        // },

        resetRoute: () => {
            persistRoute();
            return EmptyUserState
        }
    }
});

export const {createRoute, resetRoute,} = routeSlice.actions;
export default routeSlice.reducer;

//ESTE ES EL SLICE HAY QUE REVISAR QUE PEDO PORQUE NO ESTA FUNCIONANDO NECESITAMOS QUE SE GUARDE EN EL LOCAL STORAGE DE MANERA CORRECTA EL COMPONENTE
// Y ASI CUANDO SE RECARGUE LA PAGINA NO SE VAYA A DASHBOARD