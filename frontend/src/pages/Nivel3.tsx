import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';

const data = [
    { id: 1, name: 'Item 1', value: 'Valor 1' },
    { id: 2, name: 'Item 2', value: 'Valor 2' },
    { id: 3, name: 'Item 3', value: 'Valor 3' },
    { id: 1, name: 'Item 4', value: 'Valor 4' },
    { id: 2, name: 'Item 5', value: 'Valor 5' },
    { id: 3, name: 'Item 6', value: 'Valor 6' },
    { id: 1, name: 'Item 7', value: 'Valor 7' },
    { id: 2, name: 'Item 8', value: 'Valor 8' },
    { id: 3, name: 'Item 9', value: 'Valor 9' },
];// Importando os componentes de tabela do Shadcn

const Nivel3 = () => {
    return (
        <div>
            <h1>Camada 3</h1>
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

export default Nivel3;