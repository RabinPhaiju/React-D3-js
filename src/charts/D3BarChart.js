import React, { useEffect, useState, useRef, Fragment } from "react"
import './barChart.css'
import {
    axisBottom,
    axisLeft,
    scaleBand,
    scaleLinear,
    select
} from "d3"

function Bar({
    x,
    y,
    width,
    height,
    color,
    onMouseEnter,
    onMouseLeave
}) {
    const radius = height === 0 ? 0 : width * 0.2
    // https://stackoverflow.com/questions/10177985/svg-rounded-corner
    return (
        <path
            d={`
      m${x},${y + radius}
      a${radius},${radius} 0 0 1 ${radius},${-radius}
      h${width - radius * 2}      
      a${radius},${radius} 0 0 1 ${radius},${radius}
      v${height - radius * 2}
      a${radius},${radius} 0 0 1 ${-radius},${radius}
      h-${width - radius * 2}
      a${radius},${radius} 0 0 1 ${-radius},${-radius}
      z
    `}
            fill={color}
            onMouseEnter={(event) => onMouseEnter(event)}
            onMouseLeave={onMouseLeave}
        />
    )
}
function StackBar({
  isFirst,
  isLast,
  x,
  y,
  width,
  height,
  color,
  onMouseEnter,
  onMouseLeave
}) {
  let radius=0;
  if(isFirst){
    radius = height === 0 ? 0 : width * 0.2
    return (
      <path
      d={`
      m${x},${y}
      h${width}      
      v${height - radius}
      a${radius},${radius} 0 0 1 ${-radius},${radius}
      h-${width - radius*2}
      a${radius},${radius} 0 0 1 ${-radius},${-radius}
      z
    `}
      fill={color}
      onMouseEnter={(event) => onMouseEnter(event)}
      onMouseLeave={onMouseLeave}
    />
  )
  }else if(isLast){
    radius = height === 0 ? 0 : width * 0.2
    return (
      <path
      d={`
      m${x},${y + radius}
      a${radius},${radius} 0 0 1 ${radius},${-radius}
      h${width - radius*2}      
      a${radius},${radius} 0 0 1 ${radius},${radius}
      v${height - radius}
      h-${width}
      z
    `}
      fill={color}
      onMouseEnter={(event) => onMouseEnter(event)}
      onMouseLeave={onMouseLeave}
    />
  )
    
  }else{
    radius = height === 0 ? 0 : width * 0 
    return (
      <path
      d={`
      m${x},${y + radius}
      a${radius},${radius} 0 0 1 ${radius},${-radius}
      h${width - radius*2}      
      a${radius},${radius} 0 0 1 ${radius},${radius}
      v${height - radius*2}
      a${radius},${radius} 0 0 1 ${-radius},${radius}
      h-${width - radius*2}
      a${radius},${radius} 0 0 1 ${-radius},${-radius}
      z
    `}
      fill={color}
      onMouseEnter={(event) => onMouseEnter(event)}
      onMouseLeave={onMouseLeave}
    />
  )
  }

}


function AxisBottom({ isDarkMode,fontSize, scaleX, width, transform }) {
    const ref = useRef(null)
    useEffect(() => {
        let xAxisGen = axisBottom(scaleX)
        if (ref.current) {
            select(ref.current).call(xAxisGen)
            select(ref.current).attr('font-size',  fontSize + 'px').attr('stroke-width', 0)
                .attr('font-weight', '600')
                .attr("color", isDarkMode ? "#CCCCCC " : "#0A1D40")
        }
    }, [scaleX])
    return <g ref={ref} transform={transform} >
        <path stroke="#C9CFD7" strokeWidth={'3px'} d={`M 0 -1 h ${width / 1.1}`} ></path>
    </g>
}
function AxisMinimum({ scale, width, transform }) {
    const ref = useRef(null)

    useEffect(() => {
        let xAxisGen = axisBottom(scale)
        if (ref.current) {
            select(ref.current).call(xAxisGen)
            select(ref.current).attr('font-size', '0px').attr('stroke-width', 0)
        }
    }, [scale])

    return <g ref={ref} transform={transform} >
        <path stroke="#C9CFD7" strokeWidth={'0.5px'} d={`M 0 6 h ${width / 1.1}`} ></path>
    </g>
}

function AxisLeft({ isDarkMode,fontSize, scaleY, height, transform, isLeftScale }) {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisLeft(scaleY))
            select(ref.current).attr('font-size', isLeftScale ? fontSize+'px' : '0px').attr('stroke-width', 0)
                .attr('font-weight', '600')
                .attr("color", isDarkMode ? "#CCCCCC " : "black")
        }
    }, [scaleY])

    return <g ref={ref} transform={transform}>
        <path stroke="#C9CFD7" strokeWidth={'3px'} d={`M 0 ${height - (height * 0.95)} v ${height * 0.95}`} ></path>
    </g>
}

function Bars({ isSafari, isDarkMode, data, height,fontSize, scaleX, scaleY, setTooltip, barColor }) {
    return (
        <>
            {data.map(({ value, label }, index) => (
                <Fragment key={`bar-${label}`}>
                    <Bar
                        x={scaleX(label)}
                        y={scaleY(value)}
                        width={scaleX.bandwidth()}
                        height={height - scaleY(value)}
                        color={barColor}
                        onMouseEnter={(event) => {
                            setTooltip({
                                x: event.clientX,
                                y: event.clientY,
                                index: index,
                            })
                        }}
                        onMouseLeave={() => setTooltip(null)}
                    />
                    <text
                        transform={`translate(${scaleX.bandwidth() + scaleX(label) - (scaleX.bandwidth() / 2)}, ${scaleY(value) - 5-(isSafari?10:0)})`}
                        textAnchor="middle"
                        alignmentBaseline="baseline"
                        fill={isDarkMode ? "#CCCCCC" : "black"}
                        fontSize={fontSize + 'px'}
                        fontWeight="600"
                    >
                        {value}
                    </text>
                </Fragment>
            ))}
        </>

    )
}

