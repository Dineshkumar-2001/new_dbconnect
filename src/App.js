import React, {useState} from 'react';
import './App.css';
import Axios from 'axios';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {

  const [player_id , setPlayer_id] = useState(0)
  const [player_name , setPlayer_name] = useState('')
  const [player_location , setPlayer_location] = useState('')
  const [join_date , setJoin_date] = useState(0)


  const [playerlist , setPlayerlist] = useState([])

  console.log(playerlist)

   const addPlayer = () =>{

  Axios.post('http://localhost:5001/player_detail',{
    player_id:player_id,
    player_name:player_name,
    player_location:player_location,
    join_date:join_date
  }).then(()=>{
    console.log('success')
  })
};
  
   const getplayer_detail = () =>{
    Axios.get('http://localhost:5001/showdata').then((Response)=>{
      setPlayerlist(Response.data)
    })
   }



  return (


    <div className='App'>

    <div className='Information'>

      <label>Player_id :</label>
      <input type='number' onChange={(e)=>{
        setPlayer_id(e.target.value)
      }} />

      <label>player_name :</label>
      <input type='text' onChange={(e)=>{
        setPlayer_name(e.target.value)
      }} />

     <label>player_location :</label>
      <input type='text' onChange={(e)=>{
        setPlayer_location(e.target.value)
      }} />

      <label>Join date :</label>
      <input type='date' onChange={(e)=>{
        setJoin_date(e.target.value)
      }} />

      <Button variant='contained' color='error' onClick={addPlayer} style={{marginTop:'10px'}}>Add Details</Button>

      <Button variant='contained' color='success'  onClick={getplayer_detail} style={{marginTop:'10px'}}>Show Details</Button>

{
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={{ xs: 3, md: 6 }} columns={{ xs: 2, sm: 9, md: 10 }}>
      { playerlist.map((val,key) => (
        <Grid item xs={10} sm={10} md={3}>
          <Item sx={{background:'lightgray', ml:12}} >
          <h4>Player_id : {val.player_id}</h4>
          <h4>Player_name : {val.player_name}</h4>
          <h4>Player_location : {val.player_location}</h4>
          <h4>Join date : {val.join_date}</h4>
         </Item>
        </Grid>
      ))}
    </Grid>
  </Box>
  }

    </div>

    </div>
  )
}

export default App