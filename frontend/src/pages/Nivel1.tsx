import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';

const data = [
    { id: 1, name: 'Item 1', value: 'Valor 1' },
    { id: 2, name: 'Item 2', value: 'Valor 2' },
    { id: 3, name: 'Item 3', value: 'Valor 3' },
];// Importando os componentes de tabela do Shadcn

const Nivel1 = () => {
    return (
        <div>
            <h1>Camada 1</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Valor</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Nivel1;