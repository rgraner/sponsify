import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../redux/actions/authenticationActions';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function logout() {
        try {
            const response = await fetch('/api/auth/logout', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 200) {
                console.log('Logout success')
                dispatch(logoutSuccess());
                // Clear local storage
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userData');
                localStorage.removeItem('redirectPath');
                navigate('/');
            } else {
            // handle error response
            }
        } catch (err) {
            console.error(err);
        }
        }
        logout();
    }, [dispatch, navigate]);

    return <div>Logging out...</div>;
}

export default Logout;