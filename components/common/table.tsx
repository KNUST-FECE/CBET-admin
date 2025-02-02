import { flexRender, HeaderGroup, Row } from "@tanstack/react-table";

type Prop<TData> = {
    HG : HeaderGroup<TData>[];
    TR : Row<TData>[]
}

export default function Table<TData>(props: Prop<TData>) {
    return (
        <table id="main-table">
            <thead>
                {props.HG.map(hg => (
                    <tr key={hg.id}>
                        {hg.headers.map(h => (
                            <th key={h.id} className={h.column.columnDef.meta?.headClass}>
                                {h.isPlaceholder ? null : flexRender( h.column.columnDef.header, h.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {props.TR.map(r => (
                    <tr key={r.id} data-state={r.getIsSelected() && "selected"}>
                        {r.getAllCells().map(c => (
                            <td key={c.id} className={c.column.columnDef.meta?.cellClass}>
                                {flexRender(c.column.columnDef.cell, c.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}