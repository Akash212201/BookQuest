import { Link } from 'react-router-dom';
const Sidebar = ({ hideSidebar }) => {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "New Arrival",
      path: "/newarrival",
    },
    {
      name: "Best Seller",
      path: "/bestseller",
    },
    {
      name: "Fiction",
      path: "/fiction",
    },
    {
      name: "Sci-Fi",
      path: "/scifi",
    },
    {
      name: "Love Stories",
      path: "/lovestories",
    },
  ]
  return (
    <div className='sidebar h-[100vh] w-full bg-green-500 pt-[10px] text-center'>
      {
        links.map(link => (
          <Link to={link.path}
            className="block p-[1rem] mb-[10px] text-white text-[20px] font-bold"
            onClick={hideSidebar}
            key={link.name}>
            {link.name}
          </Link>
        ))
      }
      <a href="/login" className="block p-[1rem] mb-[10px] text-white text-[20px] font-bold">Log In</a>

    </div>
  )
}

export default Sidebar;