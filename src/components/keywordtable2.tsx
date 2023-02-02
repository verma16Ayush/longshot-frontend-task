import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { indexMap, intentMap } from '../const';


export default function KeywordTable2(props: {data: {raw_broadmatch_data: string[][], raw_related_data: string[][], raw_question_data: string[][]}, selected: number}) {
  const [rows, setRows] = React.useState<string[][]>([]);
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