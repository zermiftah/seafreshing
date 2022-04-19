import { useHistory } from 'react-router-dom';

const Auth = (props) => {
    const getToken = JSON.parse(localStorage.getItem('token'));
    // const userData = JSON.parse(localStorage.getItem('user-data'));
    const history = useHistory();

    if (!getToken) {
        history.push('/login');
    }

    return props.children
}

export default Auth;