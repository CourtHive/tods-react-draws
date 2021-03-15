import './styles.css';
import React, { useMemo } from 'react';
import { Virtuoso, ListProps, ItemProps } from 'react-virtuoso';

const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export interface Column<I, R> {
  id: I;
  label: React.ReactNode;
  render: (row: R) => React.ReactNode;
}

interface VirtuosoTableProps<I, R> {
  columns: Column<I, R>[];
  rows: R[];
  style: React.CSSProperties;
}

const VirtuosoTable = <I extends string, R>({
  columns,
  rows,
  style,
}: VirtuosoTableProps<I, R>) => {
  return (
    <Virtuoso
      style={style}
      totalCount={rows.length}
      components={{
        List: React.forwardRef<any, ListProps>(({ children, style }, ref) => {
          return (
            <table
              style={
                {
                  '--virtuosoPaddingTop': (style?.paddingTop ?? 0) + 'px',
                  '--virtuosoPaddingBottom': (style?.paddingBottom ?? 0) + 'px',
                } as any
              }
            >
              <thead>
                <tr>
                  {columns.map(col => (
                    <th key={col.id}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody ref={ref}>{children}</tbody>
            </table>
          );
        }),
        Item: useMemo(
          () => (props: ItemProps) => {
            const row = rows[props['data-index']];

            return (
              <tr {...props}>
                {columns.map(col => (
                  <td key={col.id}>{col.render(row)}</td>
                ))}
              </tr>
            );
          },
          [columns, rows]
        ),
      }}
    />
  );
};

export default function App() {
  interface Row {
    name: string;
    age: number;
  }
  const rows = names.map(s => ({
    name: s,
    age: Math.floor(Math.random() * 101),
  }));

  const columns: Column<string, Row>[] = [
    {
      id: 'name',
      label: 'Name',
      render: r => r.name,
    },
    {
      id: 'age',
      label: 'Age',
      render: r => r.age,
    },
  ];

  return (
    <div className="App">
      <h1>Hello VirtuosoTable</h1>

      <VirtuosoTable columns={columns} rows={rows} style={{ height: 400 }} />
    </div>
  );
}
