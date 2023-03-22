import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/Models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelActivity: () => void;
}

const ActivityDashboard = ({
  activities,
  selectedActivity,
  selectActivity,
  cancelActivity,
}: Props) => {
  return (
    <div>
      <Grid>
        <Grid.Column width="10">
          <ActivityList
           activities={activities}
           selectActivity={selectActivity}
           />
        </Grid.Column>
        <Grid.Column width="6">
          {selectedActivity && <ActivityDetails activity={selectedActivity} cancelActivity={cancelActivity} />}
          <ActivityForm />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ActivityDashboard;
