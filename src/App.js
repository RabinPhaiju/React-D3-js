import React,{useRef, useState} from 'react'
import BarChart3 from './charts/BarChart3'

function App() {

  const ref = useRef(null)
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
    {label:'Su',value:1.11},
    {label:'Mo',value:1.59},
    {label:'Ma',value:1.25},
    {label:'Me',value:1.46},
    {label:'Ju',value:0.75},
    {label:'Ve',value:1.00},
    {label:'Sa',value:1.66},
    {label:'Test',value:0.44},
  ]

  return (
    <div className="App" ref={ref}>
    <div>This is Bar chart</div>
        <BarChart3 w={width} data={data} barColor="purple" minValue={1} />
    </div>
  )
}

export default App