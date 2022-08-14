import React from 'react'
import BarChart from './charts/BarChart'
import BarChart3 from './charts/BarChart3'
import BarChart4 from './charts/BarChart4'

function App() {


  const data = [
    {label:'A',value:4},
    {label:'B',value:3.},
    {label:'C',value:5},
    {label:'D',value:2},
    {label:'E',value:3},
    {label:'F',value:0},
    {label:'G',value:4.9},
    {label:'H',value:1.35},
    {label:'I',value:3.5},
  ]
 
  const data4 = [
    {label: 'A',value:[5,2,2,2,4,3,1,1],hoverValue:[5,2,2,2,4,3,1,1]},
    {label: 'B',value:[0.5,1.8,0.7,1.5,0.4,1.05,0.75,0.75],hoverValue:[0.5,1.8,0.7,1.5,0.4,1.05,0.75,0.75]},
    {label: 'C',value:[3, 0,0.7,1.2,2.4,1.8,0.35,0.75],hoverValue:[3, 0,0.7,1.2,2.4,1.8,0.35,0.75]},
    {label: 'D',value:[2.5,1.5,1.8,1,2.4,2.25,0.5,0.6],hoverValue:[2.5,1.5,1.8,1,2.4,2.25,0.5,0.6]},
    {label: 'E',value:[2.5,1,1.8,1,2,1.5,0.5,0.6],hoverValue:[2.5,1,1.8,1,2,1.5,0.5,0.6]},
    {label: 'F',value:[3.75,1.5,2,1,2,3,0.9,1],hoverValue:[3.75,1.5,2,1,2,3,0.9,1]},
    {label: 'G',value:[0,1, 1,0.2,2.4,1.8,0.5,0.5],hoverValue:[0,1, 1,0.2,2.4,1.8,0.5,0.5]},
    {label: 'H',value:[4.5,0.2,1,1,0.4,1.5,0.5,0.9],hoverValue:[4.5,0.2,1,1,0.4,1.5,0.5,0.9]},
    {label: 'I',value:[1.75,0.2,0.7,0.7,2,2.25,0.35,0.75],hoverValue:[1.75,0.2,0.7,0.7,2,2.25,0.35,0.75]},
    {label: 'J',value:[3,1,1.2,1.2,2.4,1.5,0.6,0.5],hoverValue:[3,1,1.2,1.2,2.4,1.5,0.6,0.5]},
  ];
  const colors = ['red','purple','green','blue','skyblue','yellow','gray','orange'];

  return (
    <div className="App">
    <div>This is Bar chart</div>
    <BarChart isDarkMode={false} data={data4} chartName = 'Bar Chart' isFromChart={true} minValue={2} isLeftScale={true}/>
        {/* <BarChart3 w={width} data={data}  barColor="purple" minValue={1} />  */}
           {/* <div>This is Bar chart 4</div> */}
        {/* <BarChart4 w={width} data={data4} keys={stackKeys} colors={colors} barColor="purple" minValue={1} /> */}
      {/* <div>Stack bar chart</div> */}
    </div>
  )
}

export default App