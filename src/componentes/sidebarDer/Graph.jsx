import React from 'react';
import Chart from "react-google-charts";
import useStyles from "./graphViewsStyle";

const Graph = () => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.chartbody}>
              <Chart
                width="90%"
                height="100%"
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={[
                  [" ", " ", "  "],
                  [" ", 1, 3],
                  [" ", 5,1 ],
                  [" ", 6, 2],
                  [" ", 8, 9],
                ]}
                options={{
                  title: "Visits in the Week and in the Month",
                
                                  // For the legend to fit, we make the chart area smaller
                  chartArea: { width: "85%", height: "70%" },
                  lineWidth: 5,
                  colors: ["#3CB4E5", "#162D27"],
                  areaOpacity: 0.3,
                }}
              />
            </div>
        </div>
    );
};

export default Graph;