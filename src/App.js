import React from 'react'
import BarChart3 from './charts/BarChart3'

function App() {
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
    <div className="App">
        <BarChart3 w={600} h={400} data={data} barColor="purple" minValue={1} />
    </div>
  )
}

export default App