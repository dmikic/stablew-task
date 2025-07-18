"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { API_URL } from "../constants/chart";
import { ChartPoint, HourlyEntry } from "../types/chart";
import { processChartData } from "../utils/processChartData";

export default function HoldersChart() {
  const [rawData, setRawData] = useState<HourlyEntry[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [excludeSmallEOAs, setExcludeSmallEOAs] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const json = await res.json();

        if (!json?.data || !Array.isArray(json.data)) {
          throw new Error("Error in API response");
        }

        setRawData(json.data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData: ChartPoint[] = useMemo(() => {
    if (!rawData) return [];
    return processChartData(rawData, excludeSmallEOAs);
  }, [rawData, excludeSmallEOAs]);

  const latestTotalBalance = useMemo(() => {
    return chartData.length > 0
      ? chartData[chartData.length - 1].totalBalance.toString()
      : "0";
  }, [chartData]);

  if (loading) return <div>Loading chart data</div>;
  if (error) return <div>Error loading data: {error}</div>;
  if (!rawData) return <div>No data available</div>;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl p-4">
        <h2 className="text-xl font-semibold mb-4">
          Holder Type Proportion Chart
        </h2>

        <label className="mb-2 flex items-center gap-2">
          <input
            type="checkbox"
            checked={excludeSmallEOAs}
            onChange={(e) => setExcludeSmallEOAs(e.target.checked)}
          />
          Exclude small EOA balances
        </label>

        <p className="mb-4">
          Latest Total Balance: {latestTotalBalance.toString()}
        </p>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) =>
                new Date(timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip
              formatter={(value: number) => `${(value * 100).toFixed(2)}%`}
              labelFormatter={(label) =>
                new Date(label as number).toLocaleString()
              }
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="eoaProportion"
              stackId="1"
              stroke="#a83b49ff"
              fill="#a83b49ff"
              name="EOA"
            />
            <Area
              type="monotone"
              dataKey="scProportion"
              stackId="1"
              stroke="#10a5ebff"
              fill="#10a5ebff"
              name="SC"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
