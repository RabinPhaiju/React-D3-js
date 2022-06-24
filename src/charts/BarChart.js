import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import './barChart.css'

function BarChart({ width, height, data, margin, barColor="black" }) {
    const svgref = useRef()

    useEffect(() => {
        // setting up the svg container
        const svg = d3.select(svgref.current)
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top - margin.bottom)
            .attr("viewBox",[0,0,width,height])
            // .style("border", "1px solid black")

        // setting the scaling
        const xScale = d3.scaleBand()
        .domain(data.map((val,i)=>i))
        .range([0,width-margin.right-margin.left])
        // .range([margin.left,width-margin.right])
        .padding(0.3)//change the widht of bar

        const yScale = d3.scaleLinear()
        .domain([0,d3.max(data.map(d=>d.value))+1])
        .range([height,0])
        // .range([height - margin.bottom, margin.top])

        // setting the svg data
        svg.append('g')
        .attr('fill',barColor)
        // .selectAll('.bar')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x',(d,i)=>xScale(i))
        .attr('y', (d) => yScale(d.value))
        .attr('height', d => yScale(0) - yScale(d.value))
        .attr('width',xScale.bandwidth())
        .attr('transform', `translate(0,${-margin.bottom})`)
        .attr('class','d3_barchart_rectangle')

        // setting bar value
        function barText(g) {
            g.attr('transform', `translate(0,${200})`)
                .call(d3.axisBottom(xScale).tickFormat(''))
                .style('border','6px solid red')
        }
        svg.append('g').call(barText) 

        svg.append('text')
        .text('y')
        .attr('fill','black')
        .attr('transform',`translate(${xScale.bandwidth()/2-5},${-10})`)

        // setting the axes
       function xAxis(g){
        g.attr('transform', `translate(0,${height - margin.bottom+2})`)
            .call(d3.axisBottom(xScale).tickFormat(i => data[i].name))
        .attr('font-size','20px')
       }
        svg.append('g').call(xAxis) 
        
        function yAxis(g){
            g.attr('transform', `translate(0,${-margin.bottom})`)
        .call(d3.axisLeft(yScale).ticks(null,data.format))
        .attr('font-size','16px')
       }
        svg.append('g').call(yAxis)

    }, [margin,data,height,width,barColor])


    return (
        <div>
            <svg ref={svgref}></svg>
        </div>

    )

}

export default BarChart