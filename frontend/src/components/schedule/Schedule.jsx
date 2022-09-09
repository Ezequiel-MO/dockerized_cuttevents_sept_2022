import { useCurrentProject } from "../../hooks/useCurrentProject";
import Events from "./Events";
import Meals from "./Meals";

const Schedule = () => {
  const { currentProject } = useCurrentProject();
  const { schedule } = currentProject;

  const renderSchedule = schedule?.map((day, index) => {
    return (
      <div key={day._id} className="mb-6">
        <div className="flex flex-col" id={`${day.date}_id`}>
          <h2
            className="text-lg md:text-xl mb-4 font-extrabold"
            id={`day_${index}`}
          >
            {day.date}
          </h2>
          {day.morningEvents.length > 0 ? (
            <>
              <p className="text-black-50 dark:text-white-50">
                {day.morningEvents[0].introduction}
              </p>
              <Events events={day.morningEvents} />
            </>
          ) : (
            <h3 className="italic m-2">No events planned in the morning</h3>
          )}
          {day.lunch.length > 0 ? (
            <>
              <p className="text-black-50 dark:text-white-50">
                {day.lunch[0].introduction}
              </p>
              <Meals restaurants={day.lunch} />
            </>
          ) : (
            <h3 className="italic m-2">No meals planned for lunch</h3>
          )}
          {day.afternoonEvents.length > 0 ? (
            <>
              <p className="text-black-50 dark:text-white-50">
                {day.afternoonEvents[0].introduction}
              </p>
              <Events events={day.afternoonEvents} />
            </>
          ) : (
            <h3 className="italic m-2">No events planned in the afternoon</h3>
          )}
          {day.dinner.length > 0 ? (
            <>
              <p className="text-black-50 dark:text-white-50">
                {day.dinner[0].introduction}
              </p>
              <Meals restaurants={day.dinner} />
            </>
          ) : (
            <h3 className="italic m-2">No events planned for dinner</h3>
          )}
        </div>

        <hr className="mt-6" />
      </div>
    );
  });

  return <div>{renderSchedule}</div>;
};

export default Schedule;
