import './App.css'
import Todos from './components/Todos'
import AddTodo from './components/AddTodos'

function App() {

  return (
    <>
      <div className="font-black text-3xl text-center mt-8 mb-4">Todo React Redux</div>
      <AddTodo/>
      <Todos/>
    </>
  )
}

export default App
