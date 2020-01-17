import React from 'react';
import './App.css';

// путаница
// начало данных

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 8,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

// функция поиска

function isSearched(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

// компоненты

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value});
    console.warn(event.target.value);
  }

  onDismiss(id) {
    console.log(id);
    function isNotId(item) {
      return item.objectID !== id;
    };

    const updateList = this.state.list.filter(isNotId);
    this.setState({list: updateList});
  }

  render() {
    const {searchTerm, list} = this.state;
     return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange = {this.onSearchChange} 
        >
          Поиск
        </Search>
        <Table
          list={list}
          pattern = {searchTerm}
          onDismiss = {this.onDismiss}
        />
      </div>
    );
  }
}

  // коспонент поиск

class Search extends React.Component {
  render() {
    const { value, onChange, children } = this.props;
    return (
      <form>
        {children} <input
          type='text'
          value={value}
          onChange={onChange}
        />
      </form>
    );
  }
}

// компонент данных

class Table extends React.Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span> {item.author} </span>
            <span> {item.num_comments}</span>
            <span> {item.points}</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)}>
                Удалить
              </Button>
            </span>
          </div>)}
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    const {onClick, className='', children} = this.props;
    return (
      <button
        onClick = {onClick}
        className={className}
        type='button'
      >
        {children}
      </button>
    );
  }
}
export default App;
