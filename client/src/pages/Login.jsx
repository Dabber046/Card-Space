import React, { useState } from 'react';

const Login = () => {
    const [showLoginBox, setShowLoginBox] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        setShowLoginBox(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);
        setShowLoginBox(false);
    };

    return (
        <div>
            <button onClick={handleLoginClick}>Log In</button>
            {showLoginBox && (
                <div style={{ border: '1px solid black', padding: '20px', width: '300px', margin: '20px auto' }}>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;
