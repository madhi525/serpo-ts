import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { 
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel, 
    flexRender,
    ColumnDef,
    Row,
    Column
} from "@tanstack/react-table"
import { Button } from "../ui/button"
import { getDataPencapaianPm } from "../../../utils/api"

export type pmLink = {
    serpo: string;
    wilayah: string;
    segment: string;
    tanggalpm: string;
    traveltiket: number;
    jarak: number;
};

export default function TablePencapaianPm () {
    const [dataPmLink, setDataPmLink] = useState<pmLink[]>([]);

    const ambilDataPmLink = async () => {
        const response = await getDataPencapaianPm();
        if (response.status === 'success'){
            setDataPmLink(response.data);
        } else {
            console.warn("Status error response tidak sukses")
        }
    }

    useEffect(() => {
        ambilDataPmLink();
    }, [])

    const struktur: ColumnDef<pmLink>[] = [
        {
            accessorKey: 'wilayah',
            header: ({ column }: { column: Column<pmLink> }) => { // Define `column` type
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="capitalize"
                    >
                        Wilayah
                        {column.getIsSorted() === "asc" ? " ↑" : column.getIsSorted() === "desc" ? " ↓" : ""}
                    </Button>
                )
            },
            cell: ({ row }: { row: Row<pmLink> }) => { // Define `row` type
                return (
                    <div className="text-start capitalize whitespace-nowrap">{row.getValue('wilayah')}</div>
                )
            },
            enableSorting: true
        },
        {
            accessorKey: 'serpo',
            header: 'Serpo',
            cell: ({ row }: { row: Row<pmLink> }) => (
                <div className="text-start capitalize whitespace-nowrap">{row.getValue('serpo')}</div>
            )
        },
        {
            accessorKey: 'pmlink',
            header: 'Link',
            cell: ({ row }: { row: Row<pmLink> }) => (
                <div className="capitalize whitespace-nowrap">{row.getValue('pmlink')}</div>
            )
        },
        {
            accessorKey: 'pmpop',
            header: 'POP',
            cell: ({ row }: { row: Row<pmLink> }) => (
                <div className="capitalize whitespace-nowrap">{row.getValue('pmpop')}</div>
            )
        },
        {
            header: 'Tercapai',
            cell: ({ row }: { row: Row<pmLink> }) => {
                const total = Number(row.getValue('pmpop')) + Number(row.getValue('pmlink'));
                return <div className="capitalize whitespace-nowrap">{total}</div>
            }
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }: { row: Row<pmLink> }) => {
                if (row.getValue('status') === 'not done') {
                    return <div className="capitalize whitespace-nowrap text-red-500">{row.getValue('status')}</div>
                } else {
                    return <div className="capitalize whitespace-nowrap text-green-500">{row.getValue('status')}</div>
                }
            }
        },
        {
            header: 'Edit',
            cell: () => {
                return(
                    <Button variant={'outline'}>Edit</Button>
                )
            }
        }
    ]

    const table = useReactTable({
        data: dataPmLink,
        columns: struktur,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageSize: 16,
            }
        }
    })

    return (
        <div>
            <h1>Data Tabel</h1>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((header) => (
                        <TableRow key={header.id}>
                            {header.headers.map((item) => (
                                <TableHead key={item.id} className="text-center">
                                    {item.isPlaceholder ? null : flexRender(item.column.columnDef.header, item.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={struktur.length}>Tidak ada data</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
