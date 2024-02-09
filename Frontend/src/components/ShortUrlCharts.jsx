/* eslint-disable react/prop-types */
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const ShortUrlCharts = ({ shortUrlData }) => {
  function groupByDay(documents) {
    const dayNames = [];

    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day

    // Initialize arrays for the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(now - i * oneDay);
      // Craete a array with previous 7 days with valus of 0
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" }); // Get the day of the week
      const tempDayDoc = {};
      tempDayDoc[dayOfWeek] = 0;
      dayNames.unshift(tempDayDoc);
    }

    const len = dayNames.length;
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    // update values for each day
    documents.forEach((doc) => {
      const docDate = new Date(doc.time);
      if (
        docDate.getDate() > oneWeekAgo.getDate() ||
        docDate.getMonth() > oneWeekAgo.getMonth() ||
        docDate.getFullYear > oneWeekAgo.getFullYear()
      ) {
        // create url count for each day
        const dayOfWeek = docDate.toLocaleDateString("en-US", {
          weekday: "short",
        });
        for (let i = 0; i < len; i++) {
          if (dayOfWeek in dayNames[i]) {
            dayNames[i][dayOfWeek]++;
          }
        }
      }
    });

    // Initialize arrays for the last 6 months
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currmonthName = now.toLocaleDateString("en-US", { month: "short" });
    // create last 6 mon with value of 0 in array [{Jan:0}]
    let ind = months.indexOf(currmonthName);
    const monthNames = [];
    while (monthNames.length <= 6) {
      if (months[ind]) {
        monthNames.unshift({ [months[ind]]: 0 });
      } else {
        ind = 12;
      }
      ind--;
    }
    // updateing value for each month
    documents.forEach((doc) => {
      const docDate = new Date(doc.time);
      // create url count for each day
      const mon = docDate.toLocaleDateString("en-US", { month: "short" });
      for (let i = 0; i < len; i++) {
        if (mon in monthNames[i]) {
          monthNames[i][mon]++;
        }
      }
    });

    return {
      dayNames,
      monthNames,
    };
  }

  const { dayNames, monthNames } = groupByDay(shortUrlData);

  return (
    <div className="w-full min-h-max md:h-[250px] mt-5 m-w-[250px] flex md:flex-row flex-col gap-5 justify-around">
      <div className="w-full h-full md:w-2/5 bg-slate-400">
        <Bar
          data={{
            labels: dayNames.map((val) => {
              for (let k in val) {
                return k;
              }
            }),
            datasets: [
              {
                label: "URL count Day",
                data: dayNames.map((obj) => {
                  for (let k of Object.values(obj)) {
                    return k;
                  }
                }),
                borderColor: "black",
                borderRadius: 5,
                color: "white",
                backgroundColor: [
                  "rgba(255, 99, 132)", // Red
                  "rgba(54, 162, 235)", // Blue
                  "rgba(255, 206, 86)", // Yellow
                  "rgba(75, 192, 192)", // Green
                  "rgba(153, 102, 255)", // Purple
                  "rgba(255, 159, 64)", // Orange
                  "rgba(201, 203, 202)", // Grey
                ],
              },
            ],
          }}
          options={{
            scales: {
              x: {
                ticks: {
                  fontStyle: "bold",
                  color: "black",
                },
              },
              y: {
                ticks: {
                  fontStyle: "bold",
                  color: "black",
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  fontStyle: "bold",
                  color: "white",
                },
              },
            },
          }}
        />
      </div>

      <div className="w-full h-full md:w-2/5 bg-slate-400">
        <Bar
          data={{
            labels: monthNames.map((val) => {
              for (let k in val) {
                return k;
              }
            }),
            datasets: [
              {
                label: "URL count Month",
                data: monthNames.map((obj) => {
                  for (let k of Object.values(obj)) {
                    return k;
                  }
                }),
                borderColor: "black",
                borderRadius: 5,
                color: "white",
                backgroundColor: [
                  "rgba(255, 99, 132)", // Red
                  "rgba(54, 162, 235)", // Blue
                  "rgba(255, 206, 86)", // Yellow
                  "rgba(75, 192, 192)", // Green
                  "rgba(153, 102, 255)", // Purple
                  "rgba(255, 159, 64)", // Orange
                  "rgba(201, 203, 202)", // Grey
                ],
              },
            ],
          }}
          options={{
            scales: {
              x: {
                ticks: {
                  fontStyle: "bold",
                  color: "black",
                },
              },
              y: {
                ticks: {
                  fontStyle: "bold",
                  color: "black",
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  fontStyle: "bold",
                  color: "white",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ShortUrlCharts;
