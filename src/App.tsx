import { Box, Breadcrumbs, Button, ButtonGroup, Card, Chip, CircularProgress, Divider, Link, Typography, useTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AppDrawer } from "./components/appdrawer";
import { intentMap, keywordDifficultyMap, THEME } from "./const";
import { US } from 'country-flag-icons/react/3x2'
import { FacebookCircularProgress } from "./components/progress_indicator";
import { IGetDataRes } from "./types/getdatares";
import { fetchData } from "./services/http.services";

const indexMap = {
  "keyword": 0,
  "Search Volume": 1,
  "Intent": 2,
  "CPC": 3,
  "Competition": 4,
  "Number of Results": 5,
  "Trends": 6,
  "Keyword Diffuculty": 7
}

const numFormatter = (num: number) => {
  if(String(num).length < 4)
    return String(num);
  else if(String(num).length < 7)
    return String(Math.floor(num)/ 1000) + 'K'
  else
    return String(Math.floor(num) / 1000000) + 'M'
}

function App() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(true);
  const [data, setData] = React.useState<IGetDataRes>();
  const [loading, setLoading] = React.useState<boolean>(true)
  const [selRawData, setSelRawData] = useState<string[][]>([]);
  const [selRowData, setSelRowData] = useState<string[]>([]);
  const [kdMetaData, setKdMetaData] = useState<{rating: string; text:string; color: string}>();
  const [selRowDataIntent, setSelRowDataIntent] = useState<{type: string; hoverText: string; color: {bg: string; text: string; hover: string}}>()
  const [selRawDataId, setSelRawDataId] = useState<number>(0);
  useEffect(()=>{
    fetchData().then(res => {
      setData(res)
      setLoading(false);
      setSelRawData(res.raw_broadmatch_data)
      setSelRowData(res.raw_broadmatch_data[0]);
      setKdMetaData(keywordDifficultyMap(res.raw_broadmatch_data[0][indexMap['Keyword Diffuculty']] as unknown as number))
      setSelRowDataIntent(intentMap(res.raw_broadmatch_data[0][indexMap['Intent']] as unknown as number))
    }).catch(e=>console.log(e))
  }, [])

  useEffect(()=>console.log(data), [data])

  return (
    <ThemeProvider theme={THEME}>
      <AppDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <Box
        id='body-box'
        sx={{
          width: drawerOpen ? `calc(100vw - 250px)` : "100vw",
          height: "100vh",
          position: "fixed",
          top: "0",
          left: drawerOpen ? "250px" : 0,
          backgroundColor: "#F9FAFC",
          display: "flex",
          flexDirection: "column",
          p: 2
        }}
      >
        <Box
          id='title-box-breadcrumbs'
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Breadcrumbs aria-label='breadcrumb' separator='>'>
            <Typography color='grey' fontSize='small' fontWeight='bold' >
              Keyword Explorer
            </Typography>
            <Typography
              color='black'
              fontSize={'small'}
              fontWeight='bold'
            >
              Keyword Overview
            </Typography>
          </Breadcrumbs>

          <Box>
            <Typography color='black' fontWeight='bold' display='inline'>Keyword: </Typography>
            <Typography color='grey' fontWeight='bold' display='inline'>{selRowData[indexMap['keyword']]} </Typography>
          </Box>
          
          <Box>
            <Typography color='grey' display='inline' sx={{mr: 1}} fontSize='small' fontWeight='bold'>Database: United States</Typography>
            <US title="United States" width={'14px'}/>
          </Box>
          <Divider sx={{mt: 2, mb: 2}} />
        </Box>
        <Box
          id='cards-and-table'
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // justifyContent: 'center'
          }}
        >
          <Box
            id='cards-container'
            sx={{
              display: 'flex',
              width: '50em'
            }}
          >
            <Card
              id='card-1'
              elevation={0}
              sx={{
                border: 'solid 1px #F0F0F0',
                borderRadius: 2,
                width: '100%',
                p: 2,
                m: 1,
                flex: 1
              }}
            >
              <Typography fontSize='small'>
                Volume
              </Typography>
              <Box>
                <Typography fontSize={'larger'} color='black' fontWeight='bold' display='inline' mr={1} >{selRowData[indexMap['Search Volume']]}</Typography>
                <US width={'18px'} />
              </Box>
              <Divider sx={{mt: 1, mb: 1}} />

              <Box
                id='difficulty-percentage-box'
                sx={{
                  display: 'flex',
                  mt: 2, mb: 2
                }}
              >
                <Box>
                  <Typography fontSize='small' >Keyword Difficulty</Typography>
                  <Box
                    sx={{display: 'flex', alignItems: 'center'}}
                  >
                    <Box>
                      <Typography fontSize={'larger'} color='black' fontWeight={'bold'} >{`${selRowData[indexMap['Keyword Diffuculty']] || ''}%`}</Typography>
                      <Typography fontSize='small' >{kdMetaData?.rating}</Typography>
                    </Box>
                    <FacebookCircularProgress thickness={8} size={32} value={selRowData[indexMap['Keyword Diffuculty']] as unknown as number} clr={kdMetaData?.color || ''} />
                  </Box>
                </Box>
              </Box>
              <Typography fontSize='small' sx={{mt: 2, mb: 2}}>{kdMetaData?.text}</Typography>
            </Card>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Card
                id='card-2'
                elevation={0}
                sx={{
                  border: 'solid 1px #F0F0F0',
                  borderRadius: 2,
                  width: '100%',
                  p: 2,
                  m: 1,
                  flex: 1
                }}
              >
                <Typography fontSize='small' >Intent</Typography>
                <Chip 
                  size='small' 
                  variant="filled" 
                  label={selRowDataIntent?.type} 
                  sx={{
                    color: selRowDataIntent?.color.text, 
                    bgcolor: selRowDataIntent?.color.bg, 
                    fontSize: '12px'
                  }} 
                />
              </Card>
              
              <Card
                id='card-3'
                elevation={0}
                sx={{
                  border: 'solid 1px #F0F0F0',
                  borderRadius: 2,
                  width: '100%',
                  p: 2,
                  m: 1,
                  flex: 1
                }}
              >
                <Typography fontSize='small' >Results</Typography>
                <Typography fontSize='larger' fontWeight='bold' >{numFormatter(selRowData[indexMap['Number of Results']] as unknown as number)}</Typography>
              </Card>
              <Card
                id='card-4'
                elevation={0}
                sx={{
                  border: 'solid 1px #F0F0F0',
                  borderRadius: 2,
                  width: '100%',
                  p: 2,
                  m: 1,
                  flex: 1
                }}
              >
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  <Box sx={{flex: 1}} >
                    <Typography fontSize='small' >CPC</Typography>
                    <Typography fontSize='larger' fontWeight='bold' >${selRowData[indexMap['CPC']]}</Typography>
                  </Box>
                  <Box sx={{flex: 1}} >
                    <Typography fontSize='small' >Com.</Typography>
                    <Typography fontSize='larger' fontWeight='bold' >{selRowData[indexMap['Competition']]}</Typography>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>
          <Box
            id='table-buttons'
            sx={{
              display: 'flex',
              width: '50em',
              m: 1, p: 1
            }}
          >
            <ButtonGroup disableElevation disableRipple disableFocusRipple sx={{flex: 1}} size='small' variant="outlined" aria-label="outlined button group">
              {['Broadmatch', 'Related', 'Questions'].map((val, id)=>{
                return (
                  <Button onClick={()=>setSelRawDataId(id)} sx={{backgroundColor: selRawDataId === id ? '#F2EDFD' : '#ffffff'}} >{val}</Button>
                )
              })}
            </ButtonGroup>
            <Button variant='contained' size="small">Add to List</Button>
          </Box>       
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
