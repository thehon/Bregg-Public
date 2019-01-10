const initialState = {
  current: "MAP",
}



export default function mainstate(state = initialState, action){

  switch (action.type) {

    case 'MAINSTATE_CHANGE':
      return {...state, current: action.changeState}
    default:
      return state;

  }

}