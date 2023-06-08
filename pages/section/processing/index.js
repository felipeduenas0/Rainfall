import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedCategories, setFieldCapacity} from "../../../store/slice";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Tag} from "primereact/tag";
import {Checkbox} from "primereact/checkbox";
import {InputNumber} from 'primereact/inputnumber';
import {Button} from 'primereact/button';
import Swal from "sweetalert2";
import {useRouter} from "next/router";

const Processing = () => {

    const router = useRouter();

    useEffect(() => {

        const session = JSON.parse(localStorage.getItem('session'));

        if (session === null || session.secret !== process.env.NEXT_PUBLIC_SECRET) {
            router.push('/page-error/access');
        }

    });

    const dispatch = useDispatch();

    const precipitationImages = useSelector(state => state.sections.precipitationImages);
    const evapotranspirationImages = useSelector(state => state.sections.evapotranspirationImages);
    const landType = useSelector(state => state.sections.landType);
    const landUse = useSelector(state => state.sections.landUse);
    const slope = useSelector(state => state.sections.slope);

    const selectedCategories = useSelector(state => state.sections.selectedCategories);
    const fieldCapacity = useSelector(state => state.sections.fieldCapacity);

    const imageInputs = [
        {
            '#': '1',
            'input': 'Precipitación',
            'amount': precipitationImages.length,
            'imagesRequired': 12
        },
        {
            '#': '2',
            'input': 'Evapotranspiración',
            'amount': evapotranspirationImages.length,
            'imagesRequired': 12
        },
        {
            '#': '3',
            'input': 'Variables de recarga',
            'amount': (landType.length + landUse.length + slope.length),
            'imagesRequired': 3
        }
    ];

    const statusBodyTemplate = (rowData) => {

        const completedTag = <Tag className="w-12" severity="primary">Completado</Tag>;
        const pendingTag = <Tag className="w-12" severity="warning">Pendiente</Tag>;

        if (rowData.input === 'Precipitación' || rowData.input === 'Evapotranspiración') {
            return rowData.amount === 12 ? completedTag : pendingTag;
        }

        return rowData.amount === 3 ? completedTag : pendingTag;
    };

    const categories = [
        {key: '1', name: 'surface_runoff', description: 'Escorrentía superficial'},
        {key: '2', name: 'infiltration', description: 'Infiltración'},
        {key: '3', name: 'inpet', description: 'Inpet'},
        {key: '4', name: 'accumulated_water_loss', description: 'Perdida acumulada de agua'},
        {key: '5', name: 'water_soil', description: 'Contenido de agua en el suelo'},
        {key: '6', name: 'actual_evt', description: 'Evapotranspiración real'}
    ];

    const onCategoryChange = (event) => {

        let categories = [...selectedCategories];

        if (event.checked) {
            categories.push(event.value);
        } else {
            categories = categories.filter(category => category.key !== event.value.key);
        }

        dispatch(setSelectedCategories(categories));
    };

    const handleValueChange = (event) => {
        dispatch(setFieldCapacity(event.value));
    }

    const validation = () => {

        const precipitationCount = precipitationImages.length;
        const evapotranspirationCount = evapotranspirationImages.length;
        const rechargeCount = (landType.length + landUse.length + slope.length);

        if (precipitationCount !== 12 || evapotranspirationCount !== 12 || rechargeCount !== 3) {

            return Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor, verifica que las imágenes se hayan cargado correctamente',
                confirmButtonColor: '#131b26'
            });

        }

        if (fieldCapacity < 0.1 || 9999999.9 < fieldCapacity) {

            return Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'La capacidad de campo debe estar entre 0,1 y 9.999.999,0',
                confirmButtonColor: '#131b26'
            });

        }

        sendRequest();
    }

    const sendRequest = () => {

        const formData = new FormData();

        const optionalVariables = {};

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        categories.forEach(category => {
            const result = selectedCategories.find(item => category.key === item.key)
            optionalVariables[category.name] = Boolean(result)
        })

        formData.append('optional_variables', new Blob([JSON.stringify(optionalVariables)], {type: 'application/json'}));
        formData.append('field_capacity', new Blob([JSON.stringify({'field_capacity': fieldCapacity})], {type: 'application/json'}));

        precipitationImages.forEach((file, i) => {
            formData.append('precipitation', file, months[i]);
        });

        evapotranspirationImages.forEach((file, i) => {
            formData.append('evapotranspiration', file, months[i]);
        })

        formData.append('recharge', landType[0], 'soil_type');
        formData.append('recharge', landUse [0], 'soil_use');
        formData.append('recharge', slope[0], 'slope');

        fetch(process.env.NEXT_PUBLIC_API_URL + '/process-images', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(response => assignResults(response))
            .catch(e => failureControl(e));

    }

    const assignResults = (response) => {

        return Swal.fire({
            icon: 'success',
            title: 'Proceso finalizado',
            text: response.message,
            confirmButtonColor: '#131b26'
        });

    }

    const failureControl = (e) => {

        console.log(e);

        return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No ha sido posible realizar el procesamiento',
            confirmButtonColor: '#131b26'
        });

    }

    return (

        <div className="grid p-fluid">

            <div className="col-12 md:col-7 lg:col-6 xl:col-7">

                <div className="card">

                    <h5 className="text-center mb-4">Resumen Carga de Imágenes</h5>

                    <DataTable className="" value={imageInputs} showGridlines tableStyle={{minWidth: '30rem'}}>

                        <Column field="#" header="#" alignHeader={'center'}
                                className="font-bold text-center"></Column>
                        <Column field="input" header="Entrada" alignHeader={'center'}
                                className="text-center"></Column>

                        <Column field="amount" header="Imagenes" alignHeader={'center'}
                                className="text-center">
                        </Column>

                        <Column field="imagesRequired" header="Requeridas" alignHeader={'center'}
                                className="text-center">
                        </Column>

                        <Column field="status" header="Estado" body={statusBodyTemplate} alignHeader={'center'}
                                className="text-center">
                        </Column>

                    </DataTable>

                </div>

            </div>

            <div className="col-12 md:col-5 lg:col-6 xl:col-5">

                <div className="card flex justify-content-center" style={{height: '100%'}}>

                    <div className="flex flex-column gap-3">

                        <h5 className="text-center">Variables Opcionales</h5>

                        {categories.map(category => {

                            return (

                                <div key={category.key} className="flex align-items-center">

                                    <Checkbox inputId={category.key} name="category" value={category}
                                              onChange={onCategoryChange}
                                              checked={selectedCategories.some((item) => item.key === category.key)}/>

                                    <label htmlFor={category.key} className="ml-2">
                                        {category.description}
                                    </label>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </div>

            <div className="col-12 md:col-4 lg:col-6 xl:col-4">

                <div className="card">
                    <label htmlFor="fieldCapacity" className="font-bold block mb-2">Capacidad de campo</label>
                    <InputNumber inputId="fieldCapacity"
                                 value={fieldCapacity}
                                 minFractionDigits={1}
                                 maxFractionDigits={5}
                                 maxLength={15}
                                 suffix=" mm"
                                 onValueChange={handleValueChange}/>
                </div>

            </div>

            <div className="col-12 md:col-3 lg:col-6 xl:col-3">

                <div className="card text-center">
                    <label className="font-bold block mb-2">Procesar información</label>
                    <Button className="w-4" icon="pi pi-check" aria-label="request" onClick={validation}/>
                </div>

            </div>

        </div>

    );

}

export default Processing;
