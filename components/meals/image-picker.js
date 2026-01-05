'use client';
import classes from './image-picker.module.css';
import { useRef } from 'react';
export default function ImagePicker({label, name}) {
    const filePickerRef = useRef();

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <input type='file' id={name} name={name}
                accept={'image/png, image/jpeg, image/jpg'}
                ref={filePickerRef}
                className={classes.input}
                />
                <button className={classes.button} type='button' onClick={() => filePickerRef.current.click()}>
                    Pick Image
                </button>
            </div>
        </div>
    )
}