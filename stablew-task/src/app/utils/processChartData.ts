import { SMALL_EOA_THRESHOLD } from "../constants/chart";
import { ChartPoint, HolderType } from "../types/chart";

export function processChartData(
  data: any[],
  excludeSmallEOAs: boolean
): ChartPoint[] {
  return data
    .map((entry: any) => {
      let eoaProportionTotal = 0;
      let scProportionTotal = 0;

      const holdersData: Record<string, any> | undefined =
        entry.holderData?.holdersData;

      if (!holdersData || typeof holdersData !== "object") {
        return {
          timestamp: entry.timestamp,
          eoaProportion: 0,
          scProportion: 0,
          totalBalance: BigInt(0),
        };
      }

      for (const [, holder] of Object.entries(holdersData)) {
        let balance: number;

        try {
          balance = parseFloat(holder.balance);
        } catch {
          continue;
        }

        if (holder.type === HolderType.EOA) {
          if (!excludeSmallEOAs || balance >= Number(SMALL_EOA_THRESHOLD)) {
            eoaProportionTotal += balance;
          }
        } else if (holder.type === HolderType.SC) {
          scProportionTotal += balance;
        }
      }

      const total = eoaProportionTotal + scProportionTotal;

      return {
        timestamp: entry.timestamp,
        eoaProportion: total === 0 ? 0 : eoaProportionTotal / total,
        scProportion: total === 0 ? 0 : scProportionTotal / total,
        totalBalance: BigInt(total),
      };
    })
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
}
