import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        setMediaStream(stream); // Armazena o stream
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível acessar a câmera. Verifique se as permissões estão habilitadas",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop()); // Para todos os tracks do stream
      setMediaStream(null); // Limpa a referência do stream
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData);
        setShowPreview(true);
        stopCamera(); // Para a câmera após capturar a imagem
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowPreview(false);
    startCamera(); // Reinicia a câmera se o usuário quiser tirar outra foto
  };

  const handleSend = async () => {
    if (capturedImage) {
      // Chame a função para enviar a imagem ao servidor aqui.
      // await sendToServer(capturedImage);
      console.log("Imagem enviada:", capturedImage);
      Swal.fire({
        title: "Sucesso!",
        text: "Imagem enviada com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      handleRetake(); // Limpa a imagem após o envio
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
    <div>
      {!showPreview ? (
        <>
          <video ref={videoRef} autoPlay width="680" height="480" />
          <button onClick={captureImage}>Capturar Imagem</button>
          <button onClick={startCamera}>Iniciar Câmera</button>
        </>
      ) : (
        <>
          <h3>Pré-visualização da Imagem:</h3>
          <img src={capturedImage!} alt="Capturada" width="680" height="480" />
          <button onClick={handleSend}>Enviar Imagem</button>
          <button onClick={handleRetake}>Tirar Outra Foto</button>
        </>
      )}
      <canvas
        ref={canvasRef}
        width="680"
        height="480"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default CameraComponent;
