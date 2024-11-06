import { useAuth } from "@/contexts/AuthContext"; // Importando o contexto de autenticação
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "./button";

interface CameraComponentProps {
  openDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ openDialog }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const { login } = useAuth(); // Pegando a função login do contexto
  const navigate = useNavigate();

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
        timer: 1500,
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
      "https://bioshield.ukwest.cloudapp.azure.com/api/recognition/auth/",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      return await response.json();
    }

    return null;
  };

  const handleSend = async () => {
    if (capturedImage) {
      let loadingSwal: any;

      try {
        // Exibir o carregamento do SweetAlert
        loadingSwal = Swal.fire({
          title: 'Autenticando...',
          text: 'Aguarde enquanto processamos sua imagem.',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading(); // Exibe o ícone de loading
          },
        });

        const result = await sendToServer(capturedImage);

        loadingSwal.close();

        if (result) {
          login(result); // Login com o nível de acesso retornado
          openDialog(false); // Fechar o diálogo após login
          Swal.fire({
            title: "Sucesso!",
            text: "Imagem enviada com sucesso e login efetuado!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate(`/nivel/${result.access_level}`);
        } else {
          Swal.fire({
            title: "Erro!",
            text: "Não foi possível reconhecer a imagem ou usuário.",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }

        handleRetake();
      } catch (error) {
        console.error("Erro ao enviar a imagem:", error);
        Swal.fire({
          title: "Erro!",
          text: "Houve um problema ao enviar a imagem.",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
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
          <div className="flex space-x-4 justify-center mt-4">
            <Button onClick={captureImage}>Capturar Imagem</Button>
            <Button onClick={startCamera}>Iniciar Câmera</Button>
          </div>
        </>
      ) : (
        <>
          <h3>Pré-visualização da Imagem:</h3>
          <img src={capturedImage!} alt="Capturada" width="680" height="480" />
          <div className="flex space-x-4 justify-center mt-4">
            <Button onClick={handleSend}>Enviar Imagem</Button>
            <Button onClick={handleRetake}>Tirar Outra Foto</Button>
          </div>
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
