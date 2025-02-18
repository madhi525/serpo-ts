"use client"

import { useRaker, raker } from "@/context/raker-context"
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/router"
import { ColumnDef, 
    ColumnFiltersState, 
    SortingState, 
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel, 
    VisibilityState,
    flexRender} from "@tanstack/react-table"
import { Checkbox } from "@radix-ui/react-checkbox"
import { Button } from "../ui/button"
import { getDataPmLink } from "../../../utils/api"

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
    const [dataTable, setDataTable] = useState<pencapaian[]>([]);

    type pencapaian = {
        wilayah: string;
        serpo: string;
        pmlink: number;
        pmpop: number;
        status: string;
    }

    const ambilDataPmLink = async () => {
        const response = await getDataPmLink();
        if (response.status === 'success'){
            setDataPmLink(response.data);
        } else {
            console.warn("Status error response tidak sukses")
        }
    }

    const formatDataTable = async (dataPmLink: pmLink[]) => {
        const groupedData: { [serpo: string]: pencapaian } = {};
        let count = 0;
        let stateserpo = '';
        const serpoMaping: {[key: string]:string}={
            'SERPO ARGAMAKMUR': 'BENGKULU 1',
            'SERPO MANNA': 'BENGKULU 1',
            'SERPO MUKO': 'BENGKULU 1',
            'SERPO PEKALONGAN': 'BENGKULU 1',
            'SERPO SUKAMERINDU': 'BENGKULU 1',
            'SERPO DEMANG': 'SUMSEL 1',
            'SERPO JAKABARING': 'SUMSEL 1',
            'SERPO MASKAREBET': 'SUMSEL 1',
            'SERPO PALEMBANGKOTA': 'SUMSEL 1',
            'SERPO PALEMBANGULU': 'SUMSEL 1',
            'SERPO SUNGAILILIN': 'SUMSEL 1',
            'SERPO BATURAJA': 'SUMSEL 2',
            'SERPO BUKITASAM': 'SUMSEL 2',
            'SERPO MARTAPURA': 'SUMSEL 2',
            'SERPO PENDOPO': 'SUMSEL 2',
            'SERPO PRABUMULIH': 'SUMSEL 2'
        }
        dataPmLink.forEach(item => {
            const wilayah = serpoMaping[item.serpo] || 'wilayah lain';
            stateserpo = item.serpo;
            if (groupedData[item.serpo]){
                groupedData[item.serpo].pmlink += 1;
            } else {
                count = 0;
                groupedData[item.serpo] = {
                    wilayah: wilayah,
                    serpo: item.serpo,
                    pmlink: 1,
                    pmpop: 10,
                    status: 'Done',
                }; 
            }
        });
        setDataTable(Object.values(groupedData));
    }

    useEffect(() => {
        ambilDataPmLink();
    }, []);

    useEffect(() => {
        if (dataPmLink.length > 0) {
            formatDataTable(dataPmLink);
        }
    }, [dataPmLink]);

    const struktur =[
        {
            accessorKey: 'wilayah',
            header: 'Wilayah',
            cell: ({row}) => (
                <div className="text-start capitalize whitespace-nowrap">{row.getValue('wilayah')}</div>
            )
        },
        {
            accessorKey: 'serpo',
            header: 'Serpo',
            cell: ({row}) => (
                <div className="text-start capitalize whitespace-nowrap">{row.getValue('serpo')}</div>
            )
        },
        {
            accessorKey: 'pmlink',
            header: 'Link',
            cell: ({row}) => (
                <div className="capitalize whitespace-nowrap">{row.getValue('pmlink')}</div>
            )
        },
        {
            accessorKey: 'pmpop',
            header: 'POP',
            cell: ({row}) => (
                <div className="capitalize whitespace-nowrap">{row.getValue('pmpop')}</div>
            )
        },
        {
            header: 'Tercapai',
            cell: ({row}) => {
                const total = Number(row.getValue('pmpop')) + Number(row.getValue('pmlink'));
                return <div className="capitalize whitespace-nowrap">{total}</div>
            }
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({row}) => {
                if (row.getValue('status') === 'not done') {
                    return <div className="capitalize whitespace-nowrap text-red-500">{row.getValue('status')}</div>
                } else {
                    return <div className="capitalize whitespace-nowrap text-green-500">{row.getValue('status')}</div>
                }
            }
        },
    ]

    const table = useReactTable({
        data: dataTable,
        columns: struktur,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageSize: 12,
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
                            {header.headers.map((item) => {
                                return (
                                    <TableHead 
                                    key={item.id}
                                    className="text-center"
                                    >
                                        {item.isPlaceholder ? null : flexRender(item.column.columnDef.header,item.getContext())}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length? (
                        table.getRowModel().rows.map((row) =>{
                            return (
                                <TableRow 
                                    key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell 
                            colSpan={struktur.length}
                            >Tidak ada data</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
    
}