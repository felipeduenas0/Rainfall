import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {Panel} from 'primereact/panel';
import {Image} from "primereact/image";

const OptionalResults = () => {

    const router = useRouter();

    useEffect(() => {

        const session = JSON.parse(localStorage.getItem('session'));

        if (session === null || session.secret !== process.env.NEXT_PUBLIC_SECRET) {
            router.push('/page-error/access');
        }

    });

    const inpet = [
        {
            month: 'Enero',
            picture: '/images/out/inpet/Enero.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Febrero',
            picture: '/images/out/inpet/Febrero.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Marzo',
            picture: '/images/out/inpet/Marzo.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Abril',
            picture: '/images/out/inpet/Abril.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Mayo',
            picture: '/images/out/inpet/Mayo.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Junio',
            picture: '/images/out/inpet/Junio.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Julio',
            picture: '/images/out/inpet/Julio.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Agosto',
            picture: '/images/out/inpet/Agosto.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Septiembre',
            picture: '/images/out/inpet/Septiembre.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Octubre',
            picture: '/images/out/Mapas de recarga/Octubre.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Noviembre',
            picture: '/images/out/inpet/Noviembre.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Diciembre',
            picture: '/images/out/inpet/Diciembre.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
    ];

    const evap_real = [
        {
            month: 'Enero',
            picture: '/images/out/Evapotranspiración real/Enero.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Febrero',
            picture: '/images/out/Evapotranspiración real/Febrero.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Marzo',
            picture: '/images/out/Evapotranspiración real/Marzo.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Abril',
            picture: '/images/out/Evapotranspiración real/Abril.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Mayo',
            picture: '/images/out/Evapotranspiración real/Mayo.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Junio',
            picture: '/images/out/Evapotranspiración real/Junio.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Julio',
            picture: '/images/out/Evapotranspiración real/Julio.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Agosto',
            picture: '/images/out/Evapotranspiración real/Agosto.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Septiembre',
            picture: '/images/out/Evapotranspiración real/Septiembre.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Octubre',
            picture: '/images/out/Evapotranspiración real/Octubre.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Noviembre',
            picture: '/images/out/Evapotranspiración real/Noviembre.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            month: 'Diciembre',
            picture: '/images/out/Evapotranspiración real/Diciembre.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
    ];
    
    return (

        <div className="grid p-fluid">

            <div className="col-12">

                <div className="card flex justify-content-center align-items-center ">
                    <h5 className="mb-0">Resultados Opcionales</h5>
                </div>

                <Panel header="INPET" className="mt-5" toggleable={true} collapsed={true}>
                    <div className="grid">

                        {inpet.map((map, index) => (

                            <div key={index} className="flex justify-content-center col-12 md:col-4 xl:col-3 mt-3">
                                <div className="text-center">
                                    <Image src={map.picture} alt="Image" width="200" preview/>
                                    <h5 className="mt-1 mb-2">{map.month}</h5>
                                </div>
                            </div>

                        ))}

                    </div>
                </Panel>

                <Panel header="EVAPOTRANSPIRACIÓN REAL" className="mt-5" toggleable={true} collapsed={true}>
                    <div className="grid">

                        {evap_real.map((map, index) => (

                            <div key={index} className="flex justify-content-center col-12 md:col-4 xl:col-3 mt-3">
                                <div className="text-center">
                                    <Image src={map.picture} alt="Image" width="200" preview/>
                                    <h5 className="mt-1 mb-2">{map.month}</h5>
                                </div>
                            </div>

                        ))}

                    </div>
                </Panel>

            </div>

        </div>

    );

};

export default OptionalResults;
