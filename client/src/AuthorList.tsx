import React, { useCallback, useState } from 'react';
import { Author } from './types';

type AuthorProps = Author & {    
    getNewArray: (arr: Author[]) => void
}

const AuthorList:React.FC<AuthorProps> = ({_id, name, books, getNewArray}) => {
    const [titleBook, setTitleBook] = useState<string>('');

    const handleClickDelete = useCallback(async () => {    
        if (!name) return;
        try {
          const response = await fetch('/api/author/delete', {
                    method: 'POST',
                    body: JSON.stringify({_id}),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
          const author = await response.json();
          getNewArray(author);
        } catch (e) {
          console.log(e)
        }
    }, [])

    const handleClickAddBook = useCallback(async () => {
        if (!titleBook) return;
        try {
            const response = await fetch('/api/author/update', {
                      method: 'POST',
                      body: JSON.stringify({_id, title: titleBook}),
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      },
                  })
            const author = await response.json();
            getNewArray(author);
            setTitleBook('');
        } catch (e) {
            console.log(e);
        }
    }, [titleBook])

    const handleClickRemoveBook = useCallback(async (title:string) => {
        try {
            const response = await fetch('/api/author/remove', {
                      method: 'POST',
                      body: JSON.stringify({_id, title}),
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      },
                  })
            const author = await response.json();
            getNewArray(author);
        } catch (e) {
            console.log(e);
        }
    }, [])

    return (
        <li className="active collapsible-custom">
            <div className="collapsible-header collapsible-custom__header">
                <i className="material-icons">person</i>
                <span className="collapsible-custom__header__title">{name}</span>
                <button 
                className="btn-custom" 
                onClick={(e) => {
                    e.preventDefault();
                    handleClickDelete();
                }}>
                <i className="material-icons">delete</i>
                </button>

            </div>
            <div className="collapsible-body collapsible-custom__body">
                {books.length > 0 && (
                    <ul className="collapsible-custom__body__collection">
                        {books.map((book:string, idx:number) => (
                            <li key={idx}>
                                <i className="material-icons">library_books</i>
                                <span>{book}</span>
                                <i className="material-icons action-icon"
                                onClick={() => handleClickRemoveBook(book)} >delete</i>
                            </li>
                        ))}
                    </ul>
                )}
                <form>
                    <input 
                        type="text" 
                        placeholder="add book..."
                        value={titleBook}
                        onChange={(e) => setTitleBook(e.target.value)} />
                    <button 
                    className="btn-custom" 
                    onClick={(e) => {
                        e.preventDefault();
                        handleClickAddBook();
                    }}>
                    add
                    <i className="material-icons">note_add</i>
                    </button>
                </form>
            </div>
        </li>
    )
}

export default AuthorList;
