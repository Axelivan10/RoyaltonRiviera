import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/redux/redux.interface";


export const  EmptyUserState: UserInterface = {
    id:0,
    email: '',
    password: '',
    name: '',
    code: '',
    role: 0,
    expiration:'',
    token: '',
    auth: false,
}

// const persistLocalStorageUser = (userInfo: UserInterface) =>{
//     const data = {
//         email: userInfo.email,
//         token: userInfo.token
//     };
//     localStorage.setItem('data', JSON.stringify(data));
// }

const persistLocalStorageAuth = (userInfo: UserInterface) =>{
    console.log()
    const token = userInfo.token
    localStorage.setItem('token',token);
}

const persistLocalStorageEmail = (userInfo: UserInterface) =>{
    const auth = String(userInfo.auth);
    localStorage.setItem('auth',auth);
}

const clearLocalStorageUser = () =>{
    localStorage.removeItem('token');    //LOGIN
    localStorage.removeItem('auth');   //EMAIL
    localStorage.removeItem('route');   //ROUTE

}


export const userSlice = createSlice({    //ESTAS SON MIS REDUCERS 
    name: 'user',
    initialState: localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email') as string) : EmptyUserState,
    reducers: {
        createUser: (state, action) =>{
            return action.payload.data;
        },
        updateUser: (state, action) =>{
            return { ...state, ...action.payload.data};
        },
        authUser: (state, action) =>{                                   //ESTE ES EL CHECK DEL LOGIN
            return persistLocalStorageAuth(action.payload.data);
        },
        authEmail: (state, action) =>{
            return persistLocalStorageEmail(action.payload.data);       //ESTE ES EL CHECK DEL EMAIL
        },
        resetUser: () => {
            clearLocalStorageUser();
            return EmptyUserState
        }
    }
});

export const {createUser, updateUser, resetUser, authUser, authEmail} = userSlice.actions;
export default userSlice.reducer;

//ESTE ES EL SLICE QUE ES UN PARTE DE TODOS NUESTROS REDUCERS. POR EJEMPLO ESTE ES USER (LOGIN/EMAIL)