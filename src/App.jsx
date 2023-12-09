import './App.css'
import Todos from './components/Todos'
import AddTodo from './components/AddTodos'

function App() {

  return (
    <>
      <div className="text-3xl text-white text-center mt-8 mb-4">Todo React Redux</div>
      <AddTodo/>
      <Todos/>
    </>
  )
}

export default App
