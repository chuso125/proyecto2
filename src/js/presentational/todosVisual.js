import React from 'react';
import ReactDOM from 'react-dom';
import {Footer, FilterLink } from './filterVisual';

const getVisibleTodos = (todos, visibilityFilter) => {
  if(visibilityFilter === 'SHOW_ALL'){
    return todos;
  }

  if(visibilityFilter === 'SHOW_COMPLETED'){
    return todos.filter(t => t.completed);
  }

  if(visibilityFilter === 'SHOW_ACTIVE'){
    return todos.filter(t => !t.completed);
  }
}

const Todo = ({ text, completed, onTodoClicked, onDelete, todo, noteId, setModifiedAt }) => (  
  <li>
   
    <input type="checkbox" onClick={ 
      () => {
        onTodoClicked(todo, noteId);
        setModifiedAt(Date(), noteId); 
      }
    }/>
    <div class="todo"  
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}>{ text }</div>
    <div class="fa fa-close" onClick={ 
      () => {
        onDelete(todo, noteId);
        setModifiedAt(Date(), noteId); 
      }
    }></div>
  </li>
);

const TodoList = ({ todos, onTodoClicked, noteId, onDelete, setModifiedAt }) => (
  <ul>
    {
      todos.map(todo => (
        <Todo
          key={ todo.id }
          { ...todo }
          onTodoClicked={ onTodoClicked }
          onDelete={ onDelete }
          noteId={ noteId }
          setModifiedAt={ setModifiedAt }
          todo={ todo }/>
      ))
    }
  </ul>
);

const TodoNote = ({ title }) => (
  <div class="title">
    { title }
  </div>
);

const ColorPicker = ({ color, noteId, setColor, setModifiedAt }) => {
  let input;
  return(
  <input class="color" type="color" defaultValue={color} ref={ node => input = node } 
    onChange={ 
      () => {
        setColor(input.value, noteId );
        setModifiedAt(Date(), noteId);
      } 
    }/>
  );
}

const AddTodo = ({ onAddTodo, children, noteId, setModifiedAt }) => {
  let input;

  return (
    <div>
      <input class="addTodo" type="text" ref={ node => input = node } placeholder={ children } onKeyDown={
          (e) => { 
            if(e.keyCode == 13){
              onAddTodo(input.value, noteId);
              setModifiedAt(Date(), noteId);
              input.value = "";
            }
          }
        }/>
    </div>
  );
}

const AddTodoNote = ({ onAddNote, children }) => {
  let input;

  return (
    <div>
      <input type="text" ref={ node => input = node } placeholder={ children } onKeyDown={
          (e) => { 
            if(e.keyCode == 13){
              onAddNote(input.value);
              input.value = "";
            }
        }
      }
      />
    </div>
  );
}

const Delete = ({ setDeleted, setModifiedAt, noteId}) => (
  <div class="fa fa-close delete" onClick={ 
    () => {
      setDeleted(true,noteId);
      setModifiedAt(Date(),noteId);
    }
  }></div>
);

const TodoNotesList = ({ todoNotes, onAddTodo, onTodoClicked, onFilterClicked, onDelete, setColor, setDeleted, setModifiedAt }) => (
	  <span class="notes">
	    {
	      todoNotes.map(todoNote => (
	        <div
            class="note"
            style={ {backgroundColor: todoNote.color }}
	          key={ todoNote.id } >
	            <TodoNote
	              title={ todoNote.title } />

              <ColorPicker
                setColor={ setColor }
                color={ todoNote.color }
                noteId={ todoNote.id }
                setModifiedAt={ setModifiedAt }/>

              <Delete
                setDeleted={setDeleted }
                setModifiedAt={ setModifiedAt }
                noteId={ todoNote.id }/>

              <AddTodo
                onAddTodo={ onAddTodo }
                noteId={ todoNote.id }
                setModifiedAt={ setModifiedAt } >Add ToDo</AddTodo>

	            <TodoList
	              todos={ getVisibleTodos( todoNote.todos, todoNote.visibilityFilter ) }
	              onTodoClicked={ onTodoClicked }
                setModifiedAt={ setModifiedAt }
	              onDelete={ onDelete }
	              noteId={ todoNote.id } />

	            <Footer
	              currentVisibilityFilter={ todoNote.visibilityFilter } 
	              onFilterClicked={ onFilterClicked }
	              noteId={ todoNote.id }/>

	        </div>
	      ))
	    }
      <div class="clear"></div>
	  </span>
	);

export { Todo, getVisibleTodos, TodoList, AddTodo, TodoNotesList, AddTodoNote };
