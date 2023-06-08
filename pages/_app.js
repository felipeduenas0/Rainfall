import React, {useEffect} from 'react';
import {StoreProvider} from "../store/storeprovider";
import {LayoutProvider} from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import Login from './index'
import NotFound from '../pages/404'
import Access from "./page-error/access";
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';

export default function MyApp({Component, pageProps}) {

    useEffect(() => {

        if (typeof window !== 'undefined') {

            const loader = document.getElementById('globalLoader');

            if (loader) {

                setTimeout(() => {
                    loader.remove();
                    document.body.style.overflow = 'auto';
                }, 2000);

            }
        }
    }, []);

    if (Component === Login || Component === NotFound || Component === Access) {
        return (
            <StoreProvider>
                <LayoutProvider>
                    <Component {...pageProps} />
                </LayoutProvider>
            </StoreProvider>
        );
    }

    return (
        <StoreProvider>
            <LayoutProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </LayoutProvider>
        </StoreProvider>
    );

}