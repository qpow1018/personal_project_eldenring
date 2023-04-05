import { createContext } from "react";
import {
  Stack,
  Box,
  Typography
} from '@mui/material';

type ElTableProps = {
  grid: string
}

const InitialValue: ElTableProps = {
  grid: ''
}

const TableContext = createContext(InitialValue);

export function Table(
  props: {
    title?: string,
    grid: string,
    children: React.ReactNode,
    sx?: any
  }
) {
  const tableProps: ElTableProps = {
    grid: props.grid
  }

  return (
    <Box sx={{ ...props.sx }}>
      { props.title !== undefined &&
        <Typography
          fontSize={14}
          fontWeight={500}
          sx={{ marginBottom: '8px' }}
        >
          { props.title }
        </Typography>
      }

      <Box
        sx={theme => ({
          overflow: 'hidden',
          borderRadius: theme.style.borderRadius,
          border: `1px solid ${theme.color.border}`
        })}
      >
        <TableContext.Provider value={tableProps}>
          { props.children }
        </TableContext.Provider>
      </Box>
    </Box>
  );
};

export function TableRow(
  props: {
    header?: boolean,
    children?: React.ReactNode
  }
) {
  return (
    <TableContext.Consumer>
      {(value) => {
        return (
          <Box
            sx={[
              (theme => ({
                display: 'grid',
                gridTemplateColumns: value.grid,
                gridTemplateRows: '1fr',
                fontSize: 14,
                fontWeight: 400,
                color: theme.color.text.main,
                borderBottom: `1px solid ${theme.color.border}`,
                '&:last-of-type': {
                  borderBottom: 'none'
                }
              })),
              props.header === true && {
                borderTop: 'none',
                backgroundColor: '#2b3035'
              }
            ]}
          >
            { props.children }
          </Box>
        );
      }}
    </TableContext.Consumer>
  );
};

export function TableCell(
  props: {
    children?: React.ReactNode
  }
) {
  return (
    <TableContext.Consumer>
      {(value) => {
        return (
          <Stack
            direction={'row'}
            sx={theme => ({
              position: 'relative',
              padding: '0 12px',
              height: 40,
              fontSize: 'inherit',
              fontWeight: 'inherit',
              color: 'inherit',
              alignItems: 'center',
              justifyContent: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '1px',
                height: '100%',
                backgroundColor: theme.color.border
              },
              '&:first-of-type': {
                '&::before': {
                  display: 'none'
                }
              }
            })}
          >
            <Typography variant='inner'>
              { props.children }
            </Typography>
          </Stack>
        )
      }}
    </TableContext.Consumer>
  );
};