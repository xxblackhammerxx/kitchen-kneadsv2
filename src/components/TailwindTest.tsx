'use client';

export default function TailwindTest() {
  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Tailwind Test</h1>
        <p className="text-gray-500">If you can see this styled properly, Tailwind is working!</p>
      </div>
      
      <div className="space-y-2">
        <div className="w-full h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
        <div className="w-3/4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded"></div>
        <div className="w-1/2 h-4 bg-gradient-to-r from-pink-500 to-yellow-500 rounded"></div>
      </div>
      
      <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-150">
        Click me to test hover effects
      </button>
      
      <div className="grid grid-cols-3 gap-2">
        <div className="h-16 bg-red-200 rounded flex items-center justify-center text-red-800 font-semibold">Red</div>
        <div className="h-16 bg-green-200 rounded flex items-center justify-center text-green-800 font-semibold">Green</div>
        <div className="h-16 bg-blue-200 rounded flex items-center justify-center text-blue-800 font-semibold">Blue</div>
      </div>
    </div>
  );
}