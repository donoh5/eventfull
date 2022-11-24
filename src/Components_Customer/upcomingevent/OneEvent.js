import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

  const redirect = {
    pathname: '/Details/' + props.item.eventID,
    param1: props.item.eventID,
  };

  const changeEventID = () => {
    props.setEventID(props.item.eventID);
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
      }}
      onClick={changeEventID}
    >
      <Link to={redirect}>
        <CardMedia
          sx={{ maxHeight: 300 ,}}
          component='img'
          src={`data:image/png;base64,${props.item.eventImage}`}
          alt='Event Image'
        />
      </Link>
      <CardContent sx={{ backgroundColor: '#495057', color: 'white'}}>
        {/* <CardActions disableSpacing> */}
        <Typography sx={{ fontSize: '1.3rem', fontWeight: '500' }}>
          {props.item.eventName}
        </Typography>
        <Typography sx={{ display: 'inline', fontSize: '0.85rem' }}>
          {date} | {props.item.locationName}
        </Typography>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
        {/* </CardActions> */}
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          {/* anything in here will be shown in the collapsable area */}
          <CardContent>
            <Typography>
              {props.item.eventDescription}
            </Typography>
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default OneEvent;
