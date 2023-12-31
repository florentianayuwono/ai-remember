import { useState } from "react";
import DiaryStaticModal from "./DiaryStaticModal";

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

  const openState = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = openState;
  const [selectedDiary, setSelectedDiary] = useState(null);
  const handleClosePopup = () => {
    setIsDiaryModalOpen(false);
    setSelectedDiary(null);
  };

  const handleEditDiary = async (e) => {
    e.preventDefault();

    // try {
    //   if (title !== "" && content !== "") {
    //     await addDoc(postsCollectionRef, {
    //       title,
    //       content,
    //       author_uid: user?.uid,
    //       // logo: user?.photoURL,
    //       // name: user?.displayName || userData?.name,
    //       // email: user?.email || userData?.email,
    //       timestamp: serverTimestamp(),
    //     });
    //     handleClosePopup();
    //     setTitle("");
    //     setContent("");
    //     toast.success("Successful created post!");
    //   } else {
    //     toast.error("Title and content can't be empty!");
    //   }
    // } catch (err) {
    //   toast.error(err.message);
    // }
  };

  const openDiaryModal = (day) => {
    setIsDiaryModalOpen(true);
    const formattedCurrentDay = `${
      monthNames[monthNames.indexOf(month)]
    } ${day}, ${year}`;
    const diaryEntry = diaries.find(
      (diary) => diary.id === formattedCurrentDay
    );

    // Set the selected diary entry
    setSelectedDiary(diaryEntry.diary);
  };

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
                    const formattedCurrentDay = `${month} ${day}, ${year}`;
                    // Find the diary entry for the current day
                    const diaryEntry = diaries.find(
                      (diary) => diary.id === formattedCurrentDay
                    );

                    // Define the base class name based on conditions
                    let cellClassName =
                      "border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease";

                    // Add conditional class names based on day and currentDay
                    if (day === null || day === undefined) {
                      cellClassName += " bg-gray-100 hover:bg-gray-100";
                    } else if (day === currentDay) {
                      cellClassName +=
                        " bg-secondary-lightgreen hover:bg-gray-300";
                    } else {
                      cellClassName += " bg-white hover:bg-gray-300";
                    }
                    return (
                      <td key={colIndex} className={cellClassName}>
                        {day !== null && day <= lastDay && (
                          <div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                            <div className="top h-5 w-full">
                              <span className="text-gray-500">{day}</span>
                            </div>
                            <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                              {diaryEntry && diaryEntry.diary !== "" ? (
                                <div
                                  className="event bg-primary-blue text-black rounded-full px-4 py-1 mx-auto text-sm mb-1 truncate cursor-pointer"
                                  onClick={() => openDiaryModal(day)}
                                >
                                  <span className="truncate">
                                    {diaryEntry
                                      ? diaryEntry.diary.length > 15
                                        ? diaryEntry.diary.slice(0, 15) + "..."
                                        : diaryEntry.diary
                                      : ""}
                                  </span>
                                </div>
                              ) : (
                                <div className="event bg-gray-100 text-black rounded-full px-5 py-1 text-sm mb-1 truncate invisible sm:visible">
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
          {/* Render individual modal components */}
          {selectedDiary !== null && (
            <DiaryStaticModal
              openState={openState}
              handleClosePopup={handleClosePopup}
              title="Dear diary,"
              content={selectedDiary} // You can pass the content corresponding to the selected day here
              handleEditDiary={handleEditDiary}
            />
          )}
        </table>
      </div>
    </div>
  );
};

export default Calendar;
