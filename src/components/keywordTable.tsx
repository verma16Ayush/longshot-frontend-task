import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { indexMap, intentMap, keywordDifficultyMap } from '../const';
import { numFormatter } from '../services/common.utility';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Chip } from '@mui/material';
import { rowDataType } from '../App';


interface Data {
  cpc: number;
  keywordDifficulty: number;
  volume: number;
  keyword: string;
  intent: string;
  competition: number;
  results: number;
  intentBgColor: string;
  intentTextColor: string;
}

function createData(
  cpc: number,
  keywordDifficulty: number,
  volume: number,
  keyword: string,
  intent: string,
  competition: number,
  results: number,
  intentBgColor: string,
  intentTextColor: string,

): Data {
  return {
    keyword,
    volume,
    keywordDifficulty,
    intent,
    competition,
    cpc,
    results,
    intentBgColor,
    intentTextColor
  };
}

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
// ];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'keyword',
    numeric: false,
    disablePadding: true,
    label: 'Keyword',
  },
  {
    id: 'intent',
    numeric: false,
    disablePadding: false,
    label: 'Intent',
  },
  {
    id: 'cpc',
    numeric: true,
    disablePadding: false,
    label: 'CPC(USD)',
  },
  {
    id: 'competition',
    numeric: true,
    disablePadding: false,
    label: 'Com.',
  },
  {
    id: 'results',
    numeric: true,
    disablePadding: false,
    label: 'Results',
  },
  {
    id: 'keywordDifficulty',
    numeric: true,
    disablePadding: false,
    label: 'KD%',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// interface EnhancedTableToolbarProps {
//   numSelected: number;
// }

// function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}
//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

export default function KeywordTable(props: {data: string[][], setSelRowData: React.Dispatch<React.SetStateAction<rowDataType>>}) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('volume');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<Data[]>([]);
  const [intent, setIntent] = React.useState<{}>();

  React.useEffect(()=>{
    console.log(props.data)
    const A = props.data?.map((val, id)=>{
        return createData(
          val ? val[indexMap['CPC']] as unknown as number : 0, 
          val ? val[indexMap['Keyword Diffuculty']] as unknown as number : 0, 
          val ? val[indexMap['Search Volume']] as unknown as number : 0, 
          val ? val[indexMap['keyword']] : '', 
          intentMap(val[indexMap['Intent']] as unknown as number)?.type, 
          val ? val[indexMap['Competition']] as unknown as number : 0, 
          val ? val[indexMap['Number of Results']] as unknown as number : 0,
          intentMap(val[indexMap['Intent']] as unknown as number)?.color.bg, 
          intentMap(val[indexMap['Intent']] as unknown as number)?.color.text, 
        )
      })
    console.log('A', A)
    // props.setSelRowData({
    //   keyword: A[0].keyword,
    //   volume: A[0].volume,
    //   com: A[0].competition,
    //   cpc:A[0].cpc,
    //   intent: A[0].intent,
    //   kd: A[0].keywordDifficulty,
    //   results: A[0].results
    // })
    setRows(A)
  }, [props.data])

  // React.useEffect(()=>{
  //   setIntent(intentMap(val[indexMap['Intent']] as unknown as number))
  // }, [props.data])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.keyword);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.keyword);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.keyword)}
                      onClick={(event)=>props.setSelRowData({keyword: row.keyword, volume: row.volume, com: row.competition, cpc: row.cpc, intent: row.intent, kd: row.keywordDifficulty, results: row.results})}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.keyword}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.keyword)}

                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.keyword}
                      </TableCell>
                      <TableCell align="left">
                        {/* {row.intent} */}
                        <Chip
                          label={row.intent[0]} 
                          size='small'
                          sx={{
                            bgcolor: row.intentBgColor,
                            color: row.intentTextColor,
                            fontSize: '10px'
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">{row.cpc}</TableCell>
                      <TableCell align="right">{row.competition}</TableCell>
                      <TableCell align="right">{numFormatter(row.results)}</TableCell>
                      <TableCell align="right">
                        {row.keywordDifficulty}{' '}
                        <FiberManualRecordIcon 
                          sx={{
                            fontSize: '12px', 
                            color:keywordDifficultyMap(row.keywordDifficulty).color}} 
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
