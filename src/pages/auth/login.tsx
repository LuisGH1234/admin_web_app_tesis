import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/auth/actions';
import { useSelector } from '../../lib/hooks/store';
import { authHelper } from '../../lib/helpers';
import { paths } from '../../router';

export const Login: FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loggedInUser = useSelector(state => state.auth.loggedInUser);

    useEffect(() => {
        console.log(loggedInUser);
    }, [loggedInUser]);

    const handleLogin = () => {
        console.log('click');
        if (email === '' || password === '') return;
        login(email, password);
    };

    const goToContactUs = () => {
        history.push(paths.CONTACT_US);
    };

    return (
        <div>
            <label htmlFor="email-input">Email:</label>
            <input id="email-input" value={email} onChange={e => setEmail(e.target.value)} />
            <br />
            <label htmlFor="password-input">Contraseña:</label>
            <input
                id="password-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleLogin}>Ingresar</button>
            <button onClick={goToContactUs}>Contactanos</button>
            <div>{loggedInUser.loading ? 'cargando' : ''}</div>
            <div>{JSON.stringify(loggedInUser.value)}</div>
            <br />
            <label>TOKEN</label>
            <br />
            <p>{loggedInUser.value && authHelper.getAccessToken()}</p>
        </div>
    );
};
