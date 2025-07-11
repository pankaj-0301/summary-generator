import SummaryForm from "./components/SummaryForm";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="p-4 bg-[#121212] flex justify-between items-center">
        <h1 className="text-lime-400 font-bold text-xl">📋 Summary</h1>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </nav>

      <SummaryForm />
    </div>
  );
}

export default App;
