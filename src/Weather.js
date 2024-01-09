// import React, { useEffect, useState } from "react";

// const WeatherData = ({ http }) => {
//   const [weatherData, setWeatherData] = useState(null);

//   const fetchWeatherData = async () => {
//     const currentUrl = 'https://weatherapi-com.p.rapidapi.com/current.json?q=40.233845%2C%20-111.658531';
//     const forecastUrl = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=Provo&days=3';
//     const options = {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': 'a3d4c68e61msha0baf91dbe3cf2dp13bb71jsn9cc557790540',
//         'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
//       }
//     };

//     try {
//       const [currentResponse, forecastResponse] = await Promise.all([
//         http(currentUrl, options),
//         http(forecastUrl, options)
//       ]);

//       const currentData = await currentResponse.data;
//       const forecastData = await forecastResponse.data;

//       if (forecastData.forecast && forecastData.forecast.forecastday && forecastData.forecast.forecastday.length > 0) {
//         const todayForecast = forecastData.forecast.forecastday[0];
//         setWeatherData({
//           current: {
//             temp_f: Math.round(currentData.current.temp_f),
//             condition: currentData.current.condition,
//           },
//           forecast: {
//             day: {
//               maxtemp_f: Math.round(todayForecast.day.maxtemp_f),
//               mintemp_f: Math.round(todayForecast.day.mintemp_f),
//               condition: todayForecast.day.condition,
//             },
//           },
//         });
//       } else {
//         console.error("No forecast data available for today.");
//       }
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchWeatherData();
//   }, []);

//   return (
//     <>
//       {weatherData && weatherData.forecast ? (
//         <p>
//           {weatherData.current.temp_f}°F {weatherData.current.condition.text} &#183;{" "}
//           {weatherData.forecast.day.maxtemp_f}°F/{weatherData.forecast.day.mintemp_f}°F{" "}
//           {weatherData.forecast.day.condition.text}
//         </p>
//       ) : (
//         <p>Loading weather forecast...</p>
//       )}
//       <hr />
//     </>
//   );
// };

// export default WeatherData;
