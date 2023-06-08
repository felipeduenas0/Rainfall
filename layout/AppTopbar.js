import React, {forwardRef, useContext, useImperativeHandle, useRef} from 'react';
import {classNames} from 'primereact/utils';
import {LayoutContext} from './context/layoutcontext';
import Link from 'next/link';
import {Button} from 'primereact/button';
import {useRouter} from 'next/router';

const AppTopbar = forwardRef((props, ref) => {

    const router = useRouter();

    const {layoutConfig, layoutState, onMenuToggle, showProfileSidebar} = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const handleSignOff = () => {
        localStorage.removeItem('session');
        router.push('/');
    }

    return (

        <div className="layout-topbar">

            <Link href="/section/precipitation" className="layout-topbar-logo flex justify-content-center">
                <img src="/favicon.ico" width="40px" alt="logo"/>
                <span>HydroTrack</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button"
                    onClick={onMenuToggle}>
                <i className="pi pi-bars"/>
            </button>

            <button ref={topbarmenubuttonRef} type="button"
                    className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v"/>
            </button>

            <div ref={topbarmenuRef}
                 className={classNames('layout-topbar-menu', {'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible})}>
                <Button label="Cerrar sesión" icon="pi pi-sign-in" onClick={handleSignOff}/>
            </div>

        </div>

    );

});

export default AppTopbar;
