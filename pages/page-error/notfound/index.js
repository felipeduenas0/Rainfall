import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {

    return (

        <div className="col-12 flex justify-content-center align-items-center" style={{height: '100vh'}}>

            <div className="col-12 md:col-8 text-center">

                <div className="card p-fluid">

                    <h1 className="font-bold mb-4">404</h1>

                    <div className="text-600 mb-3">El recurso solicitado no está disponible</div>

                    <Link href="/">
                        <p className="p-button p-component p-button-link">
                            <span className="p-button-label p-c">Regresar a la página anterior</span>
                        </p>
                    </Link>

                </div>

            </div>

        </div>

    );

};

export default NotFoundPage;
