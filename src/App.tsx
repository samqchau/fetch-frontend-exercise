import React, {useState, useEffect} from 'react';
import axios from 'axios';

const url = 'https://frontend-take-home.fetchrewards.com/form'

interface IState {
  name: string,
  abbreviation: string
}

function App():JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState<string[]>([]);
  const [state, setState] = useState(null);
  
  const [formOccupations, setFormOccupations] = useState([]);
  const [formStates, setFormStates] = useState<IState[]>([]);

  const handleSubmit = (e:React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    //send request
  }

  useEffect(() => {
    async function fetchFormData (url:string) {
      let {data} = await axios.get(url);
      console.log(data);
    }

    fetchFormData(url);
  }, [])
  
  return (
    <div className="h-full w-full pt-10 flex flex-col items-center">
      <form className="flex flex-col align-middle p-10 h-auto w-10/12 max-w-md bg-blue-300 rounded-md">
        <h2>Registration Info</h2>
        <label htmlFor='name'>Name: </label>
        <input type="text" name="name"></input>
        <label htmlFor='email'>Email: 
        </label>
          <input type="email" name="email"></input>
        <label htmlFor='password'>Password: 
        </label>
          <input type="password" name="password"></input>
        <label htmlFor='occupation'>Occupation: 
        </label>
          <input type="select" name="occupation">
            {}
          </input>
        <label htmlFor='state'>State: 
        </label>
          <input type="select" name="state">
            {}
          </input>
      </form>
    </div>  
  );
}

export default App;
