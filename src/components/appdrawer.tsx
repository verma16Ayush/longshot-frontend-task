import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Button, Collapse, Typography,useTheme } from "@mui/material";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import ExtensionIcon from '@mui/icons-material/Extension';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LayersIcon from '@mui/icons-material/Layers';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { BasicProfile } from "./userprofile";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MapIcon from '@mui/icons-material/Map';
import CellTowerIcon from '@mui/icons-material/CellTower';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function AppDrawer(props: {drawerOpen: boolean, setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const theme = useTheme();
  const [templatesOpen, setFavOpen] = React.useState<boolean>(true);
  const [integrationsOpen, setIntegrationsOpen] = React.useState<boolean>(true);

  return (
    <Drawer
      anchor={"left"}
      open={props.drawerOpen}
      // onClose={toggleDrawer("left", state.left)}
      variant="persistent"
      sx={{display: 'flex'}}
      
    >
      <Box
        id='drawer-box'
        sx={{
          width: '250px',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          color: theme.palette.primary.main
        }}
      >
        <Box id='branding' >
          <img src={`${process.env.PUBLIC_URL}/longshotlogo.svg`} alt='longshot logo' width={220} />
        </Box>
        <Box
          id='drawer-list'
          sx={{
            width: '100%',
            flex: 1
          }}
        >
          <List>
            <ListItemButton 
              selected 
              sx={{
                backgroundColor: '#ECEFF1'
              }}
            >
              <Box>
                <Typography color='grey' fontSize={12} fontWeight='bold' display='block' mt={1} >Project</Typography>
                <Typography color='black'display='block'mb={1} >My First Project</Typography>
              </Box>
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <ViewQuiltIcon fontSize="small" sx={{color: '#5E7C8A'}} />
              </ListItemIcon>
              <Typography fontSize={'small'} sx={{ color: theme.palette.secondary.main}} >Dashboard</Typography>
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <AutoStoriesIcon fontSize="small" sx={{color: '#5E7C8A'}} />
              </ListItemIcon>
              <Typography fontSize='small' sx={{color: theme.palette.secondary.main}} >Recipes</Typography>
            </ListItemButton>
          </List>

          <Divider sx={{ml: 2, mr: 2}} />

          <List>
            <ListItemButton>
              <ListItemIcon>
                <VerticalSplitIcon fontSize="small" sx={{color: '#5E7C8A'}} />
              </ListItemIcon>
              <Typography fontSize={'small'} sx={{ color: theme.palette.secondary.main}} >Blog</Typography>
            </ListItemButton>
            <ListItemButton onClick={()=>setFavOpen(!templatesOpen)} >
              <ListItemIcon>
                <ExtensionIcon fontSize="small" sx={{color: '#5E7C8A'}} />
              </ListItemIcon>
              <Typography fontSize={'small'} sx={{ color: theme.palette.secondary.main}} >Templates</Typography>
            </ListItemButton>
            
            <Collapse in={templatesOpen} >
              <List >
                <ListItemButton sx={{p: 0, pt: 0.5, pb: 0.5, pl: 4}}>
                  <ListItemIcon>
                    <FavoriteIcon  sx={{fontSize: '12px', color: 'red'}} />
                  </ListItemIcon>
                  <Typography fontSize={'small'} sx={{ color: theme.palette.secondary.main}} >Favourites</Typography>
                </ListItemButton>
                <ListItemButton sx={{p: 0, pt: 0.5, pb: 0.5, pl: 4}}>
                  <ListItemIcon>
                    <FiberManualRecordIcon sx={{fontSize: '12px', color: 'grey'}} />
                  </ListItemIcon>
                  <Typography fontSize={'small'} sx={{ color: theme.palette.secondary.main}} >Custom template</Typography>
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={()=>setIntegrationsOpen(!integrationsOpen)} >
              <ListItemIcon>
                <LayersIcon fontSize='small' sx={{color: theme.palette.secondary.main}} />
              </ListItemIcon>
              <Typography fontSize='small' sx={{color: theme.palette.secondary.main}} >Integrations</Typography>
            </ListItemButton>
            
            <Collapse in={integrationsOpen} >
              <List >
                <ListItemButton sx={{p: 0, pt: 0.5, pb: 0.5, pl: 4}}>
                  <ListItemIcon>
                    <WhatshotIcon  sx={{fontSize: '12px', color: 'red'}} />
                  </ListItemIcon>
                  <Typography fontSize={'small'} sx={{ color: theme.palette.secondary.main}} >Semrush</Typography>
                </ListItemButton>
              </List>
            </Collapse>

          </List>
        </Box>

        <Box 
          id='drawer-info-box' 
          sx={{
            m: 1,
            // p: 2, 
            pt: 2,
            backgroundColor: '#ECF9FF', 
            width: '100%', 
            borderRadius: '1',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
         <BasicProfile/>
         <Button 
            variant="contained" 
            sx={{m: 2, ml: 3, mr: 3}}
            color='success'
            startIcon={<ShoppingCartIcon/>}
          >
            Change Plan
          </Button>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <MapIcon fontSize="small" sx={{color: '#5E7C8A'}} />
              </ListItemIcon>
              <Typography fontSize={'small'} sx={{ color: theme.palette.secondary.main}} >Product Roadmap</Typography>
            </ListItemButton>
            <ListItemButton >
              <ListItemIcon>
                <CellTowerIcon fontSize="small" sx={{color: '#5E7C8A'}} />
              </ListItemIcon>
              <Typography fontSize={'small'} sx={{ color: theme.palette.secondary.main}} >What's new?</Typography>
            </ListItemButton>
          </List>
        </Box>
        <List sx={{width: '100%', m: 0}}>
          <ListItemButton onClick={()=>props.setDrawerOpen(false)} >
            <ListItemIcon>
              <ArrowBackIcon fontSize="small" sx={{color: '#5E7C8A'}} />
            </ListItemIcon>
            <Typography fontSize={'small'} sx={{ color: theme.palette.secondary.main}} >Collapse</Typography>
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
