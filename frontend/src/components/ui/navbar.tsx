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
        <Link className="flex items-center gap-2" to="/">
          <img src="/biohazard.png" alt="logo" className="w-10" />
          <span className="text-primary font-bold text-xl">Bio Shield</span>
        </Link>

        <ul className="hidden md:flex items-center gap-10 text-card-foreground">
          <li className="text-primary font-medium">
            <Link to="/">Home</Link>
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
                <Link to="/home">
                  <DropdownMenuItem>
                    Home{" "}
                    {!(user && user.access_level >= 1) && (
                      <Lock className="inline ml-1" />
                    )}
                  </DropdownMenuItem>
                </Link>
                <Link to="/nivel/1" className="flex">
                  <DropdownMenuItem>
                    Nível 1{" "}
                    {!(user && user.access_level >= 1) && (
                      <Lock className="inline ml-1" />
                    )}
                  </DropdownMenuItem>
                </Link>

                <Link to="/nivel/2" className="flex">
                  <DropdownMenuItem>
                    Nível 2{" "}
                    {!(user && user.access_level >= 2) && (
                      <Lock className="inline ml-1" />
                    )}
                  </DropdownMenuItem>
                </Link>

                <Link to="/nivel/3" className="flex">
                  <DropdownMenuItem>
                    Nível 3{" "}
                    {!(user && user.access_level >= 3) && (
                      <Lock className="inline ml-1" />
                    )}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            {user ? (
              <UserNav user={user} logout={logout} />
            ) : (
              <Link to="/auth">
                <Button variant="default" className="w-full text-sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    </ThemeProvider>
  );
};

export default Navbar;
