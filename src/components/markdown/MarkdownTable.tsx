import React from 'react';

/**
 * Neon-themed custom table component with cyberpunk styling
 * Wraps table in responsive container with overflow scroll
 */
export const NeonTable = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto my-8">
    <table
      className="min-w-full border-2 border-neon-cyan/50 rounded-lg border-collapse"
      {...props}
    >
      {children}
    </table>
  </div>
);

/**
 * Table header with neon cyan gradient background and bottom border
 */
export const NeonTableHead = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead
    className="bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 border-b-2 border-neon-cyan"
    {...props}
  >
    {children}
  </thead>
);

/**
 * Table body - default styling
 */
export const NeonTableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props}>
    {children}
  </tbody>
);

/**
 * Table row with hover effect and neon glow
 */
export const NeonTableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className="border-b border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all duration-200"
    {...props}
  >
    {children}
  </tr>
);

/**
 * Table header cell with neon green text and bold styling
 */
export const NeonTableHeader = ({ children, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
  <th
    className="px-6 py-4 text-left text-neon-green font-bold text-sm uppercase tracking-wider first:pl-8"
    {...props}
  >
    {children}
  </th>
);

/**
 * Table data cell with neon cyan text
 */
export const NeonTableCell = ({ children, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
  <td
    className="px-6 py-4 text-neon-cyan first:pl-8"
    {...props}
  >
    {children}
  </td>
);
