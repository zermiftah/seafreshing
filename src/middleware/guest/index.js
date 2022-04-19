import { useHistory } from 'react-router-dom';

const Guest = (props) => {
    const getToken = JSON.parse(localStorage.getItem('token'));
    const history = useHistory();

    if (getToken) {
        history.push('/');
    }

    return props.children
}

export default Guest;