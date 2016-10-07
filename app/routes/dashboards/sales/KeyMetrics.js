import { HtmlElement } from 'cx/ui/HtmlElement'
import { LabelTopLayout } from 'cx/ui/layout'
import { Repeater } from 'cx/ui/Repeater'
import { TextField } from 'cx/ui/form/TextField'
import { Checkbox } from 'cx/ui/form/Checkbox'
import { Button } from 'cx/ui/Button'
import { applyOuterLayout } from 'app/layouts/dynamicLayout'
import { Svg } from 'cx/ui/svg/Svg'
import { Rectangle } from 'cx/ui/svg/Rectangle'
import { Line } from 'cx/ui/svg/Line'
import { Text } from 'cx/ui/svg/Text'
import { Chart } from 'cx/ui/svg/charts/Chart'
import { NumericAxis } from 'cx/ui/svg/charts/axis/NumericAxis'
import { CategoryAxis } from 'cx/ui/svg/charts/axis/CategoryAxis'
import { Bar } from 'cx/ui/svg/charts/Bar'
import { Legend } from 'cx/ui/svg/charts/Legend'
import { LineGraph } from 'cx/ui/svg/charts/LineGraph'
import { MarkerLine } from 'cx/ui/svg/charts/MarkerLine'
import { Marker } from 'cx/ui/svg/charts/Marker'
import { Range } from 'cx/ui/svg/charts/Range'
import { computable } from 'cx/data/computable'
import { Format } from 'cx/util/Format'


export const KeyMetrics = <cx>
    <Legend.Scope>
        <div class="cse-dashboard-panel">
            <div class="flex-row">
                <h3 class="flex1">Key Metrics YTD</h3>
                <Legend style="margin-right:100px"/>
            </div>
            <Svg style="width:100%;height: 300px">
                <Line anchors="0 1 0 0" offset="20 0 20 0" stroke="gray"/>

                <Chart margin="20 0 50 0" padding="0 250 0 0" axes={{
                    x: {
                        type: NumericAxis,
                        min: 0,
                        format: "p",
                        snapToTicks: 0,
                        anchors: "0 1 1 0.35",
                        offset: "0 170 0 150"
                    },
                    y: {
                        type: CategoryAxis,
                        inverted: true,
                        vertical: true,
                        hidden: true,
                        anchors: "0 1 1 0.35",
                        offset: "0 0 0 150"
                    }
                }}>

                    <Text anchors="0 1 0 0" offset="-5 0 0 0">Past 12 Months</Text>
                    <Text anchors="0 0.35 0 0.35" offset="-5 30 0 30">Metric</Text>
                    <Text anchors="0 0.35 0 0.35" offset="-5 130 0 130">% of Target</Text>
                    <Text anchors="0 1 0 1" offset="-5 250 0 250" textAnchor="end">Actual</Text>

                    <Repeater records:bind="$page.keyMetrics">
                        <Range y1:bind="$record.title" y2:bind="$record.title" ySize={1} hidden>
                            <Rectangle anchors="0.1 0.35 0.9 0" offset="0 0 0 0" style="stroke:#eee;fill:transparent">
                                <Chart axes={{
                                    x2: {type: NumericAxis, hidden: true},
                                    y2: {type: NumericAxis, vertical: true, hidden: true}
                                }}>
                                    <LineGraph xAxis="x2" yAxis="y2" data:bind="$record.trend"/>
                                </Chart>
                            </Rectangle>
                            <Text bind="$record.title" dy="0.35em" anchors="0.5 0.35 0.5 0.35" dx="30"/>
                            <Text
                                value={computable('$record.actual', '$record.format', (v, format) => Format.value(v, format))}
                                textAnchor="end" dy="0.35em" anchors="0.5 1 0.5 1" dx="250"/>
                        </Range>
                        <Marker visible:expr="{$record.marked}" anchors="0 0.35 1 0.35" offset="0 15 0 15"
                                style="fill:red;stroke:none" size="10"/>
                        <Bar y:bind="$record.title" x={1.5} style="fill:#eee" size={0.7} name="Good"/>
                        <Bar y:bind="$record.title" x={0.9} style="fill:#ddd" size={0.7} name="Satisfactory"/>
                        <Bar y:bind="$record.title" x={0.5} style="fill:#ccc" size={0.7} name="Poor"/>
                        <Bar y:bind="$record.title" x:expr="{$record.actual}/{$record.target}" style="fill:#666"
                             size={0.35}/>

                    </Repeater>
                    <MarkerLine x={1} style="stroke:black;"/>
                </Chart>
            </Svg>
        </div>
    </Legend.Scope>
</cx>;

