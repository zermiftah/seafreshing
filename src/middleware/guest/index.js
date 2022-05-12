import { useHistory } from 'react-router-dom';

const Guest = (props) => {
    console.log(localStorage.getItem('token'));
    const getToken = JSON.parse(localStorage.getItem('token'));
    const history = useHistory();

    if (getToken) {
        history.push('/HomeScreen');
    }

    return props.children
}

export default Guest;