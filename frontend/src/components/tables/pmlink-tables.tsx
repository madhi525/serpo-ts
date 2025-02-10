import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
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
  } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import * as React from 'react';
import { getDataPmLink } from "../../../utils/api";

type pmLink = {
    id: string
    serpo: string,
    segment: string,
    traveltiket: number,
    tanggalpm: Date,
    tikorawal: {
        type:{
            lat: number
            lon: number
        }
    },
    tikorakhir:{
        type:{
            lat: number
            lon: number
        }
    },
    
    
}

export default function PmlinkTable(){
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    useEffect(() => {
        async function fetchdata() {
            const response = await getDataPmLink('');
        }
    })

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
            pageSize: 5 //mengatur berapa baris yang di show oleh data
          }
        }
      })
    return (
        <div className="w-full">
            <div className="rounded-md border">

            </div>
        </div>
    )
}