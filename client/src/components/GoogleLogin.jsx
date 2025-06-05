import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import API from '../utils/api';

export function GoogleAuth() {
    const { login } = useContext(AuthContext);

    return (
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
                const res = await API.post('/auth/google', {
                    token: credentialResponse.credential
                });
                login(res.data.user);
            }}
            onError={() => console.log('Login Failed')}
        />
    );
}