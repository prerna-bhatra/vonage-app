import React from 'react';

const VitalsPage = () => {
    // Example vitals data
    const vitalsData = [
        { name: 'Blood Pressure', value: '120/80 mmHg', color: 'bg-blue-200', values: [120, 118, 122, 125, 119, 123] },
        { name: 'Heart Rate', value: '75 bpm', color: 'bg-green-200', values: [72, 74, 71, 75, 73, 76] },
        { name: 'Temperature', value: '98.6 °F', color: 'bg-yellow-200', values: [98.4, 98.7, 98.9, 99.2, 98.8, 99.0] },
        { name: 'Oxygen Level', value: '96%', color: 'bg-purple-200', values: [95, 96, 97, 96, 98, 97] },
        { name: 'Blood Sugar', value: '110 mg/dL', color: 'bg-red-200', values: [108, 112, 109, 111, 110, 113] },
        { name: 'Respiratory Rate', value: '16 breaths/min', color: 'bg-indigo-200', values: [15, 16, 17, 15, 16, 18] },
        { name: 'Cholesterol Level', value: '200 mg/dL', color: 'bg-orange-200', values: [198, 202, 199, 203, 200, 204] },
        { name: 'Body Mass Index (BMI)', value: '23.5', color: 'bg-pink-200', values: [23.2, 23.6, 23.4, 23.8, 23.5, 23.7] },
        // Add more vitals data as needed
    ];

    return (
        <div className="bg-gray-100 p-4 w-full border ">
            <div className="mx-auto">
                <h1 className="text-3xl font-bold mb-6">Vitals Dashboard</h1>
                <div className="grid grid-cols-1 gap-4">
                    {/* Render vitals cards */}
                    {vitalsData.map((vital, index) => (
                        <div key={index} className={`bg-black rounded-lg shadow-md p-4 ${vital.color}`}>
                            <h2 className="text-lg font-semibold mb-2 text-white">{vital.name}</h2>
                            <p className="text-gray-200">{vital.value}</p>
                            {/* Example of colorful lines */}
                            <div className="mt-4">
                                <div className="flex items-center">
                                    {vital.values.map((value, idx) => (
                                        <div
                                            key={idx}
                                            className="w-2 h-2 rounded-full mr-2"
                                            style={{
                                                backgroundColor: `hsl(${value * 10}, 70%, 60%)`,
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VitalsPage;
