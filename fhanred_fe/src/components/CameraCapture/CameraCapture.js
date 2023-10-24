import React, { useState, useRef } from 'react';
import "./CameraCapture.css"

const CameraCapture = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  const captureImage = () => {
    if (mediaStream) {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      
      // Aquí puedes manejar la imagen capturada, por ejemplo, mostrarla en el formulario o enviarla al servidor.

      stopCamera();
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

  return (
    <div>
      <button onClick={startCamera}>Iniciar cámara</button>
      <video ref={videoRef} autoPlay />
      <button onClick={captureImage}>Capturar imagen</button>
      <button onClick={stopCamera}>Detener cámara</button>
    </div>
  );
};

export default CameraCapture;
