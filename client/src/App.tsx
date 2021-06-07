import React, { createRef, useCallback, useEffect, useState } from 'react';
import {Author} from './types/index';
import './styles/App.scss';
import AuthorList from './AuthorList';
import M from 'materialize-css';

const App:React.FC = () => {
  const [name, setName] = useState<string>('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const collapseRef = createRef<HTMLUListElement>();

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    if (collapseRef.current) {
      M.Collapsible.init(collapseRef.current, {accordion: false});      
    }
  }, [collapseRef])

  const getData = useCallback(async () => {
    try {
      const response = await fetch('/api/author/get');
      const data = await response.json();
      setAuthors(data);
    } catch (e) {
      console.log(e)
    }
  }, [])

  const handleClick = useCallback(async () => {    
    if (!name) return;
    try {
      const response = await fetch('/api/author/add', {
                method: 'POST',
                body: JSON.stringify({name}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
      const author = await response.json();
      setAuthors(author);
      setName('');
    } catch (e) {
      console.log(e)
    }
  }, [name])

  return (
    <div className="main">
      <h1 className="title">List of books by author</h1>
      <form className="form">
        <input 
          type="text" 
          placeholder="author" 
          value={name} 
          onChange={(e) => setName(e.target.value)} />
        <button 
          className="btn-custom" 
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}>
          add
          <i className="material-icons">person_add</i>
        </button>
      </form>
      
      {authors.length > 0 && (        
      <div className="content">
        <ul className="collapsible content__list" ref={collapseRef}>
        {authors.map((author:Author):React.ReactNode => (
          <AuthorList key={author._id} {...author} getNewArray={(author: Author[]) => setAuthors(author)}  />
          ))}
        </ul>
      </div>
      )}
    </div>
  );
}

export default App;
