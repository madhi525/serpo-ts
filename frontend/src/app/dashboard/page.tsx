"use client"

import * as React from "react"
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
import { 
    // ArrowUpDown,
    // ChevronDown,
      MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
//   DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
//   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation"

const data: Raker[] = [
  {
    id: "728ed52f",
    name: "PM LINK",
    tipe: "LINK",
    status: "Sudah",
    deadline: new Date("2025-02-05"),
    realisasi: new Date("2025-02-01"),
  },
  {
    id: "489e1d42",
    name: "PM POP",
    tipe: "POP",
    status: "Belum",
    deadline: new Date("2025-02-05"),
    realisasi: null
  },
  {
    id: "728ed52f",
    name: "PM LINK",
    tipe: "LINK",
    status: "Sudah",
    deadline: new Date("2025-02-05"),
    realisasi: new Date("2025-02-01"),
  },
  {
    id: "489e1d42",
    name: "PM POP",
    tipe: "POP",
    status: "Belum",
    deadline: new Date("2025-02-05"),
    realisasi: null
  },
  {
    id: "728ed52f",
    name: "PM LINK",
    tipe: "LINK",
    status: "Sudah",
    deadline: new Date("2025-02-05"),
    realisasi: new Date("2025-02-01"),
  },
  {
    id: "489e1d42",
    name: "PM POP",
    tipe: "POP",
    status: "Belum",
    deadline: new Date("2025-02-05"),
    realisasi: null
  },
  {
    id: "728ed52f",
    name: "PM LINK",
    tipe: "LINK",
    status: "Sudah",
    deadline: new Date("2025-02-05"),
    realisasi: new Date("2025-02-01"),
  },
  {
    id: "489e1d42",
    name: "PM POP",
    tipe: "POP",
    status: "Belum",
    deadline: new Date("2025-02-05"),
    realisasi: null
  },
  {
    id: "728ed52f",
    name: "PM LINK",
    tipe: "LINK",
    status: "Sudah",
    deadline: new Date("2025-02-05"),
    realisasi: new Date("2025-02-01"),
  },
  {
    id: "489e1d42",
    name: "PM POP",
    tipe: "POP",
    status: "Belum",
    deadline: new Date("2025-02-05"),
    realisasi: null
  },
  {
    id: "728ed52f",
    name: "PM LINK",
    tipe: "LINK",
    status: "Sudah",
    deadline: new Date("2025-02-05"),
    realisasi: new Date("2025-02-01"),
  },
  {
    id: "489e1d42",
    name: "PM POP",
    tipe: "POP",
    status: "Belum",
    deadline: new Date("2025-02-05"),
    realisasi: null
  },
  {
    id: "728ed52f",
    name: "PM LINK",
    tipe: "LINK",
    status: "Sudah",
    deadline: new Date("2025-02-05"),
    realisasi: new Date("2025-02-01"),
  },
  {
    id: "489e1d42",
    name: "PM POP",
    tipe: "POP",
    status: "Belum",
    deadline: new Date("2025-02-05"),
    realisasi: null
  },
  // ...
]

export type Raker = {
    id: string
    name: string
    tipe: "POP" | "LINK"
    status: "Belum" | "Sudah" | "Gagal"
    deadline: Date
    realisasi: Date | null
  }

export const rakerStruktur: ColumnDef<Raker>[] = [
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
  },{
    accessorKey: "name",
    header: "name",
    cell: ({row}) => (
      <div className="capitaalize">{row.getValue("name")}</div>
    ),
  },{
    accessorKey: "status",
    header: "status",
    cell: ({row}) => (
      <div className={row.getValue("status") === "Sudah" ? "text-green-600" : "text-red-600"}>{row.getValue("status")}</div>
    ),
  }, {
    accessorKey: "deadline",
    header: "deadline",
    cell: ({row}) => {
        const deadline = row.getValue<Date>("deadline");
        return <div className="capitalize">{deadline ? deadline.toLocaleDateString() : "N/A"}</div>
    },
  },{
    accessorKey: "realisasi",
    header: "realisasi",
    cell: ({row}) => {
        const realisasi = row.getValue<Date>("realisasi");
        return <div className="capitalize">{realisasi ? realisasi.toLocaleDateString() : "N/A"}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const status = row.getValue('status');
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {
                status === "Belum" || status === "Gagal" ? (
                    <DropdownMenuItem 
                        onClick={() => router.push("/laporan")}
                    >
                        Tambahkan Laporan
                    </DropdownMenuItem>
                ) : <DropdownMenuItem></DropdownMenuItem>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function Page() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns: rakerStruktur,
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
        pageSize: 5
      }
    }
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
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
                  colSpan={rakerStruktur.length}
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
