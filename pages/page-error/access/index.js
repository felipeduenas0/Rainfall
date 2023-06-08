import React from 'react';
import Link from "next/link";

const AccessDeniedPage = () => {

    return (

        <div
            className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">

            <div className="flex flex-column align-items-center justify-content-center">

                <div style={{
                    borderRadius: '56px',
                    padding: '0.3rem',
                    background: 'linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)'
                }}>

                    <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
                         style={{borderRadius: '53px'}}>

                        <div className="flex justify-content-center align-items-center bg-pink-500 border-circle"
                             style={{height: '3.2rem', width: '3.2rem'}}>
                            <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>

                        </div>

                        <h1 className="text-900 font-bold text-5xl mb-3">Acceso denegado</h1>
                        <div className="text-600 mb-3">No tienes los permisos necesarios.</div>

                        <Link href="/">
                            <p className="p-button p-component p-button-link">
                                <span className="p-button-label p-c">Regresar a la página anterior</span>
                            </p>
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default AccessDeniedPage;
