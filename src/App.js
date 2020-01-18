import React from 'react';
import './App.css';


const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '10';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;
console.log(url);
// путаница
// начало данных

// const list = [
//   {
//     title: 'React',
//     url: 'https://reactjs.org/',
//     author: 'Jordan Walke',
//     num_comments: 8,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: 'Redux',
//     url: 'https://redux.js.org/',
//     author: 'Dan Abramov, Andrew Clark',num_comments: 2,
//     points: 5,
//     objectID: 1,
//   },
// ];

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

    // this.state = {
    //   list: list,
    //   searchTerm: '',
    // };
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this); 
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }


  onSearchSubmit(event) {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  setSearchTopStories(result) {
    const {hits, page} = result;

    const oldHits = page !==0
      ? this.state.result.hits
      : [];

      const updateHits = [
        ...oldHits,
        ...hits
      ];

      this.setState({
        result: {hits: updateHits, page}
      });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
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

    const updateHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.rusult, hits: updateHits}
    });
  }

  render() {
    console.log('этот state');
    console.log(this.state);
    const {searchTerm, result} = this.state;
    const page = (result&&result.page) || 0;
    
     return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange = {this.onSearchChange}
            onSubmit = {this.onSearchSubmit} 
          >
            Поиск
          </Search>
        </div>
        { result 
        ? <Table
          list={result.hits}
          onDismiss = {this.onDismiss}
        />
        : null
        }   
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page+1)}>
            Больше истории
          </Button>
        </div>
      </div>
    );
  }
}

  // компонент поиск
// преобразованный в функциональный компонент без состояния ()
function Search(props){
  const { value, onChange, onSubmit, children } = props;
  return (
    <form onSubmit = {onSubmit}>
      <input
        type='text'
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        {children}
      </button>
    </form>
  );
}

// компонент данных
// преобразованный в стрелочную функцию

const Table = ({ list, onDismiss }) => {
    return (
      <div className="table">
        {list.map(item =>
          <div className="table-row" key={item.objectID}>
            <span style={{width: '40%'}}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{width: '30%'}}>
              {item.author}
            </span>
            <span style={{width: '10%'}}>
             {item.num_comments}
            </span>
            <span style={{width: '10%'}}>
              {item.points}
            </span>
            <span style={{width: '10%'}}>
              <Button className="button-inline" onClick={() => onDismiss(item.objectID)}>
                Удалить
              </Button>
            </span>
          </div>)}
      </div>
    );
}

// компонент кнопка преобразован в стрелочную функцию и сокращен return 
const Button = ({onClick, className='', children}) =>
  <button
    onClick={onClick}
    className={className}
    type='button'
  >
    {children}
  </button>

export default App;
