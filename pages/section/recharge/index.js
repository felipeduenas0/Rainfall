import React, {useEffect, useState} from 'react';
import SingleFile from '../../../components/singlefile/singlefile';
import {TabMenu} from "primereact/tabmenu";
import {useRouter} from "next/router";

const Recharge = () => {

    const router = useRouter();

    useEffect(() => {

        const session = JSON.parse(localStorage.getItem('session'));

        if (session === null || session.secret !== process.env.NEXT_PUBLIC_SECRET) {
            router.push('/page-error/access');
        }

    });

    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        {
            label: 'TIPO DE SUELO',
            style: {whiteSpace: 'nowrap'}
        },
        {
            label: 'USO DE SUELO',
            style: {whiteSpace: 'nowrap'}
        },

        {
            label: 'PENDIENTE',
            style: {whiteSpace: 'nowrap'}
        }
    ];

    const handleTabChange = (event) => {
        setActiveIndex(event.index);
    };

    const renderFile = () => {

        switch (activeIndex) {

            case 0:
                return (
                    <div className="card">
                        <h6 className="mb-4">TIPO DE SUELO</h6>
                        <SingleFile type={'landTypeImage'}></SingleFile>
                    </div>
                );

            case 1:
                return (
                    <div className="card">
                        <h6 className="mb-4">USO DE SUELO</h6>
                        <SingleFile type={'landUseImage'}></SingleFile>
                    </div>
                );

            case 2:
                return (
                    <div className="card">
                        <h6 className="mb-4">PENDIENTE</h6>
                        <SingleFile type={'slope'}></SingleFile>
                    </div>
                );

            default:
                return null;
        }
    };

    return (

        <div className="grid">

            <div className="col-12">

                <div className="card">
                    <h5 className="text-center mb-4">Entradas de Recarga</h5>
                    <TabMenu model={items} activeIndex={activeIndex} onTabChange={handleTabChange}/>
                </div>

            </div>

            <div className="col-12">
                {renderFile()}
            </div>

        </div>

    );

};

export default Recharge;
