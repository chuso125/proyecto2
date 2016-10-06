const visibilityFilter = (state = {}, action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
    case 'SET_SEARCH':
      return {...action.payload};
    default:
      return state;
  }
}

export { visibilityFilter };