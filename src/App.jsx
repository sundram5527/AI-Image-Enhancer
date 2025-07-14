

import Home from './components/Home'
function App() {


  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
<div className="text-center mb-8">
  <h1 className="text-5xl font-bold text-gray-800 mb-2">AI Image Enhancer</h1>
    Upload your Image and let AI to enhance it in seconds 
</div>
   <Home></Home> 
  
  <div className='text-lg text-gray-500'>
  <p className='text-lg text-gray-500 mt-6'>Powered by AI</p>
  </div>
   </div>
  )
}

export default App
