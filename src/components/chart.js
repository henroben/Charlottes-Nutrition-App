import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default (props) => {
    return(
        <div className="chart">
                <AreaChart width={800} height={300} data={props.data}
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Area type='monotone' dataKey={props.units} stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
        </div>
    );
}