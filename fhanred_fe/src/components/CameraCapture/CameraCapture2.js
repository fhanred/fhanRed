import { Card } from 'semantic-ui-react';
import './CameraCapture.css';
import { useRef, useState } from 'react';
import { BiCamera } from "react-icons/bi"

function CameraCapture2({ setFieldValue }) {
  const videoDiv = useRef();
  const fotoDiv = useRef();
  const [mediaStream, setMediaStream] = useState(null);
  const [hayFoto, setHayFoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const [fotoGuardada, setFotoGuardada] = useState(false);
  const [cameraActiva, setCameraActiva] = useState(true);
  const [camaraDetectada, setCamaraDetectada] = useState(true);

  const verCamara = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 300, height: 180 },
      })
      .then((stream) => {
        setMediaStream(stream);
        let miVideo = videoDiv.current;
        miVideo.srcObject = stream;
        miVideo.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const detenerCamara = () => {
    // Obtenemos la pista de video de la cámara
    if (mediaStream) {
      const videoTrack = mediaStream.getVideoTracks()[0];

      // Detenemos la pista de video
      videoTrack.stop();
      setMediaStream(null);
    }
  };

  const tomarFoto = () => {
    if (!cameraActiva) {
      // Resto del código para tomar la foto
      const w = 300;
      const h = w / (8 / 4);

      let video = videoDiv.current;
      let foto = fotoDiv.current;

      foto.width = w;
      foto.height = h;
      let context = foto.getContext('2d');
      context.drawImage(video, 0, 0, w, h);

      setHayFoto(true);
      detenerCamara();
    }
  };

  const deleteFoto = () => {
    if (fotoGuardada) {
      return;
    }

    if (hayFoto) {
      let f = fotoDiv.current;
      let context = f.getContext('2d');
      context.clearRect(0, 0, f.width, f.height);
      setHayFoto(false);
      verCamara();
    }
  };

  const iniciarCamara = async () => {
    try {
      const dispositivos = await navigator.mediaDevices.enumerateDevices();
      const camaras = dispositivos.filter(
        (dispositivo) => dispositivo.kind === 'videoinput'
      );

      if (camaras.length === 0) {
        console.log('No se detectó ninguna cámara disponible.');
        setCamaraDetectada(false); // Actualiza el estado a false
        return; // No hay cámaras disponibles, se puede detener aquí
      }

      // Si hay cámaras disponibles, actualiza el estado a true y procede con la lógica de activación de la cámara
      setCamaraDetectada(true);
      verCamara();
      setCameraActiva(false);
    } catch (error) {
      console.error('Error al intentar acceder a los dispositivos: ', error);
      // Manejo de errores, puedes mostrar un mensaje al usuario informando del problema
    }
  };

  const stopCamara = () => {
    if (!cameraActiva) {
      detenerCamara();
      setCameraActiva(true);
    }
  };

  const guardarFoto = async () => {
    // Obtenemos la foto del canvas
    const foto = fotoDiv.current;
    const image = foto.toDataURL('image/png');
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'FHANRED');
    setLoading(true);
    // Obtenemos la URL de la imagen de la respuesta de Cloudinary
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dwejoiefk/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await response.json();

    // Si ocurrió un error, mostramos el error

    setPhoto(file.recure_url);
    // Obtenemos la URL de la imagen
    const imageURL = file.secure_url;
    console.log(imageURL);
    // Utiliza setFieldValue para actualizar el valor del campo 'image_ced1' en Formik
    setFieldValue('image_ced2', imageURL);
    setFotoGuardada(true);
    setCameraActiva(true);
    setLoading(false);
  };

  return (
    <>
      <div>
        <Card.Group centered>
          <Card>
            <Card.Content>
            {camaraDetectada ? (
                <>
                  <button
                    type="button"
                    onClick={iniciarCamara}
                    disabled={!cameraActiva || fotoGuardada}
                  >
                    <BiCamera className="camera" /> Iniciar cámara
                  </button>
                  <button
                    type="button"
                    onClick={stopCamara}
                    disabled={cameraActiva || fotoGuardada}
                  >
                    Detener cámara
                  </button>
                  <button
                    type="button"
                    onClick={tomarFoto}
                    disabled={cameraActiva || fotoGuardada}
                  >
                    Tomar foto
                  </button>
                </>
              ) : (
                <p className='error-message' >No se detectó ninguna cámara disponible.</p>
              )}
            </Card.Content>
            <video ref={videoDiv}></video>
          </Card>
          <Card>
            <canvas ref={fotoDiv}></canvas>
            <Card.Content>
              {fotoGuardada ? (
                <p>La foto ha sido guardada con exito.</p>
              ) : (
                <>
                  <button type="button" onClick={deleteFoto} disabled={cameraActiva}>
                    {' '}
                    Borrar foto
                  </button>
                  <button type="button" onClick={guardarFoto} disabled={cameraActiva}>
                    Guardar foto
                  </button>
                </>
              )}
              {loading ? <h1>Cargando Foto documento...</h1> : <h1>{''}</h1>}
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    </>
  );
}

export default CameraCapture2;