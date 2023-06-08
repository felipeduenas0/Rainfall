import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setEvapotranspirationImages, setPrecipitationImages} from "../../store/slice";
import {FileUpload} from 'primereact/fileupload';
import {ProgressBar} from "primereact/progressbar";
import {Image} from 'primereact/image';
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";
import Swal from 'sweetalert2';

const MultipleFile = ({type}) => {

    const storedImages = useRef(null);
    const [processedImages, setProcessedImages] = useState({});

    const dispatch = useDispatch();

    const sectionImages = useSelector(({sections}) => {

        if (type === 'precipitationImages') {
            return sections.precipitationImages;
        }

        if (type === 'evapotranspirationImages') {
            return sections.evapotranspirationImages;
        }

        return null;
    });

    useEffect(() => {

        if (storedImages.current && sectionImages) {

            storedImages.current.setFiles(sectionImages);

            sectionImages.forEach(file => {

                setProcessedImages(prevState => ({
                    ...prevState,
                    [file.name]: file.pngImage
                }));

            });

        }

    }, [sectionImages]);

    const setPngImage = (file) => {

        const formData = new FormData();
        formData.append('tif_image', file, file.name);

        fetch(process.env.NEXT_PUBLIC_API_URL + '/image-png', {
            method: 'POST',
            body: formData
        })
            .then(response => response.blob())
            .then(blob => {

                const url = URL.createObjectURL(blob);

                file.pngImage = url;
                setProcessedImages(prevState => ({
                    ...prevState,
                    [file.name]: url
                }));

            })
            .catch(e => console.log(e));
    };

    useEffect(() => {

        if (sectionImages) {

            sectionImages
                .filter(file => file.pngImage === '')
                .forEach(file => setPngImage(file));

        }

    }, [sectionImages]);

    const names = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
    ];

    const fileChooseOptions = {
        label: 'Seleccionar',
        style: {width: '11rem'}
    }

    const fileUploadOptions = {
        label: 'Subir',
        style: {display: 'none'}
    };

    const fileCancelOptions = {
        label: 'Remover todo',
        style: {width: '11rem'}
    };

    const headerTemplate = (options) => {

        const {className, chooseButton, uploadButton, cancelButton} = options;
        const numberOfImages = sectionImages ? sectionImages.length : 0;
        const percentage = (numberOfImages * 100) / 12;

        return (

            <div className={className} style={{display: 'flex', justifyContent: 'center'}}>

                {chooseButton}
                {uploadButton}
                {cancelButton}

                <div className="hidden md:flex align-items-center gap-3 ml-auto">
                    <span>{numberOfImages} / 12</span>
                    <ProgressBar value={percentage} showValue={false} style={{width: '10rem', height: '15px'}}/>
                </div>

            </div>

        );

    };

    const emptyTemplate = () => {

        return (

            <div className="flex align-items-center flex-column">

                <i className="pi pi-image mt-3 p-5" style={{
                    fontSize: '5em',
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface-b)',
                    color: 'var(--surface-d)'
                }}/>

                <span className="text-center my-5" style={{fontSize: '1.2em', color: 'var(--text-color-secondary)'}}>
                    Arrastra y suelta las imagenes aquí
                </span>

            </div>

        );

    };

    const itemTemplate = (file, props) => {

        const image = processedImages[file.name];

        return (

            <div className="grid mt-3">

                <div className="col-8 md:col-4 flex justify-content-center align-items-center">

                    <div className="text-center">

                        <Image src={image ? image : '/images/default/loadingImage.png'} alt={file.name} width="100"
                               preview/>

                        <span className="flex flex-column">
                            {file.name}
                        </span>

                    </div>

                </div>

                <div className="hidden col-4 md:flex justify-content-center align-items-center">
                    <Tag value={props.formatSize} severity="primary" className="w-4 px-3 py-2"/>
                </div>

                <div className="col-4 flex justify-content-center align-items-center">

                    <Button className="p-button-outlined p-button-rounded p-button-rounded-circle p-button-danger"
                            icon="pi pi-times"
                            type="button"
                            style={{width: '32px', height: '32px'}}
                            onClick={() => props.onRemove()}
                    />

                </div>

            </div>

        );

    };

    const validateQuantity = (currentFiles, selectedFiles) => {
        return (currentFiles.length + selectedFiles.length) > 12;
    }

    const validateNames = (selectedFiles) => {

        return selectedFiles.some(file => {
            const fileName = file.name.toLowerCase();
            const fileNameWithoutExtension = fileName.replace('.tiff', '').replace('.tif', '');
            return !names.includes(fileNameWithoutExtension);
        });

    }

    const hasDuplicateNames = (currentFiles, selectedFiles) => {
        const currentFileNames = currentFiles.map(file => file.name.toLowerCase());
        const selectedFileNames = selectedFiles.map(file => file.name.toLowerCase());
        return selectedFileNames.some(fileName => currentFileNames.includes(fileName));
    };

    const customSelect = async (event) => {

        const currentFiles = storedImages.current ? storedImages.current.getFiles() : [];
        const selectedFiles = [...event.files];

        if (validateQuantity(currentFiles, selectedFiles)) {

            if (storedImages.current) {
                storedImages.current.setFiles(currentFiles);
            }

            return Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Esta sección solo admite 12 archivos',
                confirmButtonColor: '#131b26'
            })

        }

        if (validateNames(selectedFiles)) {

            if (storedImages.current) {
                storedImages.current.setFiles(currentFiles);
            }

            return Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Los nombres de los archivos seleccionados no son válidos. Verifica que los nombres estén dentro de la lista de nombres disponibles',
                confirmButtonColor: '#131b26',
                footer: 'Enero.tif, Febrero.tif, Marzo.tif ... Diciembre.tif'
            });

        }

        if (hasDuplicateNames(currentFiles, selectedFiles)) {

            if (storedImages.current) {
                storedImages.current.setFiles(currentFiles);
            }

            return Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor, verifica y asegúrate de que no existan imágenes con nombres duplicados',
                confirmButtonColor: '#131b26'
            })

        }

        selectedFiles.forEach(file => file.pngImage = '');

        const files = [...currentFiles, ...selectedFiles];

        files.sort((a, b) => {
            const monthA = a.name.replace('.tiff', '').replace('.tif', '').toLowerCase();
            const monthB = b.name.replace('.tiff', '').replace('.tif', '').toLowerCase();
            return names.indexOf(monthA) - names.indexOf(monthB);
        });

        if (type === 'precipitationImages') {
            dispatch(setPrecipitationImages(files));
        }

        if (type === 'evapotranspirationImages') {
            dispatch(setEvapotranspirationImages(files));
        }

        if (storedImages.current) {
            storedImages.current.setFiles(files);
        }

    };

    const customRemove = (event) => {

        const currentFiles = storedImages.current ? storedImages.current.getFiles() : [];

        const files = [...currentFiles].filter(file => {
            return file.name !== event.file.name;
        })

        if (type === 'precipitationImages') {
            dispatch(setPrecipitationImages(files));
        }

        if (type === 'evapotranspirationImages') {
            dispatch(setEvapotranspirationImages(files));
        }

        processedImages[event.file.name] = null;
    }

    const customClear = () => {

        if (type === 'precipitationImages') {
            dispatch(setPrecipitationImages([]));
        }

        if (type === 'evapotranspirationImages') {
            dispatch(setEvapotranspirationImages([]));
        }

        setProcessedImages({});
    }

    return (

        <FileUpload ref={storedImages}
                    multiple={true}
                    maxFileSize={5 * 1024 * 1024}
                    accept="image/tiff, image/tif"
                    chooseOptions={fileChooseOptions}
                    uploadOptions={fileUploadOptions}
                    cancelOptions={fileCancelOptions}
                    headerTemplate={headerTemplate}
                    emptyTemplate={emptyTemplate}
                    itemTemplate={itemTemplate}
                    onSelect={customSelect}
                    onRemove={customRemove}
                    onClear={customClear}
                    customUpload={true}
        />

    );

};

export default MultipleFile;
