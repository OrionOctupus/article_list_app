import React from 'react';
import './App.css';

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

function isSearched(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

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
        <form>  
          <input 
            type='text'
            value={searchTerm}
            onChange = {this.onSearchChange} />
        </form>
          {list.filter(isSearched(searchTerm)).map(item =>
            <div key={item.objectID}> 
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span> {item.author} </span>
              <span> {item.num_comments}</span>
              <span> {item.points}</span>
              <span>
                <button
                  onClick={() => this.onDismiss(item.objectID)}
                  type="button"
                >
                  Отбросить
                </button>
              </span>
            </div>
        )}
      </div>
    );
  }

}

export default App;
