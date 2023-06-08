import React, {useEffect} from 'react';
import MultipleFile from '../../../components/multiplefile/multiplefile';
import {useRouter} from 'next/router';

const EvapoTranspiration = () => {

    const router = useRouter();

    useEffect(() => {

        const session = JSON.parse(localStorage.getItem('session'));

        if (session === null || session.secret !== process.env.NEXT_PUBLIC_SECRET) {
            router.push('/page-error/access');
        }

    });

    return (

        <div className="grid p-fluid">

            <div className="col-12">

                <div className="card">

                    <h5 className="text-center mb-4">Imágenes de Evapotranspiración</h5>

                    <MultipleFile type={"evapotranspirationImages"}></MultipleFile>

                </div>

            </div>

        </div>

    );

}

export default EvapoTranspiration;
