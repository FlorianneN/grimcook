export default function(userId= "", action){
  if(action.type == 'addId'){
    return action.userId
} else {
    return userId
}
}