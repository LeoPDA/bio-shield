import { Button } from "@/components/ui/button";
import CameraComponent from "@/components/ui/CameraComponent";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { login } = useAuth();

  const handleLogin = (accessLevel: number) => {
    login(accessLevel);
    setIsDialogOpen(false); // Fechar o diálogo após login
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Bio Shield
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sistema de Autenticação Biométrica para Acesso ao Cofre de Segurança
            Máxima
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Camera className="mr-2 h-5 w-5" />
              Capturar Foto para Autenticação
            </Button>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Captura de image</DialogTitle>
              </DialogHeader>
              <CameraComponent />
              <DialogFooter>
                <Button variant="secondary" onClick={() => handleLogin(3)}>
                  Cancelar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
};

export default Auth;
