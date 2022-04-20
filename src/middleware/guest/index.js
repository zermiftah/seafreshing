import { useHistory } from 'react-router-dom';

const Guest = (props) => {
    console.log(localStorage.getItem('token'), "PROPS")
    
    const history = useHistory();
    if (!localStorage.getItem('token')){
        const getToken = JSON.parse(localStorage.getItem('token'));
        if (!getToken) {
            history.push('/');
        }
    }
    

    return props.children   
}

export default Guest;