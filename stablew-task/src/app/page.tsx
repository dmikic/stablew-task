import HolderChartPage from "./holders-chart/page";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Stablewatch Dashboard</h1>

      <HolderChartPage />
    </main>
  );
}
