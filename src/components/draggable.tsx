import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { List, ListItem, TextField } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export function Draggable(props: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) : JSX.Element {
  const handleOpen = () => {props.setOpen(true)};
  const handleClose = () => {props.setOpen(false)};
  const dragItem = React.useRef<any>(null)
	const dragOverItem = React.useRef<any>(null)
  const [textboxVal, setTextBoxVal] = React.useState<string>('');
  const [list, setList] = React.useState<string[]>([
    "item 1",
    "item 2",
    "item 3",
  ])

  const handleSort = () => {
		//duplicate items
		let _list = [...list]

		//remove and save the dragged item content
		const draggedItemContent = _list.splice(dragItem.current, 1)[0]

		//switch the position
		_list.splice(dragOverItem.current, 0, draggedItemContent)

		//reset the position ref
		dragItem.current = null
		dragOverItem.current = null

		//update the actual array
		setList(_list)
	}

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <TextField 
          size='small' 
          sx={{m: 1}} 
          id="outlined-basic" 
          label="add outline" 
          variant="outlined" 
          value={textboxVal}
          onChange={(e)=>setTextBoxVal(e.target.value)}
        />
        <Button 
          variant='contained' 
          sx={{m: 1}}
          onClick={(e)=>{
            let _list = list;
            _list.push(textboxVal)
            setList(_list)
            setTextBoxVal('')
          }}
        >
            add
          </Button>
        <List>
          {list.map((val, i)=>{
            return (
              <ListItem
                draggable
                sx={{
                  border: '1px solid grey',
                  m: 1,
                  display: 'flex',
                  cursor: 'grab'
                  
                }}
                onDragStart={(e) => (dragItem.current = i)}
                onDragEnter={(e) => (dragOverItem.current = i)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
              
                <Typography sx={{flex: 1}}>{val}</Typography>
                <DragIndicatorIcon sx={{float: 'right'}} />
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Modal>
  )
}
