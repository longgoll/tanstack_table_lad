import './index.css'
import { useState } from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Select from 'react-select'

const columnHelper = createColumnHelper()

function Lad2() {
    const [data, setData] = useState([
        { firstName: '', lastName: '', age: '', visits: '', status: '', progress: '' }
    ])

    const [options, setOptions] = useState([
        { value: 'John', label: 'John' },
        { value: 'Jane', label: 'Jane' },
        { value: 'Doe', label: 'Doe' }
    ])

    const addRow = () => {
        setData([...data, { firstName: '', lastName: '', age: '', visits: '', status: '', progress: '' }])
    }

    const removeRow = () => {
        setData(data.slice(0, -1))
    }

    const updateData = (rowIndex, columnId, value) => {
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    const updatedRow = {
                        ...row,
                        [columnId]: value,
                    }
                    return updatedRow
                }
                return row
            })
        )
    }

    const columns = [
        columnHelper.accessor('firstName', {
            cell: info => (
                <Select
                    value={options.find(option => option.value === info.getValue())}
                    onChange={selectedOption => updateData(info.row.index, 'firstName', selectedOption.value)}
                    options={options}
                    isClearable
                    isSearchable
                />
            ),
            footer: info => info.column.id,
        }),
        columnHelper.accessor(row => row.lastName, {
            id: 'lastName',
            cell: info => (
                <input
                    value={info.getValue() || ''}
                    onChange={e => updateData(info.row.index, 'lastName', e.target.value)}
                />
            ),
            header: () => <span>Last Name</span>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('age', {
            header: () => 'Age',
            cell: info => (
                <input
                    value={info.getValue() || ''}
                    onChange={e => updateData(info.row.index, 'age', e.target.value)}
                />
            ),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('visits', {
            header: () => <span>Visits</span>,
            cell: info => (
                <input
                    value={info.getValue() || ''}
                    onChange={e => updateData(info.row.index, 'visits', e.target.value)}
                />
            ),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: info => (
                <input
                    value={info.getValue() || ''}
                    onChange={e => updateData(info.row.index, 'status', e.target.value)}
                />
            ),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('progress', {
            header: 'Profile Progress',
            cell: info => (
                <input
                    value={info.getValue() || ''}
                    onChange={e => updateData(info.row.index, 'progress', e.target.value)}
                />
            ),
            footer: info => info.column.id,
        }),
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="p-2">
            <button onClick={addRow}>+</button>
            <button onClick={removeRow}>-</button>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="h-4" />
        </div>
    )
}

export default Lad2