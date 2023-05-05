import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { List, Image, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/Models/Profile";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
  attendees: Profile[];
}

const ActivityListItemAttendee = ({ attendees }: Props) => {

  const styles = {
    borderColor: "orange",
    borderWidth: 3,
  };

  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <Popup
          hoverable
          key={attendee.username}
          trigger={
            <Link to={`/activities/`}>
              <List.Item key={attendee.username}>
                <Image
                  size="mini"
                  circular
                  src={attendee.image || "/assets/user.png"}
                  bordered
                  style={attendee.following ? styles : null}
                />
              </List.Item>
            </Link>
          }
        >
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
};

export default observer(ActivityListItemAttendee);
