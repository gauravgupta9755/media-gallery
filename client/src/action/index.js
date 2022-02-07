 const updataLoginData=(data)=>{
    return {
        type:"UPDATE",
        payload:data
    }
}
const homeState=(data)=>{
    return{
        type:"home",
        payload:data
    }
}
 

export default updataLoginData;
export {homeState};