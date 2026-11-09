import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";

// Exibida para endereços inexistentes (a Vercel responde com status HTTP 404 — ver scripts/prerender.mjs).
export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>

          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Página não encontrada
          </h2>

          <p className="text-slate-600 mb-8 leading-relaxed">
            O endereço acessado não existe ou foi alterado.
          </p>

          <a
            href="/"
            className="inline-flex items-center justify-center bg-[#293d47] hover:opacity-90 text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md"
          >
            <Home className="w-4 h-4 mr-2" />
            Voltar à página inicial
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
