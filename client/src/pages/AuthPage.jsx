import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import '../styles/AuthPage.css'; // Create this CSS file (see step 3)

export default function AuthPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const { data } = await API.post(endpoint, formData);

            if (isLogin) {
                login(data.user, data.token);
                navigate('/cv'); // go to CV only after login
            } else {
                // After successful registration, switch to login form
                setIsLogin(true);
                setFormData({ username: '', email: '', password: '' }); // optional: clear form
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };


    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength="6"
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <div className="auth-toggle">
                    {isLogin ? (
                        <>
                            Don't have an account?{' '}
                            <button onClick={() => setIsLogin(false)}>Register</button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button onClick={() => setIsLogin(true)}>Login</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}