import { useEffect,useState, useRef,Fragment } from "react"
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


function AxisBottom({ scale, width, transform }) {
  const ref = useRef (null)

  useEffect(() => {
    let xAxisGen = axisBottom(scale)
    if (ref.current) {
      select(ref.current).call(xAxisGen)
      select(ref.current).attr('font-size', '13px').attr('stroke-width', 0)
      .attr('font-weight', '600')
      // .attr("color", "black")
    }
  }, [scale])

  return <g ref={ref} transform={transform} >
    <path stroke="gray" strokeWidth={'3px'} d={`M 0 0 h ${width/1.05}`} ></path>
  </g>
}
function AxisMinimum({ scale, width, transform }) {
  const ref = useRef (null)
  useEffect(() => {
    let xAxisGen = axisBottom(scale)
    if (ref.current) {
      select(ref.current).call(xAxisGen)
      select(ref.current).attr('font-size', '0px').attr('stroke-width',0)
    }
  }, [scale])
  return <g ref={ref} transform={transform} >
    <path stroke="gray" strokeWidth={'0.5px'} d={`M 0 6 h ${width/1.05}`} ></path> 
  </g>
}

function AxisLeft({ scale, height }) {
  const ref = useRef (null)
  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale))
      select(ref.current).attr('font-size', '0px').attr('stroke-width', 0)
    }
  }, [scale])
  return <g ref={ref} >
    <path stroke="gray" strokeWidth={'3px'} d={`M 0 0 v ${height}`} ></path>
  </g>
}

function Bars({ data, height, scaleX, scaleY, setTooltip,margin,barColor }) {
  return (
    <>
      {data.map(({ value, label }) => (
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
              index: label,
               value: value
            })
          }}
        onMouseLeave={() => setTooltip(null)}
        />
          <text
            transform={`translate(${scaleX.bandwidth() + scaleX(label) - (scaleX.bandwidth() / 2)}, ${scaleY(value) - 8})`}
            textAnchor="middle"
            alignmentBaseline="baseline"
            fill="black"
            fontSize={(scaleX.bandwidth()/2)+'px'}
            fontWeight="700"
          >
            {value}
          </text>
        </Fragment>
      ))}
    </>
    
  )
}

export default function BarChart3({w,data,barColor,minValue }) {
  let h = w/1.5;
  const [tooltip, setTooltip] = useState(null)
  const margin = { top: 20, right: 20, bottom: 20, left: 20 }
  const width = w - margin.left - margin.right
  const height = h - margin.top - margin.bottom

  const scaleX = scaleBand()
    .domain(data.map(({ label }) => label))
    // .range([0, width])
    .range([0, width - margin.left - margin.right])
    .padding(0.5)
  const scaleY = scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))*1.12])
    .range([height, 0])

  return (
    <div style={{backgroundColor:'lightgray',width:width,overflow:'hidden'}}>
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom scale={scaleX} width={width} transform={`translate(0, ${height})`} />
          <AxisMinimum scale={scaleX} width = {width}  transform={`translate(0, ${scaleY(minValue)-7})`} />
          <AxisLeft scale={scaleY} height={height} />
          <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} setTooltip={setTooltip} margin={margin} barColor={barColor} />
      </g>
    </svg>
      {tooltip !== null ? (
        <div className="tooltip" style={{ top: tooltip.y, left: tooltip.x }}>
          <span>{tooltip.index} {tooltip.value}</span>
        </div>
      ) : null}
    </div>
  )
}
