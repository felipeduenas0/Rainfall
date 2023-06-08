import React from 'react';
import AppMenuitem from './AppMenuitem';
import {MenuProvider} from './context/menucontext';
import {Button} from "primereact/button";

const AppMenu = () => {

    const model = [
        {
            label: 'Monitoreo Hidrológico',
            items: [
                {label: 'Precipitación', icon: 'pi pi-fw pi-cloud', to: '/section/precipitation'},
                {label: 'Evapotranspiración', icon: 'pi pi-fw pi-sun', to: '/section/evapotranspiration'},
                {label: 'Variables de recarga', icon: 'pi pi-fw pi-arrow-up-right', to: '/section/recharge'},
                {label: 'Realizar procesamiento', icon: 'pi pi-fw pi-sync', to: '/section/processing'}
            ]
        },
        {
            label: 'Resultados',
            items: [
                {label: 'Mapas de recarga', icon: 'pi pi-fw pi-images', to: '/section/recharge-maps'},
                {label: 'Recarga anual', icon: 'pi pi-fw pi-image', to: '/section/annual-recharge'},
                {label: 'Resultados opcionales', icon: 'pi pi-fw pi-window-maximize', to: '/section/optional-results'}
            ]
        }
    ];

    return (

        <MenuProvider>
            <ul className="layout-menu">

                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label}/> :
                        <li className="menu-separator"></li>;
                })}

                <Button label="DESCARGAR ARCHIVOS" icon="pi pi-download" className="mt-3" style={{width: '100%'}}/>

            </ul>

        </MenuProvider>

    );
};

export default AppMenu;
