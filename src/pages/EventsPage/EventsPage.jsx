import Events from "../../components/Events/Events";
import global from "../../global";

const EventsPage = () => {
  return (
    <div className="px-2">
      <h1 className={`${global.heading}`}>Popular Events</h1>
      <Events />
    </div>
  );
};

export default EventsPage;
