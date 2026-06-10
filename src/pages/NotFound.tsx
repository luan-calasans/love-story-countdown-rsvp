import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Home, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center pt-32 pb-12 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-playfair font-bold text-wedding-gold mb-4">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-playfair text-gray-800 mb-4">
              Página não encontrada
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Desculpe, a página que você está procurando não existe ou foi movida.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-wedding-gold hover:bg-wedding-gold/90 text-white"
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Voltar para o Início
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-wedding-gold text-wedding-gold hover:bg-wedding-gold/10 hover:text-wedding-gold bg-wedding-cream/50"
            >
              <Link to="/#presentes">
                <Gift className="w-4 h-4 mr-2" />
                Ver Lista de Presentes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
