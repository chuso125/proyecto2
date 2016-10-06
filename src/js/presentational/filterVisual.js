import React from 'react';
import ReactDOM from 'react-dom';

const FilterLink = ({ visibilityFilter, currentVisibilityFilter, onFilterClicked, noteId, children }) => {

  if(visibilityFilter === currentVisibilityFilter){
    return <strong>{ children }</strong>;
  }

  return <a
    href="#"
    onClick={
      (e) => {
        e.preventDefault();
        onFilterClicked(visibilityFilter, noteId );
      }
    }>
    { children }</a>
}

const Footer = ({ currentVisibilityFilter, onFilterClicked, noteId }) => (
  <div class="todoFilter">
    Show:
    <FilterLink
      visibilityFilter="SHOW_ALL"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }
      noteId={ noteId }>All</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_COMPLETED"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }
      noteId={ noteId }>Completed</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_ACTIVE"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }
      noteId={ noteId }>Active</FilterLink>
  </div>
);

const GeneralFooter = ({ currentVisibilityFilter, onFilterClicked }) => (
  <div>
    Show:
    <FilterLink
      visibilityFilter="SHOW_ALL"
      currentVisibilityFilter={ currentVisibilityFilter.visibilityFilter }
      onFilterClicked={ onFilterClicked }
      >All</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_NOTES"
      currentVisibilityFilter={ currentVisibilityFilter.visibilityFilter }
      onFilterClicked={ onFilterClicked }
      >Notes</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_TODO_NOTES"
      currentVisibilityFilter={ currentVisibilityFilter.visibilityFilter }
      onFilterClicked={ onFilterClicked }
      >ToDo Notes</FilterLink>
  </div>
);

const Search = ({ currentVisibilityFilter, setSearch }) => {
  let input;
  return(
  <input type="text" placeholder="Search" defaultValue={currentVisibilityFilter.search} ref={ node => input = node } 
    onChange={ 
      () => {
        setSearch( input.value );
      } 
    }/>
  );
}

const getVisibleElements = (elements, visibilityFilter, option) => {
  let ret = [];
  for (var i = 0; i < elements.length; i++) {
    if( elements[i].title.includes(visibilityFilter.search) && elements[i].deleted == false)
      ret.push(elements[i]);
  };
  if(visibilityFilter.visibilityFilter != undefined && (visibilityFilter.visibilityFilter === 'SHOW_ALL' || visibilityFilter.visibilityFilter.includes(option))){
    return ret;
  }else
    return [];
}


export { FilterLink, Footer, GeneralFooter, getVisibleElements, Search };