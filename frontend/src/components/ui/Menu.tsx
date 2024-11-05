import { Menubar, MenubarSeparator } from "@/components/ui/menubar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { useAuth } from "@/contexts/AuthContext";
import { Lock } from "lucide-react"; // Importa o ícone de cadeado
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle-theme";

const Menu = () => {
  const { user } = useAuth();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="Navigation">
        <Menubar>
          <span>
            <Link to="/home">
              Home{" "}
              {!(user && user.access_level >= 1) && (
                <Lock className="inline ml-1" />
              )}
            </Link>
          </span>
          <MenubarSeparator />
          <Link to="/nivel1" className="flex">
            Nível 1{" "}
            {!(user && user.access_level >= 1) && (
              <Lock className="inline ml-1" />
            )}
          </Link>

          <Link to="/nivel1/nivel2" className="flex">
            Nível 2{" "}
            {!(user && user.access_level >= 2) && (
              <Lock className="inline ml-1" />
            )}
          </Link>

          <Link to="/nivel1/nivel2/nivel3" className="flex">
            Nível 3{" "}
            {!(user && user.access_level >= 3) && (
              <Lock className="inline ml-1" />
            )}
          </Link>

          <MenubarSeparator />
          <span>
            <ModeToggle />
          </span>
        </Menubar>
      </div>
    </ThemeProvider>
  );
};

export default Menu;
