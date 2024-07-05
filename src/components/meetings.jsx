import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Meetings = () => {
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); // State to track selected date

    useEffect(() => {
        // Function to generate random timings and dates
        const generateRandomMeetings = () => {
            const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            const hours = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'];
            const numberOfMeetings = 10; // Number of random meetings to generate

            const generatedMeetings = [];

            for (let i = 0; i < numberOfMeetings; i++) {
                const randomDayIndex = Math.floor(Math.random() * daysOfWeek.length);
                const randomHourIndex = Math.floor(Math.random() * hours.length);

                const meeting = {
                    id: i + 1,
                    title: `Meeting ${i + 1}`,
                    meetingID: `${i + 8}`,
                    dayOfWeek: daysOfWeek[randomDayIndex],
                    time: hours[randomHourIndex]
                };

                generatedMeetings.push(meeting);
            }

            return generatedMeetings;
        };

        // Set generated meetings into state
        setMeetings(generateRandomMeetings());
    }, []);

    const handleMeetingClick = (meetingID) => {
        console.log({ meetingID });
        navigate("/conference", { state: { meetingID: parseInt(meetingID) } });
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        // You can implement logic here to filter meetings based on selected date if needed
    };

    const getMeetingColor = (index) => {
        const colors = ['#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#E91E63'];
        return colors[index % colors.length];
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Meetings</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Calendar Section */}
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Calendar</h2>
                    {/* Actual Calendar UI */}
                    <div className="grid grid-cols-7 gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                            <div key={index} className="text-center font-semibold text-gray-700">{day}</div>
                        ))}
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                            <button
                                key={date}
                                onClick={() => handleDateSelect(date)}
                                className={`text-center py-1 rounded ${selectedDate === date ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                            >
                                {date}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Meetings List Section */}
                <div className="grid grid-cols-1 gap-4">
                    {meetings.map((meetingItem, index) => (
                        <div
                            key={meetingItem.id}
                            onClick={() => handleMeetingClick(meetingItem.meetingID)}
                            className="bg-white rounded-lg shadow p-4 cursor-pointer transition duration-300 transform hover:scale-105"
                            style={{ backgroundColor: getMeetingColor(index), borderColor: getMeetingColor(index) }}
                        >
                            <h2 className="text-xl font-semibold mb-2">{meetingItem.title}</h2>
                            <p className="text-gray-700">Time: {meetingItem.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Meetings;
