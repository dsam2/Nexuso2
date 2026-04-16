export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white p-8 font-sans">
      <header className="mb-10">
        <h1 className="text-5xl font-black uppercase tracking-tighter border-b-8 border-black pb-2">
          Task Command Center
        </h1>
      </header>
      
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 border-4 border-black p-6 bg-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold mb-4">Your Active Tasks</h2>
          <p>List of tasks will go here...</p>
        </div>
        <div className="border-4 border-black p-6 bg-cyan-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
          <p>Pending: 0</p>
          <p>Completed: 0</p>
        </div>
      </div>
    </div>
  );
}