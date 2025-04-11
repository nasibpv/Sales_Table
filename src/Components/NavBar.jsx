import {useEffect,useState} from 'react'

function NavBar() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
      });
      useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
          root.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          root.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      }, [isDark]);
  return (
    <div className='w-full bg-blue-500 dark:bg-gray-900 text-white p-3 flex justify-between items-center'>
        <h4 className='text-2xl font-bold'>Sales</h4>
        <button
        onClick={() => setIsDark(!isDark)}
        className='bg-white text-black dark:bg-gray-700 dark:text-white px-3 py-1 rounded'
      >
        {isDark ? '☀ Light' : '🌙 Dark'}
      </button>
        </div>
  )
}

export default NavBar