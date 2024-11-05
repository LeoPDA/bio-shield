import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Lock, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ModeToggle } from "./mode-toggle-theme";
import { ThemeProvider } from "./theme-provider";
import { UserNav } from "./user-nav";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Card className="container bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
        <div className="flex items-center gap-2">
          <img src="/biohazard.png" alt="logo" className="w-10" />
          <span className="text-primary font-bold text-xl">Bio Shield</span>
        </div>

        <ul className="hidden md:flex items-center gap-10 text-card-foreground">
          <li className="text-primary font-medium">
            <Link to="/home">
              Home{" "}
              {!(user && user.access_level >= 1) && (
                <Lock className="inline ml-1" />
              )}
            </Link>
          </li>
          <li>
            <Link to="/nivel/1" className="flex">
              Nível 1{" "}
              {!(user && user.access_level >= 1) && (
                <Lock className="inline ml-1" />
              )}
            </Link>
          </li>
          <li>
            <Link to="/nivel/2" className="flex">
              Nível 2{" "}
              {!(user && user.access_level >= 2) && (
                <Lock className="inline ml-1" />
              )}
            </Link>
          </li>
          <li>
            <Link to="/nivel/3" className="flex">
              Nível 3{" "}
              {!(user && user.access_level >= 3) && (
                <Lock className="inline ml-1" />
              )}
            </Link>
          </li>
        </ul>

        <div className="flex items-center">
          <div className="flex md:hidden mr-2 items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5 rotate-0 scale-100" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/home">
                    Home{" "}
                    {!(user && user.access_level >= 1) && (
                      <Lock className="inline ml-1" />
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/nivel/1" className="flex">
                    Nível 1{" "}
                    {!(user && user.access_level >= 1) && (
                      <Lock className="inline ml-1" />
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/nivel/2" className="flex">
                    Nível 2{" "}
                    {!(user && user.access_level >= 2) && (
                      <Lock className="inline ml-1" />
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/nivel/3" className="flex">
                    Nível 3{" "}
                    {!(user && user.access_level >= 3) && (
                      <Lock className="inline ml-1" />
                    )}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            {user && <UserNav user={user} logout={logout} />}
          </div>
        </div>
      </Card>
    </ThemeProvider>
  );
};

export default Navbar;
