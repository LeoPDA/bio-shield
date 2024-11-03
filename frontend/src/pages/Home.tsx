import { Card } from "@/components/ui/card";

const Home = () => {
  return (
    <div>
      <h1>Bio Shield</h1>

      <div className="py-6">
        <h2>Bem-vindo ao Bio Shield</h2>

        <span>
          O Bio Shield é um sistema de identificação e autenticação biométrica
          facial, projetado para garantir a segurança de informações sensíveis
          no Ministério do Meio Ambiente. Com tecnologia de ponta, nossa solução
          oferece um acesso seguro e controlado ao cofre oculto, estruturado em
          três níveis de segurança
        </span>

        <Card className="py-6">
          Nível 1: Acesso concedido a indivíduos com permissão geral.
        </Card>
        <Card className="py-6">
          Nível 2: Acesso restrito a diretores de divisões.
        </Card>
        <Card className="py-6">
          Nível 3: Acesso exclusivo ao ministro do Meio Ambiente.
        </Card>
      </div>

      <div>
        Nossa missão é assegurar que somente usuários autorizados possam acessar
        dados críticos, protegendo a integridade e a confidencialidade das
        informações. Agradecemos por fazer parte deste compromisso com a
        segurança e a proteção de dados.
      </div>
    </div>
  );
};

export default Home;
