import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setLandType, setLandUse, setSlope} from "../../store/slice";
import {FileUpload} from 'primereact/fileupload';
import {ProgressBar} from "primereact/progressbar";
import {Image} from 'primereact/image';
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";
import Swal from 'sweetalert2';

const SingleFile = ({type}) => {

    const storedImages = useRef(null);
    const [processedImages, setProcessedImages] = useState({});

    const dispatch = useDispatch();

    const sectionImages = useSelector(({sections}) => {

        if (type === 'landTypeImage') {
            return sections.landType;
        }

        if (type === 'landUseImage') {
            return sections.landUse;
        }

        return sections.slope;
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
        style: {display: 'none'}
    };

    const headerTemplate = (options) => {

        const {className, chooseButton, uploadButton, cancelButton} = options;
        const numberOfImages = sectionImages ? sectionImages.length : 0;
        const percentage = (numberOfImages * 100);

        return (

            <div className={className} style={{display: 'flex', justifyContent: 'center'}}>

                {chooseButton}
                {uploadButton}
                {cancelButton}

                <div className="hidden md:flex align-items-center gap-3 ml-auto">
                    <span>{numberOfImages} / 1</span>
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
                    Arrastra y suelta la imagen aquí
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
        return (currentFiles.length + selectedFiles.length) > 1;
    }

    const customSelect = (event) => {

        const currentFiles = storedImages.current ? storedImages.current.getFiles() : [];
        const selectedFiles = [...event.files];

        if (validateQuantity(currentFiles, selectedFiles)) {

            if (storedImages.current) {
                storedImages.current.setFiles(currentFiles);
            }

            return Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Esta sección solo admite 1 archivo',
                confirmButtonColor: '#131b26'
            })

        }

        selectedFiles.forEach(file => file.pngImage = '');

        const files = [...selectedFiles];

        if (type === 'landTypeImage') {
            dispatch(setLandType(files));
        }

        if (type === 'landUseImage') {
            dispatch(setLandUse(files));
        }

        if (type === 'slope') {
            dispatch(setSlope(files));
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

        if (type === 'landTypeImage') {
            dispatch(setLandType(files));
        }

        if (type === 'landUseImage') {
            dispatch(setLandUse(files));
        }

        if (type === 'slope') {
            dispatch(setSlope(files));
        }

        processedImages[event.file.name] = null;
    }

    return (

        <FileUpload ref={storedImages}
                    multiple={false}
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
                    customUpload={true}
        />

    );

};

export default SingleFile;
