import { Dispatch } from "redux"
import {AuthDispatchTypes,USER_REGISTER_LOADING,USER_REGISTER_ERROR,USER_LOGIN_LOADING,USER_LOGIN_ERROR,USER_LOGIN_SUCCESS,
    USER_GET_LOADING,
    USER_GET_ERROR,
    USER_GET_SUCCESS,
    USER_LOGOUT_LOADING,
    USER_LOGOUT_ERROR,
    USER_LOGOUT_SUCCESS,
    USER_GETNFTS_ERROR,
    USER_GETNFTS_LOADING,
    USER_GETNFTS_SUCCESS,
    USER_REGISTER_SUCCESS
} from "../../types/AuthActionTypes"
import axios from "axios"
import { AlertDispatchTypes, SHOW_ALERT } from "@/redux/types/AlertActionType"


export const RegisterUser = (name:string, email:string, password: string, password2:string, profileUrl:string) => async(dispatch: Dispatch<AuthDispatchTypes|AlertDispatchTypes>)=>{
    console.log("RegisterUser action called")
 try {
    dispatch({
        type:USER_REGISTER_LOADING,
        loading: true
    })
    const response = await axios.post(`${process.env.BACKEND_BASE_URL}/api/user/register`,{
        username:name,
        email:email,
        password:password,
        password2:password2,
        profileUrl:profileUrl
    })
    dispatch({
        type: USER_REGISTER_SUCCESS,
    })
    dispatch({
        type: SHOW_ALERT,
        payload: { message: "User Registration Success", status: "success"}
    })
    console.log(response.data,"response in register user")
 } catch (error:any) {
    console.log(error,"error in register user")
    dispatch({
        type:USER_REGISTER_ERROR,
        loading: false
    })
    dispatch({
        type: SHOW_ALERT,
        payload: { message: "Error in User Registration", status: "error"}
    })
 }
}

export const LoginUser = ( email:string, password: string ) => async(dispatch: Dispatch<AuthDispatchTypes|AlertDispatchTypes>)=>{
    console.log("LoginUser action called")
 try {
    dispatch({
        type:USER_LOGIN_LOADING
    })

    const response = await axios.post(`${process.env.BACKEND_BASE_URL}/api/user/login`,{
        email:email,
        password:password,
    })
    if(!response.data.token){
        dispatch({
            type:USER_LOGIN_ERROR
        }) 
    }
    dispatch({
        type:USER_LOGIN_SUCCESS,
        payload:response.data
    })
    dispatch({
        type: SHOW_ALERT,
        payload: { message: "User Login Success", status: "success"}
    })
    if(response.data.token !== ""){
      return response.data.token
    }
    
 } catch (error) {
    // console.log(error,"error in login user")
    dispatch({
        type:USER_LOGIN_ERROR
    })
    dispatch({
        type: SHOW_ALERT,
        payload: { message: "User Login failed", status: "error"}
    })
 }
}

export const GetUserDetails = (id:string) => async(dispatch: Dispatch<AuthDispatchTypes>)=>{
    console.log("GetUserDetails Action called")
    try {
        dispatch({
            type:USER_GET_LOADING
        })
         await axios.get(`${process.env.BACKEND_BASE_URL}/api/user/users/${id}`).then((res)=>{
            dispatch({
                type:USER_GET_SUCCESS,
                payload:res.data
            })
        }).catch((error)=>{
            dispatch({
                type:USER_GET_ERROR
            })  
        })
    } catch (error) {
        dispatch({
            type:USER_GET_ERROR
        })
    }
}


export const GetUserNfts = (id:string) => async(dispatch: Dispatch<AuthDispatchTypes>)=>{
    console.log("GetUserNfts Action called")
    try {
        dispatch({
            type:USER_GETNFTS_LOADING
        })
         await axios.get(`${process.env.BACKEND_BASE_URL}/api/nft/nfts/creator/${id}`).then((res)=>{
            dispatch({
                type:USER_GETNFTS_SUCCESS,
                payload:res.data
            })
        }).catch((error)=>{
            dispatch({
                type:USER_GETNFTS_ERROR
            })  
        })
    } catch (error) {
        dispatch({
            type:USER_GETNFTS_ERROR
        })
    }
}


export const LogoutUser = () => async(dispatch: Dispatch<AuthDispatchTypes|AlertDispatchTypes>) => {
    console.log("LogoutUser action called")
    try {
        dispatch({
            type:USER_LOGOUT_LOADING
        })
         await axios.post(`${process.env.BACKEND_BASE_URL}/api/user/logout`).then((res)=>{
            dispatch({
                type:USER_LOGOUT_SUCCESS,
                payload:res.data
            })
            dispatch({
                type: SHOW_ALERT,
                payload: { message: "User Logout Success", status: "success"}
            }) 
        }).catch((error)=>{
            dispatch({
                type:USER_LOGOUT_ERROR
            }) 
        })
    } catch (error) {
        dispatch({
            type:USER_LOGOUT_ERROR
        })
    }
}