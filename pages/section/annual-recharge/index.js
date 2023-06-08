import React, {useEffect} from 'react';
import {Image} from 'primereact/image';
import {Panel} from 'primereact/panel';
import {useRouter} from "next/router";

const AnnualRecharge = () => {

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

                <div className="card flex justify-content-center align-items-center ">
                    <h5 className="mb-0">Mapa de Recarga Anual</h5>
                </div>

            </div>

            <div className="col-12 md:col-6">

                <div className="card flex justify-content-center align-items-center">

                    <div className="text-center">
                        <Image src="/images/out/Recarga anual/Recarga anual.png" alt="Image" width="300" preview/>
                        <h5 className="mt-1 mb-0">Mapa de recarga</h5>
                    </div>

                </div>

            </div>

            <div className="col-12 md:col-6">

                <div className="card flex justify-content-center align-items-center" style={{height: '100%'}}>

                    <Panel header="Información">
                        <p className="m-0 text-center">
                            El presente mapa hace referencia a la recarga anual de agua subterránea en una determinada
                            área. Se basa en datos hidrológicos y modelos matemáticos para mostrar la distribución
                            espacial de la recarga, indicando las zonas donde el agua de lluvia y otros aportes se
                            infiltran en el suelo y recargan los acuíferos.
                        </p>
                    </Panel>

                </div>

            </div>

        </div>

    );

};

export default AnnualRecharge;
