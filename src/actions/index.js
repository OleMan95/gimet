let nextTodoId = 0;

export default{
  toggleTodo: id => {
    return {type: 'TOGGLE_TODO',id}
  },
  setVisibilityFilter: filter => {
    return {
      type: 'SET_VISIBILITY_FILTER',
      filter
    }
  },
  addTodo: text => {
    return {
      type: 'ADD_TODO',
      id: nextTodoId++,
      text
    }
  },
  VisibilityFilters: {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
  }
}