import { useState } from 'react';
import LoginComponent from '../login/login';
import RegComponent from '../login/registration';

function Login() {
    const [isLoginPage, setIsLoginPage] = useState(true);

    return isLoginPage ? (
        <LoginComponent changeLoginPage={setIsLoginPage} />
    ) : (
        <RegComponent changeLoginPage={setIsLoginPage} />
    );
}

export default Login;
