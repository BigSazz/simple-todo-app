import { useState } from 'react';
import { TrophyIcon, PlusIcon, CheckIcon  } from "@heroicons/react/24/solid";


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [title, setTitle] = useState('Add Task');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const onNewTask = () => {
    setShowForm(true);
    setIsEditing(false);
    setNewTask('');
  };
  
  const onEditTask = (task, index) => {
    setTitle('Edit Task');
    setNewTask(task.title);
    setShowForm(true);
    setIsEditing(true);
    setEditIndex(index);
  }

  const handleChange = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { title: newTask, completed: false }]);
      setNewTask('');
      setShowForm(false);
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    setIsEditing(false);
    setShowForm(false);
  };

  const handleEditTask = (e, index, newTitle) => {
    e.stopPropagation();
    if (newTitle.trim() !== '') {
      const newTasks = [...tasks];
      newTasks[index].title = newTitle;
      setTasks(newTasks);
      setIsEditing(false);
      setShowForm(false);
    }
  };

  console.log(tasks);

  return (
    <main className='max-w-[1049px] h-[944px] mx-auto mt-2 flex bg-slate-50'>
      {/* left side */}
      <div className='relative flex flex-col w-[414px] h-full shadow-lg shadow-right'>
        {/* header */}
        <div className='w-full h-[123px] bg-[#3556AB] p-4 px-6 flex items-start'>
          <div className='w-[292px] flex space-x-5'>
            <div className='w-16 h-12 bg-gray-400 rounded-full flex items-center justify-center'></div>
            <div>
              <h1 className='text-white text-xs font-bold'>Hello, John</h1>
              <p className='text-white text-2xl font-thin italic'>What are your plans for today?</p>
            </div>
          </div>
        </div>
        {/* subscription */}
        <div className='relative w-full h-[116px] bg-[#9EB031] p-4 px-6 flex items-center space-x-8 shadow-md'>
          <TrophyIcon className='w-12 h-12 text-[#F2C94C]' />
          <p className='font-bold text-blue-950'>Go Pro Upgrade Now</p>
          <div className='absolute top-0 right-6 bg-blue-950 p-6'>
            <p className='text-[#F2C94C]'>$1</p>
          </div>
        </div>
        {/* list */}
        <div className='pt-4 px-4 space-y-6'>
          {tasks.map((task, index) => {
            const { title, completed } = task;
            
            return (
              <div key={index}>
                <div className='bg-white w-[382px] h-[91px] flex px-4 items-center justify-between shadow-lg'>
                  <div onClick={() => handleChange(index)} className='flex items-center space-x-4 cursor-pointer'>
                    <div className={`p-2 border border-black rounded-full ${completed ? "bg-green-500" : "bg-white"}`}>
                      <CheckIcon
                        className={`w-3 h-3 ${completed ? 'text-green-800' : 'text-white'}`}
                      />
                    </div>
                    <p className={`${completed ? "text-gray-400 line-through" : "text-black"}`}>{title}</p>
                  </div>
                  <button onClick={() => onEditTask(task, index)} className='border border-black py-2 px-2 rounded-sm '>Edit</button>
                </div>
              </div>
            )
          })}
        </div>
        <button onClick={() => onNewTask()} className='absolute bottom-5 right-3 bg-blue-700 rounded-full p-4 cursor-pointer'>
          <PlusIcon className='w-8 h-8 text-white font-extrabold shadow-md' />
        </button>
      </div>
      {/* right side */}
      <div className='w-[635px] h-full'>
        {showForm && (
          <div className='flex flex-col w-full h-full'>
            <div className='w-full h-[142px] bg-[#3556AB] flex items-center justify-center shadow-lg'>
              <p className='text-white text-2xl'>{title}</p>
            </div>
            <div className='flex flex-col w-full h-full py-6 px-4'>
              <div className='flex flex-1 flex-col justify-start space-y-4'>
                <p className='text-lg font-thin tracking-wide'>Task Name</p>
                <div className='w-full bg-white py-2 px-4 rounded-lg border border-gray-400'>
                  <input
                    type='text'
                    value={newTask}
                    className='w-full text-xl h-12 ring-0 active:ring-0 focus:ring-0 border-0 focus:border-0 outline-none bg-transparent'
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full justify-end'>
                {isEditing ? (
                  <div className='w-full flex space-x-4'>
                    <button
                      className='w-1/4 h-16 bg-red-500 text-white rounded-lg shadow-md font-bold'
                      onClick={() => handleDeleteTask(editIndex)}
                    >
                      Delete
                    </button>
                    <button
                      className='w-3/4 h-16 bg-[#3556AB] text-white rounded-lg shadow-md font-bold'
                      onClick={(e) => handleEditTask(e, editIndex, newTask)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    className='w-full h-16 bg-[#3556AB] text-white rounded-lg shadow-md font-bold'
                    onClick={handleAddTask}
                  >
                    Add Task
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
