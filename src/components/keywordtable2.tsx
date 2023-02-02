import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { indexMap, intentMap } from '../const';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function KeywordTable2(props: {data: {raw_broadmatch_data: string[][], raw_related_data: string[][], raw_question_data: string[][]}, selected: number}) {
  const [rows, setRows] = React.useState<string[][]>([]);
  React.useEffect(()=>{
    if(props.selected === 0)
      setRows(props.data.raw_broadmatch_data)
    else if(props.selected === 1)
      setRows(props.data.raw_related_data)
    else
      setRows(props.data.raw_question_data)
  })

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Keywords</TableCell>
            <TableCell align="left">Intent</TableCell>
            <TableCell align="left">Volume</TableCell>
            <TableCell align="left">KD %</TableCell>
            <TableCell align="left">CPC (USD)</TableCell>
            <TableCell align="left">Com.</TableCell>
            <TableCell align="left">Results</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, id) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row[indexMap['keyword']]}
              </TableCell>
              <TableCell align="right">{intentMap(row[indexMap['Intent']] as unknown as number).type}</TableCell>
              <TableCell align="right">{row[indexMap['Search Volume']]}</TableCell>
              <TableCell align="right">{row[indexMap['Keyword Diffuculty']]}</TableCell>
              <TableCell align="right">{row[indexMap['CPC']]}</TableCell>
              <TableCell align="right">{row[indexMap['Competition']]}</TableCell>
              <TableCell align="right">{row[indexMap['Number of Results']]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}