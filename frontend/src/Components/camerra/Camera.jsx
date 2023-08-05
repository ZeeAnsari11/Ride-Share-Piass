import React, { useState } from 'react';
import Webcam from "react-webcam";
import { Button } from 'antd';
import { FiCamera } from 'react-icons/fi'
import { GrPowerCycle } from 'react-icons/gr'
import imageCompression from "browser-image-compression"
import "./camera.css"

function Camera({ getCompressedImage }) {

    const webcamRef = React.useRef(null);
    const [cameraMode, setCameraMode] = useState("user");

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            compressImage(imageSrc)
        },
        [webcamRef]
    );

    const compressImage = async (imageFile) => {
        const options = {
            maxSizeMB: 1,
            useWebWorker: true,
        }
        let res = await fetch(imageFile);
        let blobItem = await res.blob();
        blobItem.name = "captured.jpeg";
        const compressedFile = await imageCompression(blobItem, options);
        console.log(compressedFile)
        if (getCompressedImage) {
            getCompressedImage(compressedFile);
        }
    }

    const handleChangeCamera = ()=>{
        if(cameraMode === "user"){
            setCameraMode("environment");
            return;
        }
        setCameraMode("user");
    }

    return (
        <div className='camera-popup'>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    facingMode: cameraMode
                }}
            />
            {console.log(cameraMode)}
            <Button onClick={capture} className='capture-button'>
                <FiCamera size={40} />
            </Button>
            <Button onClick={handleChangeCamera} className='change-camera'>
                <GrPowerCycle size={40} />
            </Button>
        </div>
    )
}

export default Camera
