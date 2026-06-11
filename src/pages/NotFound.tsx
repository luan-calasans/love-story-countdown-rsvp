import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";

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

          <div className="flex justify-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="btn-shine-white py-4 px-10 bg-gradient-to-r from-wedding-gold to-wedding-gold/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-lg"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
                }}
              >
                Voltar para o Início
              </Link>
              <Link
                to="/#presentes"
                className="btn-shine-gold py-4 px-10 border-2 border-wedding-gold text-wedding-gold rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium text-lg"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
                }}
              >
                Ver Lista de Presentes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
