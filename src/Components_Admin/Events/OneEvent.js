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
        marginY: '4rem',
        marginX: 'auto',
        minWidth: '40rem',
        width: '40rem',
      }}
      onClick={changeEventID}
    >
      <Container
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        style={{ padding: '0px' }}
      >
        <CardHeader
          title={props.item.eventName}
          subheader={date}
          sx={{ color: 'black', display: ' inline-block' }}
        />
        <Link style={{ textDecoration: 'none' }} to='/EventEdit'>
          <CommonButton sx={{ margin: 1 }} variant='outlined' size='medium'>
            Edit
          </CommonButton>
        </Link>
      </Container>

      <CardMedia
        sx={{ maxHeight: 100 }}
        component='img'
        src={`data:image/png;base64,${props.item.eventImage}`}
        alt='Event Image'
      />
      <CardContent>
        <CardActions disableSpacing>
          <Typography variant='body1' color='text.primary'>
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
          <CardContent>
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