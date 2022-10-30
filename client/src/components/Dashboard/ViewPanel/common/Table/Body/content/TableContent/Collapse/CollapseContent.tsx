import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';

interface CollapseContentProps {
  isItemCollapsed: boolean;
  children: React.ReactNode;
}

export default function CollapseContent({
  isItemCollapsed,
  children,
}: CollapseContentProps) {
  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={15}>
      <Collapse in={isItemCollapsed} timeout="auto" unmountOnExit>
        <Box px={2} pb={3} margin={2}>
          {children}
        </Box>
      </Collapse>
    </TableCell>
  );
}
