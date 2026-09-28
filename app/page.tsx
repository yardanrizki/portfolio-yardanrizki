import Home from "./pages/Home";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function Page() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    </ThemeProvider>
  );
}