import React from 'react';
import { Link} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommonButton from '../common/CommonButton';
import { Container} from '@mui/system';
import { Button } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function OneEvent(props) {
  var date = new Date(props.item.date).toDateString();
  const [expanded, setExpanded] = React.useState(false);

  const changeEventID = () => {
    props.setEvent(props.item);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
    sx={{
      marginY: { xs: '3.5rem', md: '4rem' },
      marginX: 'auto',
      borderRadius: '5px',
      width: { md: '50vw' },
      boxShadow: '1ch',
      boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, 0.5)', 
      backgroundColor: '#495057', 
      color: 'white'
    }}
      onClick={changeEventID}
    >
      
        <CardHeader
          title={props.item.eventName}
          subheader={<Typography sx={{color: 'white'}}>{date}</Typography>}
          sx={{ display: ' inline-block' }}
        />
        <Link style={{ textDecoration: 'none' }} to='/EventEdit'>
          <Button sx={{ margin: 1, marginTop: 2, float: 'right' }} variant='contained' size='large'>
            Edit
          </Button>
        </Link>
     
      <CardMedia
        sx={{ maxHeight: 300 ,}}
        component='img'
        src={`data:image/png;base64,${props.item.eventImage}`}
        alt='Event Image'
      />
      <CardContent sx={{ backgroundColor: '#495057', color: 'white'}}>
        <CardActions disableSpacing>
          <Typography sx={{ fontSize: '1.3rem', color: 'white', fontWeight: '500'}}  variant='body1' color='text.primary'>
            {props.item.locationName}
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          {/* anything in here will be shown in the collapsable area */}
          <CardContent >
            {props.item.eventName}
            <br></br>
            {props.item.locationName}
            <br></br>
            {props.item.eventLocation}
            <br></br>
            {props.item.eventDescription}
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default OneEvent;