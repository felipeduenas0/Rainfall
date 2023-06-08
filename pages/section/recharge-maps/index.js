import React, {useEffect, useState} from 'react';
import {Image} from 'primereact/image';
import {ProductService} from '../../../services/api';
import {useRouter} from "next/router";

const RechargeMaps = () => {

    const router = useRouter();

    useEffect(() => {

        const session = JSON.parse(localStorage.getItem('session'));

        if (session === null || session.secret !== process.env.NEXT_PUBLIC_SECRET) {
            router.push('/page-error/access');
        }

    });

    const [geographic_maps, set_geographic_maps] = useState([]);

    useEffect(() => {
        set_geographic_maps(ProductService.getMaps);
    }, []);

    return (

        <div className="grid p-fluid">

            <div className="col-12">

                <div className="card">

                    <h5 className="text-center">Mapas de Recarga Mensual</h5>

                    <div className="grid">

                        {geographic_maps.map((map, index) => (

                            <div key={index} className="flex justify-content-center col-12 md:col-6 xl:col-4 mt-3">
                                <div className="text-center">
                                    <Image src={map.picture} alt="Image" width="230" preview/>
                                    <h5 className="mt-1 mb-2">{map.month}</h5>
                                </div>
                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );

};

export default RechargeMaps;
