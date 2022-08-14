import React, { useRef } from 'react'
import useWidth from "../hook/useWidth";
import useMediaQuery from '../hook/useMediaQuery'
import D3BarChart from './D3BarChart'

function BarChart({ isDarkMode, data, chartName = '', isFromChart, barColor = "#1a0267", minValue = 0, isLeftScale = false }) {
    const colors = ['#312e2c','#3990a1','#3e317d','#c1197e','#f0bd9c','#3dbe1f','#dc4d15','#3d1db2','#51031f'];
    const {xs,sm,md,lg,xl} = useMediaQuery()
    const D3ref = useRef(null)
    const [d3width] = useWidth(D3ref);
    const dataLengthCheck  = data.length<12?10:14

    let width =isFromChart?d3width:sm?d3width:md?(d3width*data.length/dataLengthCheck):(d3width*data.length/dataLengthCheck)
    let height = d3width / (isFromChart?1.8:sm?1.8:2.2)

    return (
        
        <div ref={D3ref} style={{ backgroundColor: isDarkMode ? '#191919' : '#F5F5F5',
                                 borderRadius: '5px',display:'flex',justifyContent:'center' }}>
                <D3BarChart w={width<350?350:width} 
                            h={height<250?250:height} 
                            isDarkMode={isDarkMode} chartName={chartName} isFromChart={isFromChart} data={data} 
                            colors = {colors} barColor={barColor} minValue={minValue} isLeftScale={isLeftScale} />
        </div>
    )
}

export default BarChart
