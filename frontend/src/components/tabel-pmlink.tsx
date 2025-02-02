"use client"
import { usePmLink } from "@/context/pmlink-context"
import { useEffect, useState } from "react"
// import { getDataPmLink } from "../../utils/api"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation"

export default function Tabelpmlink() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  // const [data, setData] = useState<pmLink[]>([])
  // const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null);
  const [wilayahFilter, setWilayahFilter] = useState<string | null>(null);
  const [serpoFilter, setSerpoFilter] = useState<string | null>(null);
  const {dataPm, loading} = usePmLink();

  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(JSON.parse(storedRole));
    } else {
      router.push('/');
    }
  }, [router]);

  
  type pmLink = {
    serpo: string
    wilayah: string
    segment: string
    tanggalpm : string
    traveltiket: number
    jarak: number
  }

  const getStruktur = (role: string | null): ColumnDef<pmLink>[] => {
    const struktur: ColumnDef<pmLink>[] = [
        {
            id: "select",
            header:({table}) =>(
              <Checkbox
                checked = { table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value:any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"/>
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
            accessorKey: "segment",
            header: "Segment",
            cell: ({row}) => (
                <div className="capitalize whitespace-nowrap">{row.getValue("segment")}</div>
            )
        },
        {
          accessorKey: "tanggalpm",
          header: "Tanggal PM",
          cell: ({ row }) => (
            <div className="capitalize">{row.getValue("tanggalpm")}</div>
          )
        },
        {
            accessorKey: 'traveltiket',
            header: 'TT',
            cell: ({row}) => (
                <div className="capitalize">{row.getValue<number>('traveltiket')}</div>
            )
        },
        {
            accessorKey: 'jarak',
            header: 'Jarak',
            cell: ({row}) => (
                <div className="capitalize text-nowrap">{row.getValue<number>('jarak')} km</div>
            )
        },
        // {
        //     id: "actions",
        //     enableHiding: false,
        //     cell: ({ row }) => {
        //       const status = row.getValue('traveltiket');
        
        //       return (
        //         <DropdownMenu>
        //           <DropdownMenuTrigger asChild>
        //             <Button variant="ghost" className="h-8 w-8 p-0">
        //               <span className="sr-only">Open menu</span>
        //               <MoreHorizontal />
        //             </Button>
        //           </DropdownMenuTrigger>
        //           <DropdownMenuContent align="end">
        //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //             {
        //                 status === "Belum" || status === "Gagal" ? (
        //                     <DropdownMenuItem 
        //                         onClick={() => router.push("/laporan")}
        //                     >
        //                         Tambahkan Laporan
        //                     </DropdownMenuItem>
        //                 ) : <DropdownMenuItem></DropdownMenuItem>
        //             }
        //           </DropdownMenuContent>
        //         </DropdownMenu>
        //       )
        //     },
        // },
    ];

    if (role !== 'serpo'){
        struktur.splice(1,0,{
            accessorKey: 'serpo',
            header: 'Serpo',
            cell: ({row}) => (
                <div className="capitalize whitespace-nowrap">{row.getValue('serpo')}</div>
            )
        })

        struktur.splice(2,0, {
            accessorKey: 'wilayah',
            header: 'Wilayah',
            cell: ({row}) => (
                <div className="capitalize">{row.getValue('wilayah')}</div>
            )
        })
    }
    return struktur;
  }
  const struktur = getStruktur(role);
  

  const table = useReactTable({
    data: dataPm,
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
        pageSize: 10 //mengatur berapa baris yang di show oleh data
      }
    }
  })

  useEffect(() => {
    const filters: ColumnFiltersState = [];

    if (wilayahFilter) {
        filters.push({ id: "wilayah", value: wilayahFilter });
    }
    if (serpoFilter) {
        filters.push({ id: "serpo", value: serpoFilter });
    }

    table.setColumnFilters(filters);
}, [wilayahFilter, serpoFilter, table]);

  return (
    <div className="w-full p-2 col-span-2">
      <div className="rounded-md border">
        <h1 className="text-center uppercase font-bold mt-2">tabel pm link</h1>
        <div className="flex space-x-4 mb-4 ml-4">
          {/* Filter Wilayah */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {wilayahFilter ? `Wilayah: ${wilayahFilter}` : "Filter Wilayah"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setWilayahFilter(null)}>Semua</DropdownMenuItem>
              {Array.from(new Set(dataPm.map((item) => item.wilayah))).map((wilayah) => (
                <DropdownMenuItem key={wilayah} onClick={() => setWilayahFilter(wilayah)}>
                  {wilayah}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter Serpo */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {serpoFilter ? `Serpo: ${serpoFilter}` : "Filter Serpo"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSerpoFilter(null)}>Semua</DropdownMenuItem>
              {Array.from(new Set(dataPm.map((item) => item.serpo))).map((serpo) => (
                <DropdownMenuItem key={serpo} onClick={() => setSerpoFilter(serpo)}>
                  {serpo}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>        
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={struktur.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
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
