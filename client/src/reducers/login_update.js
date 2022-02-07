const initialState={_id: '48484954954545', name: 'Name', profile: './profile/profile.png', username: "username", about: 'Happy 😄 Day',gallery: "My Gallery"};
const updateData=(state=initialState,action)=>{
   if(action.type==="UPDATE"){
     return   state=action.payload;
   }
   else{return  state}
}
export default updateData;