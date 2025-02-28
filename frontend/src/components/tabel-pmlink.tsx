"use client"

import { usePmLink } from "@/context/pmlink-context"
import { useEffect, useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
// import PMLinkForm from "@/app/dashboard/form/pmlink/page"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import dynamic from "next/dynamic"

type PmLink = {
  serpo: string
  wilayah: string
  segment: string
  tanggalpm: string
  traveltiket: number
  jarak: number
}

const PMLinkFormClient = dynamic(() => import("../app/dashboard/form/pmlink/PMLinkFormClient"), {
  ssr: false,
  loading: () => <p>Loading form...</p>,
})


export default function TabelPmLink() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [role, setRole] = useState<string | null>("")
  const [wilayahFilter, setWilayahFilter] = useState<string | null>(null)
  const [serpoFilter, setSerpoFilter] = useState<string | null>(null)
  const [personel, setPersonel] = useState<string | null>("")
  const [selectedRowData, setSelectedRowData] = useState<PmLink | null>(null)
  const { dataPmLink, loading } = usePmLink()

  const router = useRouter()

  useEffect(() => {
    const storedRole = localStorage.getItem("role")
    const storedPersonel = localStorage.getItem("personel")
    if (storedRole) {
      setRole(JSON.parse(storedRole))
      setPersonel(JSON.parse(storedPersonel))
    } else {
      router.push("/")
    }
  }, [router])

  const getStruktur = (role: string | null): ColumnDef<PmLink>[] => {
    const struktur: ColumnDef<PmLink>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "serpo",
        header: "Serpo",
        cell: ({ row }) => <div className="capitalize">{row.getValue("serpo")}</div>,
      },
      {
        accessorKey: "segment",
        header: "Segment",
        cell: ({ row }) => <div className="capitalize">{row.getValue("segment")}</div>,
      },
      {
        accessorKey: "tanggalpm",
        header: "Tanggal PM",
        cell: ({ row }) => <div className="capitalize">{row.getValue("tanggalpm")}</div>,
      },
      {
        accessorKey: "traveltiket",
        header: "TT",
        cell: ({ row }) => <div className="capitalize">{row.getValue<number>("traveltiket")}</div>,
      },
      {
        accessorKey: "jarak",
        header: "Jarak",
        cell: ({ row }) => <div className="capitalize">{row.getValue<number>("jarak")} km</div>,
      },
      {
        header: 'Edit',
        cell: ({ row }) => {
          const rowData = row.original
          return (
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedRowData(rowData)}
                >
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1000px] h-full overflow-auto">
                <DialogHeader>
                  <DialogTitle>Edit PM Link</DialogTitle>
                  <DialogDescription>Isi form berikut untuk mengedit PM Link.</DialogDescription>
                </DialogHeader>
                <PMLinkFormClient initialData={selectedRowData} />
              </DialogContent>
            </Dialog>
          )
        }
      }
    ]

    if (role !== "serpo") {
      struktur.splice(2, 0, {
        accessorKey: "wilayah",
        header: "Wilayah",
        cell: ({ row }) => <div className="capitalize">{row.getValue("wilayah")}</div>,
      })
    }
    return struktur
  }

  const struktur = getStruktur(role)

  const table = useReactTable({
    data: dataPmLink,
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
        pageSize: 10,
      },
    },
  })

  useEffect(() => {
    const filters: ColumnFiltersState = []
    if (role === "serpo" && personel) {
      filters.push({ id: "serpo", value: personel })
    }
    if (wilayahFilter) {
      filters.push({ id: "wilayah", value: wilayahFilter })
    }
    if (serpoFilter) {
      filters.push({ id: "serpo", value: serpoFilter })
    }
    table.setColumnFilters(filters)
  }, [wilayahFilter, serpoFilter, personel, role, table])

  if (loading) {
    return (
      <div className="w-full p-2">
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
    )
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-md border">
        <h1 className="text-center uppercase font-bold mt-2">Tabel PM Link</h1>
        <div className="flex flex-wrap gap-2 mb-4 p-4">
          {role !== "serpo" && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{wilayahFilter ? `Wilayah: ${wilayahFilter}` : "Filter Wilayah"}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setWilayahFilter(null)}>Semua</DropdownMenuItem>
                  {Array.from(new Set(dataPmLink.map((item) => item.wilayah))).map((wilayah) => (
                    <DropdownMenuItem key={wilayah} onClick={() => setWilayahFilter(wilayah)}>
                      {wilayah}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{serpoFilter ? `Serpo: ${serpoFilter}` : "Filter Serpo"}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSerpoFilter(null)}>Semua</DropdownMenuItem>
                  {Array.from(new Set(dataPmLink.map((item) => item.serpo))).map((serpo) => (
                    <DropdownMenuItem key={serpo} onClick={() => setSerpoFilter(serpo)}>
                      {serpo}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={struktur.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        {role === "serpo" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Tambahkan +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px] h-full overflow-auto">
              <DialogHeader>
                <DialogTitle>Tambah PM Link</DialogTitle>
                <DialogDescription>Isi form berikut untuk menambahkan PM Link baru.</DialogDescription>
              </DialogHeader>
              <PMLinkFormClient />
            </DialogContent>
          </Dialog>
        )}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
