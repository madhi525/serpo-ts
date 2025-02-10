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

export default function TabelRaker() {
    const router = useRouter();
    const { dataRaker, loading } = useRaker();
    const [role, setRole] = useState<string | null>("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [wilayahFilter, setWilayahFilter] = useState<string | null>(null);
    const [serpoFilter, setSerpoFilter] = useState<string | null>(null);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    useEffect(()=> {
        const storedRole = localStorage.getItem('role');
        if (storedRole) {
            setRole(JSON.parse(storedRole));
        } else {
            router.push('/');
        }
    }, [router]);

    const getStruktur = (role: string | null): ColumnDef<raker>[] => {
        const struktur: ColumnDef<raker>[] = [
            {
                id: "select",
                header: ({table}) => (
                    <Checkbox
                        checked = { table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                        onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all" />
                ),
                cell: ({row}) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"/>
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "nama",
                header: "Nama Raker",
                cell: ({row}) => (
                    <div className="capitalize whitespace-nowrap">{row.getValue('nama')}</div>
                ),
                enableSorting: true,
            },
            {
                accessorKey:"deadline",
                header: "Deadline",
                cell: ({row}) => (
                    <div className="capitalize whitespace-nowrap">{row.getValue('deadline')}</div>
                ),
                enableSorting: true,
            },
            {
                accessorKey: "realisasi",
                header: "Realisasi",
                cell: ({row}) => {
                    if (row.getValue('realisasi') === null) {
                        return <div className="capitalize whitespace-nowrap text-red-500">{row.getValue('realisasi')}</div>
                    } else {
                        return <div className="capitalize whitespace-nowrap text-green-500">{row.getValue('realisasi')}</div>
                    }
                },
                enableSorting: true,
            }
        ];
        if (role !== 'serpo'){
            struktur.splice(1,0,{
                accessorKey: "wilayah",
                header: "Wilayah",
                cell: ({row}) => (
                    <div className="capitalize whitespace-nowrap">{row.getValue('wilayah')}</div>
                ),
                enableSorting: true,
            })
            struktur.splice(2,0, {
                accessorKey: "serpo",
                header: "Serpo",
                cell: ({row}) => (
                    <div className="capitalize whitespace-nowrap">{row.getValue('serpo')}</div>
                ),
                enableSorting: true,
            })
        }
        return struktur;
    }

    const struktur = getStruktur(role);

    const table = useReactTable({
        data: dataRaker,
        columns: struktur,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 10
            }
        }
    })

    useEffect(() => {
        const filters: ColumnFiltersState = [];

        if (wilayahFilter) {
            filters.push({ id: "wilayah", value: wilayahFilter});
        }
        if (serpoFilter) {
            filters.push({ id: "serpo", value: serpoFilter });
        }
        table.setColumnFilters(filters);
    }, [wilayahFilter, serpoFilter, table]);

    if (loading){
        return(
            <div className="w-full p-2 col-span-2">
            <div className="rounded-md border p-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }

    return (
        <div className="w-full p-2 col-span-2">
            <div className="rounded-md border p-4">
                <h1 className="text-center uppercase font-bold mt-2">tabel raker</h1>
                <div className="flex space-x-4 mb-4 ml-4">
                    {
                        role !== 'serpo' ? (
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant='outline'>
                                            {wilayahFilter? `wilayah: ${wilayahFilter}` : 'Filter Wilayah'}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => setWilayahFilter(null)}>
                                            Semua
                                        </DropdownMenuItem>
                                        {Array.from(new Set(dataRaker.map((item) => item.wilayah))).map((wilayah) => (
                                            <DropdownMenuItem key={wilayah} onClick={() => setWilayahFilter(wilayah)}>
                                                {wilayah}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant='outline'>
                                            {wilayahFilter? `Serpo: ${serpoFilter}` : 'Filter Serpo'}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => setSerpoFilter(null)}>
                                            Semua
                                        </DropdownMenuItem>
                                        {Array.from(new Set(dataRaker.map((item) => item.serpo))).map((serpo) => (
                                            <DropdownMenuItem key={serpo} onClick={() => setSerpoFilter(serpo)}>
                                                {serpo}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : ""
                    }
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headgrup) => (
                                <TableRow key={headgrup.id}>
                                    {headgrup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => {
                                    return (
                                        <TableRow 
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        >
                                            {
                                                row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={struktur.length}
                                        className="h-24 text-center"
                                    >
                                        No Result.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} rows(s) selected
                </div>
                <div className="space-x-2">
                    <Button
                        variant={"outline"}
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage}
                    >
                        Previous
                    </Button>
                    <Button
                        variant={"outline"}
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}