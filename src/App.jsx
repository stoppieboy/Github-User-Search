import './App.css'
import { useState } from 'react'

const API_URL = 'https://api.github.com';

async function getUsers(query) {
    try{
        const response = await fetch(`${API_URL}/search/users?q=${query}`)
        const json = await response.json()
        return json.items || []
    } catch(e) {
        throw new Error(e);
    }
}

export default function App() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            onSearchSubmit();
            
        }
    }

    const onSearchSubmit = async () => {
        const results = await getUsers(query);
        setResults(results);
    }

    return (
        <main className='container'>
            <h1>GitHub User Search</h1>
            <input type="text" onKeyDown={handleKeyDown} onChange={(e) => setQuery(e.target.value)} value={query}/>
            <button onClick={onSearchSubmit}>Search</button>
            <h3>Results</h3>
            <ul>{results.map((user) => (
                <User key={user.login} avatar={user.avatar_url} url={user.html_url} username={user.login}/>
            ))}</ul>
        </main>
    )
}

// eslint-disable-next-line react/prop-types
function User({avatar, url, username}) {
    return(
        <div className='user'>
            <img src={avatar} alt="user_img" width="50" height="50"/>
            <a href={url} target='_blank' rel='noopener noreferrer'>{username}</a>
        </div>
    );
}