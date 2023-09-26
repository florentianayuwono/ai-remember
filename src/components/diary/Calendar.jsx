import { AiFillPrinter } from "react-icons/ai";
import { crush } from "../../assets";

const Calendar = ({ month, diaries }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = new Date().getFullYear();
  const firstDay = new Date(year, monthNames.indexOf(month), 1).getDay(); // Day of the week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
  const lastDay = new Date(year, monthNames.indexOf(month) + 1, 0).getDate(); // Last day of the month
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  // Generate an array to represent the days in the calendar, including blank cells for days before the start of the month
  const calendarDays = Array.from(
    { length: lastDay + firstDay },
    (_, index) => {
      if (index < firstDay) {
        return null; // Blank cell
      }
      const day = index - firstDay + 1;
      return day;
    }
  );

  return (
    <div className="container mx-auto pt-20 py-10">
      <div className="wrapper bg-white rounded w-full">
        <div className="header flex justify-center border-b p-2">
          <span className="text-secondary-brown text-lg font-bold">
            {month} {year}
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <th
                    key={index}
                    className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs text-secondary-blue"
                  >
                    <span className={`text-secondary-${day.toLowerCase()}`}>
                      {day}
                    </span>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {Array.from(
              { length: Math.ceil(calendarDays.length / 7) },
              (_, rowIndex) => (
                <tr key={rowIndex} className="text-center h-20">
                  {Array.from({ length: 7 }, (_, colIndex) => {
                    const dayIndex = rowIndex * 7 + colIndex;
                    const day = calendarDays[dayIndex];

                    // Format the current day to match the diary.id format
                    const formattedCurrentDay = `${
                      monthNames[monthNames.indexOf(month)]
                    } ${day}, ${year}`;
                    // Find the diary entry for the current day
                    const diaryEntry = diaries.find(
                      (diary) => diary.id === formattedCurrentDay
                    );
                    console.log(diaryEntry);
                    return (
                      <td
                        key={colIndex}
                        className={`border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease ${
                          day === null
                            ? "bg-gray-100"
                            : day === currentDay
                            ? "bg-secondary-lightgreen"
                            : "bg-white"
                        } hover:bg-${day === null ? "gray-100" : "gray-300"}`}
                      >
                        {day !== null && (
                          <div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                            <div className="top h-5 w-full">
                              <span className="text-gray-500">{day}</span>
                            </div>
                            <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                              {diaryEntry && diaryEntry.diary != "" ? (
                                <div className="event bg-primary-blue text-black rounded-full px-5 py-1 text-sm mb-1 truncate">
                                  <span className="event-name">
                                    {diaryEntry.diary}
                                  </span>
                                </div>
                              ) : (
                                <div className="event bg-gray-100 text-black rounded-full px-5 py-1 text-sm mb-1 truncate">
                                  <span className="event-name">
                                    No diary yet
                                  </span>
                                </div>
                              )}
                              {/* <img src={crush} className="object-contain" /> */}
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
