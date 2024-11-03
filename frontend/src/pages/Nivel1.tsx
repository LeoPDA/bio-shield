import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { Toxin } from "@/schemas/toxin-schema";
import { useEffect, useState } from "react";

async function getData(): Promise<Toxin[]> {
  const response = await fetch("http://localhost:8000/api/toxins");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await response.json()) as Toxin[];
}

const Nivel1 = () => {
  const [data, setData] = useState<Toxin[]>([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>Camada 1</h1>
      <div className="container mx-auto py-10">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default Nivel1;
