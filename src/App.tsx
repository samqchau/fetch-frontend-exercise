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
  const [occupation, setOccupation] = useState('');
  const [state, setState] = useState('');
  
  const [formOccupations, setFormOccupations] = useState([]);
  const [formStates, setFormStates] = useState<IState[]>([]);
  const [formGetError, setFormGetError] = useState('');

  const handleOccupationChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setOccupation(e.target.value);
  }

  const handleStateChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  }

  const handleSubmit = (e:React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    //send request
  }

  useEffect(() => {
    async function fetchFormData (url:string) {
      try {
        let {data} = await axios.get(url);
        setFormOccupations(data.occupations);
        setFormStates(data.states);
      } catch (error) {
        setFormGetError('There was an error fetching the form data.');
      }
    }

    fetchFormData(url);
  }, [])
  
  return (
    <div className="h-full w-full pt-10 flex flex-col items-center">
      <form className="flex flex-col align-middle p-10 h-auto w-10/12 max-w-md bg-blue-300 rounded-md">
        <h2 className="font-medium text-xl text-center">Registration Info</h2>
        <label htmlFor='name'>Name </label>
        <input type="text" name="name"></input>
        <label htmlFor='email'>Email 
        </label>
          <input type="email" name="email"></input>
        <label htmlFor='password'>Password 
        </label>
          <input type="password" name="password"></input>
        <label htmlFor='occupation'>Occupation 
        </label>
          <select id="occupation" name="occupation" value={occupation} onChange={handleOccupationChange}>
            {formOccupations.map(occupation => <option key={occupation} value={occupation}>{occupation}</option>)}
          </select>
        <label htmlFor='state'>State 
        </label>
          <select id="state" name='state' value={state} onChange={handleStateChange} className="max-h-24">
            {formStates.map(state => <option key={state.name} value={state.name}>{state.name}</option>)}
          </select>
      </form>
    </div>  
  );
}

export default App;
