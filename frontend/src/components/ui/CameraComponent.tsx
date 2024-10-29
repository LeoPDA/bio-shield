import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "@/components/ui/Login/AuthContext"; // Importando o contexto de autenticação

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const { login } = useAuth(); // Pegando a função login do contexto

  const startCamera = async () => {
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        setMediaStream(stream);
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível acessar a câmera. Verifique se as permissões estão habilitadas.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
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
        stopCamera();
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowPreview(false);
    startCamera();
  };

  const sendToServer = async (imageData: string) => {
    const blob = await (await fetch(imageData)).blob();
    const formData = new FormData();
    formData.append("image", blob, "captured_image.png");

    const response = await fetch(
      "http://localhost:8000/api/recognition/auth/",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log(result);
    return result; // Retorna o resultado, incluindo o nível de acesso
  };

  const handleSend = async () => {
    if (capturedImage) {
      try {
        const result = await sendToServer(capturedImage);

        console.log(result);

        if (result.access_level) {
          login(result.access_level); // Login com o nível de acesso retornado
        }
        Swal.fire({
          title: "Sucesso!",
          text: "Imagem enviada com sucesso!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        handleRetake();
      } catch (error) {
        console.error("Erro ao enviar a imagem:", error);
        Swal.fire({
          title: "Erro!",
          text: "Houve um problema ao enviar a imagem.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  useEffect(() => {
    startCamera(); // Iniciar a câmera quando o componente for montado
    return () => {
      stopCamera(); // Parar a câmera quando o componente for desmontado
    };
  }, []);

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
      <canvas ref={canvasRef} width="680" height="480" style={{ display: "none" }} />
    </div>
  );
};

export default CameraComponent;
