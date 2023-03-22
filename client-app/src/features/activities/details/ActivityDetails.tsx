import React from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import { Activity } from "../../../app/Models/activity";

interface Props {
  activity: Activity;
  cancelActivity: () => void;
}

const ActivityDetails = ({activity, cancelActivity} : Props) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group width='2'>
         <Button basic color='blue' content='Edit'/>
         <Button basic color='grey' content='Cancel' onClick={cancelActivity}/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
