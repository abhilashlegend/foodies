'use client';
import Image from 'next/image';
import classes from './image-picker.module.css';
import { useRef, useState } from 'react';

export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage] = useState();
    const filePickerRef = useRef();

    function pickedHandler(event) {
        const files = event.target.files;

        if(!files || files.length === 0) {
            setPickedImage(null);
            return;
        }

        const pickedFile = files[0];

        const fileReader = new FileReader();

        fileReader.readAsDataURL(pickedFile);

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        fileReader.onerror = () => {
            setPickedImage(null);
        };
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                     {pickedImage && (
                    <div className={classes.imagePreview}>
                       <Image src={pickedImage} alt="Preview" fill />
                    </div>
                    )}
                    {!pickedImage && <p>No image picked yet.</p>}
                </div>
               
                <input type='file' id={name} name={name}
                accept={'image/png, image/jpeg, image/jpg'}
                ref={filePickerRef}
                className={classes.input}
                onChange={pickedHandler}
                required
                />
                <button className={classes.button} type='button' onClick={() => filePickerRef.current.click()}>
                    Pick Image
                </button>
            </div>
        </div>
    )
}