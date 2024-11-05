import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { Toxin } from "@/schemas/toxin-schema";
import { useEffect, useState } from "react";

async function getData(): Promise<Toxin[]> {
  const response = await fetch(
    "http://localhost:8000/api/toxins?access_level=2"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await response.json()) as Toxin[];
}

const Nivel2 = () => {
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

export default Nivel2;
