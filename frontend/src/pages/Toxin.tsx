import { Toxin } from "@/schemas/toxin-schema";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

async function getData(id: string): Promise<Toxin> {
  const response = await fetch(
    `https://bioshield.ukwest.cloudapp.azure.com/api/toxins/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await response.json()) as Toxin;
}

const ToxinComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Toxin>();

  useEffect(() => {
    if (id) {
      getData(id)
        .then((data) => setData(data))
        .catch(console.error);
    }
  }, [id]);

  return (
    <div>
      <div className="container mx-auto py-10 px-4">
        {data ? (
          <div className="shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="font-semibold">ID:</h2>
                <p>{data.id}</p>
              </div>
              <div>
                <h2 className="font-semibold">Classificação:</h2>
                <p>{data.classification}</p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <h2 className="font-semibold">Descrição:</h2>
                <p>{data.description}</p>
              </div>
              <div>
                <h2 className="font-semibold">Uso:</h2>
                <p>{data.usage}</p>
              </div>
              <div>
                <h2 className="font-semibold">Riscos:</h2>
                <p>{data.risks}</p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <h2 className="font-semibold">Recomendações de Segurança:</h2>
                <p>{data.safety_recommendations}</p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <h2 className="font-semibold">Planos de Contenção:</h2>
                <p>{data.containment_plans}</p>
              </div>
              <div>
                <h2 className="font-semibold">Nível de Acesso:</h2>
                <p>{data.access_level}</p>
              </div>
              <div>
                <h2 className="font-semibold">Criado em:</h2>
                <p>{new Date(data.created_at).toLocaleString()}</p>
              </div>
              <div>
                <h2 className="font-semibold">Atualizado em:</h2>
                <p>{new Date(data.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ToxinComponent;
