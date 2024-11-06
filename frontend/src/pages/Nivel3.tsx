import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { Toxin } from "@/schemas/toxin-schema";
import { useEffect, useState } from "react";

async function getData(): Promise<Toxin[]> {
  const response = await fetch(
    "https://bioshield.ukwest.cloudapp.azure.com/api/toxins?access_level=3"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await response.json()) as Toxin[];
}

const Nivel3 = () => {
  const [data, setData] = useState<Toxin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="container mx-auto py-10">
        {loading ? (
          <div className="text-center text-gray-500">Carregando...</div>
        ) : (
          <DataTable data={data} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default Nivel3;
