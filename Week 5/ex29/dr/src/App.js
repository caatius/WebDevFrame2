import './App.css';
import axios from 'axios';
import {
  useEffect,
  useState
} from 'react';

const URL = 'http://localhost:3002/'

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        console.log(response.data)
        setPersons(response.data)
      }).catch(error => {
        alert(error)
      })
  }, []);

const remove = (name) => {
  axios.delete(`${URL}delete/${name}`)
  .then(() => {
    const tempPersons = [...persons]
    tempPersons.splice(tempPersons.findIndex(e => e.name===name),1)
    setPersons(tempPersons)
  }).catch(error => {
    alert(error)
  })
}

  const save = (e) => {
    e.preventDefault()
    const json = JSON.stringify({name: newName})
    axios.post(URL + 'new',json,{
      headers: {
        'Content-type' : 'application/json'
      }
    }).then((response) => {
      setPersons(persons => [...persons,response.data])
      setNewName('')
    }).catch(error => {
      alert(error)
    })
  }

  return (
    <div>
      <h3>Calling node routes demo</h3>
      <form onSubmit={save}>
        <input value={newName} onChange={e => setNewName(e.target.value)} />
        <button>Save</button>
      </form>
      <ul>
        {persons.map(person => (
          <li>{person.name} <a href="#" onClick={() => remove(person.name)}>Delete</a></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
