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
                dispatch(logoutSuccess());
                navigate('/login');
                console.log('Logout success')
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