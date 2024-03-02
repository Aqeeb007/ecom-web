import EventCard from "./Event";

const Events = () => {
  const isLoading = false;
  const allEvents = [];

  return (
    <div>
      {!isLoading && (
        <div className={``}>
          <div className="grid w-full">
            {allEvents.length !== 0 && (
              <EventCard data={allEvents && allEvents[0]} />
            )}
            <h4 className="flex items-center justify-center text-2xl text-center font-Roboto">
              {allEvents?.length === 0 && "No Events have!"}
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
