import { Link } from 'react-router-dom';
const Sidebar = ({ hideSidebar, navLinks, renderCategories }) => {
  const handleCategoryClick = () => {
    hideSidebar();
    renderCategories();
  };

  return (
    <div className='sidebar h-[100vh] w-full bg-green-500 pt-[10px] text-center'>
      {navLinks.map((link, idx) => (
        <li key={idx} className="lg:px-6 px-2 text-xl py-3 list-none">
          {link.onClick ? (
            <div>
              <button onClick={link.onClick}>{link.name}</button>
              {renderCategories()}
            </div>
          ) : (
            <Link to={link.path} onClick={hideSidebar}>
              {link.name === 'Categories' ? (
                <span onClick={handleCategoryClick}>{link.name}</span>
              ) : (
                link.name
              )}
            </Link>
          )}
        </li>
      ))}
    </div>
  );
};

export default Sidebar;