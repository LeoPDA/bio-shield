import { Link } from 'react-router-dom';
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ModeToggle } from './mode-toggle-theme'
import {
    Menubar,
    MenubarSeparator,

} from "@/components/ui/menubar"

const Menu = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="Navigation">
                <Menubar>
                    <span>
                        <Link to="/">Home</Link>

                    </span>
                    <MenubarSeparator />
                        <Link to="/nivel1">Nível 1</Link>
                        <Link to="/nivel1/nivel2">Nível 2</Link>
                        <Link to="/nivel1/nivel2/nivel3">Nível 3</Link>
                    <MenubarSeparator />
                    <span><ModeToggle /></span>

                </Menubar>

            </div>
        </ThemeProvider>
    );
};

export default Menu;

