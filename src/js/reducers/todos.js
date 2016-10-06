const todoNotes = (state = [], action) =>{
  switch (action.type) {
    case 'ADD_TODO_NOTE':
      return [
        ...state,
        todoNote(undefined,action)
      ];
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
    case 'SET_TODO_VISIBILITY_FILTER':
    case 'SET_COLOR':
    case 'DELETE_TODO':
    case 'SET_TODO_TEXT':
    case 'SET_NOTE_TODO_DELETED':
    case 'SET_TODO_NOTE_MODIFIED_AT':
      return state.map(t => todoNote(t, action));
    default:
      return state;
  }
}
const todoNote = (state = {}, action) =>{
  switch (action.type) {
    case 'ADD_TODO_NOTE':
      return {
        ...action.payload,
        todos: []
      };
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
    case 'DELETE_TODO':
    case 'SET_TODO_TEXT':
      if(state.id === action.payload.noteId){
        return {
          ...state,
          todos: todos(state.todos, action)
        };
      } 
    case 'SET_TODO_VISIBILITY_FILTER':
      if(state.id === action.payload.noteId){
        return {
          ...state,
          visibilityFilter: action.payload.visibilityFilter
        };
      } 
    case 'SET_NOTE_TODO_DELETED':
      if(state.id === action.payload.noteId){
        return {
          ...state,
          deleted: action.payload.deleted
        };
      }
    case 'SET_COLOR':
      if(state.id === action.payload.noteId){
        return {
          ...state,
          color: action.payload.color
        };
      } 
    case 'SET_TODO_NOTE_MODIFIED_AT':
      if(state.id === action.payload.noteId){
        return {
          ...state,
          modifiedAt: action.payload.modifiedAt
        };
      }    
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
    case 'SET_TODO_TEXT':    
      return state.map(t => todo(t, action));
    case 'DELETE_TODO':
      let ret = state;
      for (var i = 0; i < ret.length; i++) {
        if(ret[i].id == action.payload.id){
          ret.splice(i,1);
          return ret;
        }
      };
    default:
      return state;
  }
}

const todo = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        ...action.payload,
        completed: false
      };
    case 'TOGGLE_TODO':
      if(state.id === action.payload.id){
        return {
          ...state,
          completed: !state.completed
        };
      }
    case 'SET_TODO_TEXT':
      if(state.id === action.payload.id){
        return {
          ...state,
          text: action.payload.text
        };
      }

    default:
      return state;
  }
}

export { todoNotes };