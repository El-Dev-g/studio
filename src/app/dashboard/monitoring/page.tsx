
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { BarChart, Bar, } from "recharts"


const cpuData = [
  { time: "12:00 AM", usage: 15 },
  { time: "2:00 AM", usage: 20 },
  { time: "4:00 AM", usage: 18 },
  { time: "6:00 AM", usage: 25 },
  { time: "8:00 AM", usage: 40 },
  { time: "10:00 AM", usage: 45 },
  { time: "12:00 PM", usage: 50 },
  { time: "2:00 PM", usage: 48 },
  { time: "4:00 PM", usage: 55 },
  { time: "6:00 PM", usage: 60 },
  { time: "8:00 PM", usage: 52 },
  { time: "10:00 PM", usage: 35 },
]

const ramData = [
    { time: "12:00 AM", usage: 450 },
    { time: "2:00 AM", usage: 480 },
    { time: "4:00 AM", usage: 470 },
    { time: "6:00 AM", usage: 520 },
    { time: "8:00 AM", usage: 680 },
    { time: "10:00 AM", usage: 720 },
    { time: "12:00 PM", usage: 800 },
    { time: "2:00 PM", usage: 780 },
    { time: "4:00 PM", usage: 820 },
    { time: "6:00 PM", usage: 850 },
    { time: "8:00 PM", usage: 750 },
    { time: "10:00 PM", usage: 600 },
]

const bandwidthData = [
  { name: "Jan", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Feb", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Mar", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Apr", total: Math.floor(Math.random() * 500) + 100 },
  { name: "May", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Jun", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Jul", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Aug", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Sep", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Oct", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Nov", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Dec", total: Math.floor(Math.random() * 500) + 100 },
]

export default function MonitoringPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resource Monitoring</h1>
        <p className="text-muted-foreground">An overview of your hosting resource usage.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>CPU Usage</CardTitle>
            <CardDescription>CPU utilization over the last 24 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ usage: { label: "CPU", color: "hsl(var(--primary))" } }} className="h-64">
              <AreaChart data={cpuData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <YAxis unit="%" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Area dataKey="usage" type="monotone" stroke="var(--color-usage)" fill="var(--color-usage)" fillOpacity={0.2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>RAM Usage</CardTitle>
            <CardDescription>Memory utilization over the last 24 hours.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={{ usage: { label: "RAM", color: "hsl(var(--accent))" } }} className="h-64">
              <AreaChart data={ramData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <YAxis unit="MB" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Area dataKey="usage" type="monotone" stroke="var(--color-usage)" fill="var(--color-usage)" fillOpacity={0.2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Bandwidth Usage</CardTitle>
            <CardDescription>Total bandwidth usage per month (in GB).</CardDescription>
          </CardHeader>
          <CardContent>
             <ResponsiveContainer width="100%" height={350}>
                <BarChart data={bandwidthData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value} GB`}
                  />
                  <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
