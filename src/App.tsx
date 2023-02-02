import { Box, Breadcrumbs, Button, ButtonGroup, Card, Chip, CircularProgress, Divider, Link, Typography, useTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AppDrawer } from "./components/appdrawer";
import { indexMap, intentIndexMap, intentMap, keywordDifficultyMap, THEME } from "./const";
import { US } from 'country-flag-icons/react/3x2'
import { FacebookCircularProgress } from "./components/progress_indicator";
import { IGetDataRes } from "./types/getdatares";
import { fetchData } from "./services/http.services";
import KeywordTable from "./components/keywordTable";
import { numFormatter } from "./services/common.utility";
import KeywordTable2 from "./components/keywordtable2";
import { Draggable } from "./components/draggable";

const rawDataTypeMap = [
  {
    id: 0,
    type: 'raw_broadmatch_data'
  },
  {
    id: 1,
    type: 'raw_related_data',
  },
  {
    id: 2,
    type: 'raw_question_data'
  }
]

 export type rowDataType = {keyword: string; volume: number, kd: number, intent: string, results: number, cpc: number, com: number}

function App() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(true);
  const [data, setData] = React.useState<IGetDataRes>();
  const [loading, setLoading] = React.useState<boolean>(true)
  const [selRawData, setSelRawData] = useState<string[][]>([]);
  const [selRowData, setSelRowData] = useState<rowDataType>({keyword: 'shopping in barcelona', com: 0, cpc: 0, intent: 'Commercial', kd: 0, results: 0, volume: 0});
  const [kdMetaData, setKdMetaData] = useState<{rating: string; text:string; color: string}>();
  const [selRowDataIntent, setSelRowDataIntent] = useState<{type: string; hoverText: string; color: {bg: string; text: string; hover: string}}>()
  const [selRawDataType, setSelRawDataType] = useState<{id: number, type: string}>(rawDataTypeMap[0]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(()=>{
    fetchData().then(res => {
      setData(res)
      setLoading(false);
      setSelRawData(res.raw_broadmatch_data)
      // setSelRowData(res.raw_broadmatch_data[0]);
      setKdMetaData(keywordDifficultyMap(res.raw_broadmatch_data[0][indexMap['Keyword Diffuculty']] as unknown as number))
      setSelRowDataIntent(intentMap(res.raw_broadmatch_data[0][indexMap['Intent']] as unknown as number))
    }).catch(e=>console.log(e))
  }, [])

  useEffect(() =>{
    if(selRawDataType.id === 0){
      setSelRawData(data?.raw_broadmatch_data || [])
      // setSelRowData(data?.raw_broadmatch_data[0] || [])
    }
    else if(selRawDataType.id === 1){
      setSelRawData(data?.raw_related_data || [])
      // setSelRowData(data?.raw_related_data[0] || [])
    }
    else{
      setSelRawData(data?.raw_question_data || []);
      // setSelRowData(data?.raw_question_data[0] || [])
    }
    console.log(selRawDataType)
  }, [selRawDataType, data])

  useEffect(()=>console.log(data), [data])

  // const BroadMatchDataTable = <KeywordTable2 data={data?.raw_broadmatch_data || []} />
  // const RelatedDataTable = <KeywordTable2 data={data?.raw_related_data || []} />
  // const QuestionsDataTable = <KeywordTable2 data={data?.raw_question_data || []} />

  return (
    <ThemeProvider theme={THEME}>
      <AppDrawer setModalOpen={setModalOpen} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
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
            {/* <Typography color='grey' fontWeight='bold' display='inline'>{selRowData[indexMap['keyword']]} </Typography> */}
            <Typography color='grey' fontWeight='bold' display='inline'>{selRowData.keyword} </Typography>
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
            overflowY: 'scroll',
            overflowX: 'scroll'
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
                <Typography fontSize={'larger'} color='black' fontWeight='bold' display='inline' mr={1} >{selRowData.volume}</Typography>
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
                      <Typography fontSize={'larger'} color='black' fontWeight={'bold'} >{`${selRowData.kd}%`}</Typography>
                      <Typography fontSize='small' >{kdMetaData?.rating}</Typography>
                    </Box>
                    <FacebookCircularProgress thickness={8} size={32} value={selRowData.kd as unknown as number} clr={keywordDifficultyMap(selRowData.kd).color || ''} />
                  </Box>
                </Box>
              </Box>
              <Typography fontSize='small' sx={{mt: 2, mb: 2}}>{keywordDifficultyMap(selRowData.kd).text}</Typography>
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
                  label={selRowData.intent} 
                  sx={{
                    color: intentMap(intentIndexMap[selRowData.intent]).color.text, 
                    bgcolor: intentMap(intentIndexMap[selRowData.intent]).color.bg, 
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
                <Typography fontSize='larger' fontWeight='bold' >{numFormatter(selRowData.results as unknown as number)}</Typography>
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
                    <Typography fontSize='larger' fontWeight='bold' >${selRowData.cpc}</Typography>
                  </Box>
                  <Box sx={{flex: 1}} >
                    <Typography fontSize='small' >Com.</Typography>
                    <Typography fontSize='larger' fontWeight='bold' >{selRowData.com}</Typography>
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
              m: 1,p: 1
            }}
          >
            <ButtonGroup 
              disableElevation 
              disableRipple 
              disableFocusRipple 
              sx={{flex: 1}} 
              size='small' 
              variant="outlined" 
              aria-label="outlined button group"
            >
              <Button 
                sx={{backgroundColor: selRawDataType.id === 0 ? '#F2EDFD' : '#ffffff'}} 
              >
                Broadmatch
              </Button>
              <Button 
                sx={{backgroundColor: selRawDataType.id === 1 ? '#F2EDFD' : '#ffffff'}} 
              >
                Related
              </Button>
              <Button 
                // onClick={()=>setSelRawDataType(rawDataTypeMap[2])} 
                sx={{backgroundColor: selRawDataType.id === 2 ? '#F2EDFD' : '#ffffff'}} 
              >
                Questions
              </Button>

            </ButtonGroup>
            <Button variant='contained' size="small">Add to List</Button>
          </Box>       
          <Box sx={{width: '50em', p: 1}}>
            <KeywordTable
              data={selRawData}
              setSelRowData={setSelRowData}
            />
          </Box>
        </Box>
      </Box>
      <Draggable open={modalOpen} setOpen={setModalOpen} />
    </ThemeProvider>
  );
}

export default App;