function StackBars({ isSafari, isDarkMode, data,colors, height,fontSize, scaleX, scaleY, setTooltip,margin,barColor }) {
  return (
    <>
      {data.map(({ value, label },index1) => 
        (
          <Fragment key={`bar-${label}-${index1}`}>
          <text
            transform={`translate(${scaleX.bandwidth() + scaleX(label) - (scaleX.bandwidth() / 2)},${scaleY(value.reduce((a,b)=>a+b,0).toFixed(2))-6-(isSafari?10:0)})`}
            textAnchor="middle"
            alignmentBaseline="baseline"
            fill={isDarkMode ? "#CCCCCC" : "black"}
            fontSize={fontSize + 'px'}
            fontWeight="600"
          >
            {value.reduce((a,b)=>a+b,0).toFixed(2)*100/100}
          </text>
          {value.map((val,index)=>(
        <Fragment key={`bar-${label}-${index1}-${index}`}>
        <StackBar
          isFirst = {index ===0}
          isLast = {value.length-1 === index}
          x={scaleX(label)}
          y={scaleY((val<=0.25?0.25:val) + value.slice(0,index).reduce((a,b)=>a+b,0))}
          width={scaleX.bandwidth()}
          height={height - scaleY(val<0.25?0.25:val)}
          color={colors[index]}
          onMouseEnter={(event) => {
            setTooltip({
              x: event.clientX,
              y: event.clientY,
              index: index1,
              index1: index,
            })
          }}
        onMouseLeave={() => setTooltip(null)}
        />
        </Fragment>
      ))
          }
          </Fragment>
      
      ))}
    </>
    
    )
}

function ChartName({ chartName, barColor, fontSize, translate }) {
    return (
        <text
            transform={translate}
            alignmentBaseline="baseline"
            fill={barColor}
            fontSize={fontSize*1.08 + 'px'}
            // fontSize={'15px'}
            fontWeight="600"
        >
            {chartName}
        </text>
    )
}

export default function D3BarChart({ w, h, isDarkMode, chartName, isFromChart, data,colors, barColor, minValue, isLeftScale }) {

    const isBarChart = typeof(data[0].value) == 'number'
    const [tooltip, setTooltip] = useState(null)
    const margin = { top: 20, right: 20, bottom: 20, left: 20 }
    const width = w - margin.left - margin.right
    const height = h - margin.top - margin.bottom
    const fontSize = (w/48)<9?9:(w/48)>18?18:(w/48)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent); 

    const scaleX = scaleBand()
        .domain(data.map(({ label }) => label))
        // .range([0, width])
        .range([0, width - margin.left - margin.right])
        .padding(0.5)
    const scaleY = scaleLinear()
        .domain([0, (isBarChart?Math.max(...data.map(({ value }) => value)):Math.max(...data.map(({value})=>value.reduce((a,b)=>a+b,0)))) * 1.16])
        .range([height, 0])

    return (
        <Fragment>
            <svg
                width={w}
                height={h}
            >
                <g transform={`translate(${margin.left + 20}, ${margin.top - 8})`}>
                    <AxisBottom isDarkMode={isDarkMode} fontSize={fontSize} scaleX={scaleX} width={width} transform={`translate(0, ${height})`} />
                    {minValue != 0 && <AxisMinimum scale={scaleX} width={width} transform={`translate(0, ${scaleY(minValue) - 7})`} />}
                    <AxisLeft isDarkMode={isDarkMode} fontSize={fontSize} scaleY={scaleY} height={height} transform={`translate(0, 0)`} isLeftScale={isLeftScale} />
                    {
                        isBarChart?
                        (<Bars isSafari={isSafari} isDarkMode={isDarkMode} data={data} height={height} fontSize={fontSize} scaleX={scaleX} scaleY={scaleY}setTooltip={setTooltip} barColor={barColor} />):
                        (<StackBars isSafari={isSafari} isDarkMode={isDarkMode} data={data} colors={colors} height={height} fontSize={fontSize} scaleX={scaleX} scaleY={scaleY} setTooltip={setTooltip} margin={margin} barColor={barColor} />)
                    }
                    {
                        isFromChart &&
                        <ChartName chartName={chartName} barColor={barColor} fontSize={fontSize} translate={`translate(-2,${scaleY(1) / 24})`} />
                    }
                </g>
            </svg>
            {tooltip !== null ? (
                <div className="d3_tooltip" style={{ top: tooltip.y, left: tooltip.x }}>
                    <span>
                        {
                            data[tooltip.index].hasOwnProperty('hoverValue')  ?
                                (isBarChart?
                                (data[tooltip.index]['hoverValue'].map((d, i) =><span key={i}>{d}<br /></span>)):
                                (<>{data[tooltip.index]['hoverValue'][tooltip.index1]}<br/>Total: {data[tooltip.index]['value'].reduce((a,b)=>a+b,0).toFixed(2)*100/100}</>)
                                ) :
                                isBarChart?
                                (<>{data[tooltip.index]['label']}&nbsp;{data[tooltip.index]['value']}</>):
                                (<>{data[tooltip.index]['label']}&nbsp;{data[tooltip.index]['value'][tooltip.index1]}</>)
                        }
                    </span>
                </div>
            ) : null}
        </Fragment>
    )
}
