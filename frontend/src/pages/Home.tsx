import { Button } from "@/components/ui/button";
import CameraComponent from "@/components/ui/CameraComponent";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Camera } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [authState, setAuthState] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAuthState("processing");
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setAuthState(Math.random() > 0.5 ? "success" : "error");
        }
      }, 200);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Login Facial
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Faça o upload de uma foto para autenticar
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {authState === "idle" && (
            <div>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Camera className="mr-2 h-5 w-5" />
                Tirar Foto ou Selecionar Imagem
              </Button>
            </div>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload de Imagem</DialogTitle>
              </DialogHeader>
              <CameraComponent />
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {authState === "processing" && (
            <div className="space-y-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-gray-600">
                Verificando imagem...
              </p>
            </div>
          )}

          {authState === "success" && (
            <div className="text-center text-green-600">
              <p>Autenticação bem-sucedida!</p>
              <p className="text-sm">Redirecionando...</p>
            </div>
          )}

          {authState === "error" && (
            <div className="text-center space-y-4">
              <p className="text-red-600">
                Falha na autenticação. Por favor, tente novamente.
              </p>
              <Button
                onClick={() => setAuthState("idle")}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <AlertCircle className="mr-2 h-5 w-5" />
                Tentar Novamente
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
