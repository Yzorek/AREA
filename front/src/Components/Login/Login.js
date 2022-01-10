import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    let navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();

        try {
            let body = {
                email: email,
                password: password
            }
            const response = await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/auth/login`, body);

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

            <button type={'submit'}>
                sign in
            </button>
        </form>
        <button onClick={() => navigate('/register')}>
            register
        </button>
        {isError && 'Error'}
    </div>
}