import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    let navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();

        try {
            let body = {
                email: email,
                password: password,
                username: username,
                firstName: firstName,
                lastName: lastName,
                auth: 'local',
            }
            const response = await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/auth/register`, body);

            localStorage.setItem('JWT', response.accessToken);
            navigate('/App')
        } catch (err) {
            if (err.response) {
                setIsError(true)
            }
        }
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div>
                Email:
                <input required value={email} alt={'Email'} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div>
                Password:
                <input required value={password} alt={'Password'} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div>
                username:
                <input required value={username} alt={'username'} onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div>
                firstName:
                <input required value={firstName} alt={'firstName'} onChange={(e) => setFirstName(e.target.value)}/>
            </div>

            <div>
                lastName:
                <input required value={lastName} alt={'lastName'} onChange={(e) => setLastName(e.target.value)}/>
            </div>

            <button type={'submit'}>
                register
            </button>
        </form>
        <button onClick={() => navigate('/login')}>
            sign in
        </button>
        {isError && 'Error'}
    </div>
}