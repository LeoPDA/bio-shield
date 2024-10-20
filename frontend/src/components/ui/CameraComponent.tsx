import React, { useRef } from 'react';
import Swal from 'sweetalert2';

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startCamera = async () => {
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível acessar a câmera. Verifique se as permissões estão habilitadas',
        icon: 'error', // ou 'error', 'warning', 'info', 'question'
        confirmButtonText: 'Ok'
      });
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        //const imageData = canvas.toDataURL('image/png');
        //sendToServer(imageData);
      }
    }
  };

  // const sendToServer = async (imageData: string) => {
  //   const response = await fetch('http://localhost:5000/upload', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ image: imageData }),
  //   });
  //   const result = await response.json();
  //   console.log(result);
  // };

  return (
    <div >
      <video ref={videoRef} autoPlay width="680" height="480" />
      <button onClick={captureImage}>Capturar Imagem</button>
      <canvas ref={canvasRef} width="680" height="480" style={{ display: 'none' }} />
      <button onClick={startCamera}>Iniciar Câmera</button>
    </div>
  );
};

export default CameraComponent;
