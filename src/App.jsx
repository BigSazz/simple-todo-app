import React, { useState } from 'react';
import { TrophyIcon, PlusIcon, CheckIcon } from "@heroicons/react/24/solid";


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [title, setTitle] = useState('Add Task');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const onNewTask = () => {
    setTitle('Add Task');
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

  return (
    <main className='max-w-[1049px] h-[944px] mx-auto mt-2 flex bg-slate-50'>

      {/* left side */}
      <div className='relative flex flex-col w-[414px] h-full shadow-lg shadow-right'>

        {/* header */}
        <div className='w-full h-[123px] bg-[#3556AB] p-4 pt-6 px-6 flex items-start'>
          <div className='w-[292px] flex space-x-5'>
            <div className='w-16 h-12 bg-gray-400 rounded-full flex items-center justify-center'></div>
            <div className='space-y-1'>
              <h1 className='text-white text-sm text-shadow shadow-black font-medium'>Hello, John</h1>
              <p className='text-white/70 text-2xl font-thin italic text-shadow-sm shadow-black'>What are your plans for today?</p>
            </div>
          </div>
        </div>

        {/* subscription */}
        <div className='relative w-full h-[116px] bg-[#CDE53D] border-2 border-[#9EB031] p-4 px-6 flex items-center space-x-8 shadow-md drop-shadow-lg'>
          <TrophyIcon className='w-12 h-12 text-[#F2C94C]' />
          <p className='font-bold text-blue-950'>Go Pro Upgrade Now</p>
          <div className='absolute -top-1 right-6 bg-blue-950 p-6'>
            <p className='text-[#F2C94C]'>$1</p>
          </div>
        </div>

        {/* list */}
        <div className='pt-4 px-4 space-y-6'>
          {tasks.map((task, index) => {
            const { title, completed } = task;
            
            return (
              <div key={index}>
                <div className='bg-white w-[382px] h-[91px] flex px-4 items-center justify-between shadow-lg rounded-md'>
                  <div onClick={() => handleChange(index)} className='flex items-center space-x-4 cursor-pointer'>
                    <div className={`p-2 border-[1.5px] rounded-full ${completed ? "bg-[#53DA69] border-[#49C25D]" : "bg-white border-[#071D55] "}`}>
                      <CheckIcon
                        className={`w-4 h-4 ${completed ? 'text-[#399649]' : 'text-white'}`}
                      />
                    </div>
                    <p className={`${completed ? "text-[#8D8D8D] line-through" : "text-[#071D55]"} font-medium`}>{title}</p>
                  </div>
                  <button data-testid="edit-task" onClick={() => onEditTask(task, index)} className='border border-[#071D55] py-2 px-2 rounded-md '>
                    <p className='text-[#071D55]'>Edit</p>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* add button */}
        <button onClick={() => onNewTask()} data-testid="add-task-button" className='absolute bottom-5 right-3 bg-[#3556AB] border-2 border-[#123EB1] rounded-full p-4 cursor-pointer shadow-lg drop-shadow-lg'>
          <PlusIcon className='w-8 h-8 text-white text-shadow shadow-black font-medium text-2xl text-shadow-default' />
        </button>
      </div>
      
      {/* right side */}
      <div className='w-[635px] h-full'>
        {showForm && (
          <div className='flex flex-col w-full h-full'>
            <div className='w-full h-[142px] bg-[#3556AB] flex items-center justify-center shadow-lg drop-shadow-md'>
              <p className='text-white text-2xl text-shadow shadow-black tracking-wider'>{title}</p>
            </div>
            <div className='flex flex-col w-full h-full py-6 px-4'>
              <div className='flex flex-1 flex-col justify-start space-y-4'>
                <p className='text-lg font-normal tracking-widest'>Task Name</p>
                <div className='w-full bg-white py-2 px-4 rounded-lg border-2 border-[#CBCBCB]'>
                  <input
                    type='text'
                    data-testid="task-name"
                    value={newTask}
                    className='w-full text-xl text-[#0D2972] h-12 ring-0 active:ring-0 focus:ring-0 border-0 focus:border-0 outline-none bg-transparent'
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full justify-end'>
                {isEditing ? (
                  <div className='w-full flex space-x-4'>
                    <button
                      data-testid="delete-button"
                      className='w-1/4 h-16 bg-[#AB3535] text-white rounded-lg shadow-inner font-normal drop-shadow-lg border-2 border-[#720D0D]'
                      onClick={() => handleDeleteTask(editIndex)}
                    >
                      <p className='text-shadow shadow-black'>Delete</p>
                    </button>
                    <button
                      data-testid="edit-button"
                      className='w-3/4 h-16 bg-[#3556AB] text-white rounded-lg shadow-inner font-normal drop-shadow-lg border-2 border-[#0D2972]'
                      onClick={(e) => handleEditTask(e, editIndex, newTask)}
                    >
                      <p className='text-shadow shadow-black'>Save</p>
                    </button>
                  </div>
                ) : (
                  <button
                    data-testid="add-button"
                    className='w-full h-16 bg-[#3556AB] text-white rounded-lg font-normal drop-shadow-2xl border-2 border-[#0D2972] text-shadow-default shadow-inner'
                    onClick={handleAddTask}
                  >
                    <p className='text-shadow shadow-black'>Add Task</p>
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
