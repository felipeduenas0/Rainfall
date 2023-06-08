import React, {useEffect} from 'react';
import Login from '../pages/auth/login/index';
import {useRouter} from "next/router";

const CustomLogin = () => {

    const router = useRouter();

    useEffect(() => {

        const session = JSON.parse(localStorage.getItem('session'));

        if (session && session.secret === process.env.NEXT_PUBLIC_SECRET) {
            router.push('/section/precipitation');
        }

    });

    return <Login/>;
};

CustomLogin.getLayout = function getLayout(page) {
    return page;
};

export default CustomLogin;
