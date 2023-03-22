import { useEffect, useState } from "react";
import axios from "axios";
import { Header, Container } from "semantic-ui-react";
import List from "semantic-ui-react/dist/commonjs/elements/List";
import { Activity } from "../Models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data);
    });
  }, []);

  const handleSelectedActivity= (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }
 
  return (
    <>
         <Navbar />
         <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelActivity={handleCancelSelectActivity}
          />
         </Container>
    </>
  );
}

export default App;