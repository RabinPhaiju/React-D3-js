import React,{ useState} from 'react'
import BarChart3 from './charts/BarChart3'
import StackedBarChart from "./charts/StackedBarChart";

function App() {
  const [width,setWidth] = useState(0)

  const resizeWidth = ()=>{
    let widht = window.innerWidth
    setWidth(widht)
  }

  useState(()=>{
    resizeWidth()
  },[])

  window.addEventListener('resize',resizeWidth)

  const data = [
    {label:'Weight',value:4},
    {label:'Moon',value:3.},
    {label:'Mars',value:5},
    {label:'Mercury',value:2},
    {label:'Jupiter',value:3},
    {label:'Venus',value:0},
    {label:'Saturn',value:4.9},
    {label:'Rahu',value:1.35},
    {label:'Ketu',value:3.5},
  ]
  const stackData = [
    {label: 'Weight',"D1": 5,"D2": 2,"D3": 2,"D4": 2,"D9": 4,"D10": 3,"D12": 1,"D30": 1,"Total":20},
    {label: 'Sun',"D1": 0.5,"D2": 1.8,"D3": 0.7,"D4": 1.5,"D9": 0.4,"D10": 1.05,"D12": 0.75,"D30": 0.75,"Total":7.45},
    {label: 'Moon',"D1": 3,"D2": 0,"D3": 0.7,"D4": 1.2,"D9": 2.4,"D10": 1.8,"D12": 0.35,"D30": 0.75,"Total":10.2},
    {label: 'Mars',"D1": 2.5,"D2": 1.5,"D3": 1.8,"D4": 1,"D9": 2.4,"D10": 2.25,"D12": 0.5,"D30": 0.6,"Total":12.55},
    {label: 'Mercury',"D1": 2.5,"D2": 1,"D3": 1.8,"D4": 1,"D9": 2,"D10": 1.5,"D12": 0.5,"D30": 0.6,"Total":10.9},
    {label: 'Jupiter',"D1": 3.75,"D2": 1.5,"D3": 2,"D4": 1,"D9": 2,"D10": 3,"D12": 0.9,"D30": 1,"Total":15.15},
    {label: 'Venus',"D1": 0,"D2": 1,"D3": 1,"D4": 0.2,"D9": 2.4,"D10": 1.8,"D12": 0.5,"D30": 0.5,"Total":7.4},
    {label: 'Saturn',"D1": 4.5,"D2": 0.2,"D3": 1,"D4": 1,"D9": 0.4,"D10": 1.5,"D12": 0.5,"D30": 0.9,"Total":10},
    {label: 'Rahu',"D1": 1.75,"D2": 0.2,"D3": 0.7,"D4": 0.7,"D9": 2,"D10": 2.25,"D12": 0.35,"D30": 0.75,"Total":8.7},
    {label: 'Ketu',"D1": 3,"D2": 1,"D3": 1.2,"D4": 1.2,"D9": 2.4,"D10": 1.5,"D12": 0.6,"D30": 0.5,"Total":11.4},
  ];
  const stackKeys = ['D1','D2','D3','D4','D9','D10','D12','D30'];
  const stackColors = {'D1':'red','D2':'purple','D3':'green','D4':'blue','D9':'skyblue','D10':'yellow','D12':'gray','D30':'black'};

  return (
    <div className="App">
    {/* <div>This is Bar chart</div> */}
        {/* <BarChart3 w={width} data={data}  barColor="purple" minValue={1} /> */}
      {/* <div>Stack bar chart</div> */}
      <StackedBarChart w={width} data={stackData}  keys={stackKeys} colors={stackColors} barColor="purple" minValue={1}/>
    </div>
  )
}

export default App