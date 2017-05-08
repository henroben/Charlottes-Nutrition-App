import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default (props) => {
    return(
        <div className="chart">
                <AreaChart width={800} height={300} data={props.data}
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <defs>
                        <linearGradient id="colorG" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRDA" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#ff0000" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Area type='monotone' dataKey={props.units} stroke='#8884d8' fillOpacity={1} fill="url(#colorG)" />
                    <Area type='monotone' dataKey={props.rda} stroke='#82ca9d' fillOpacity={1} fill="url(#colorRDA)" />
                    <Area type='monotone' dataKey={props.max} stroke='#ff0000' fillOpacity={1} fill="url(#colorMax)" />
                </AreaChart>
        </div>
    );
}