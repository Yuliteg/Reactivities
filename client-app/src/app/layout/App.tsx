import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../Models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
   id ? handleSelectedActivity(id) : handleCancelSelectActivity();
   setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleEditActivity = (activity: Activity) => {
   activity.id 
   ? setActivities([...activities.filter(item => item.id !== activity.id), activity])
   : setActivities([...activities, {...activity, id: uuid()}]);
   setEditMode(false)
   setSelectedActivity(activity)
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(item => item.id != id)]);
  }

  return (
    <>
      <Navbar openForm={handleFormOpen}/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
