import TopHead from './TopHead'
import Navbar from "./Navbar"; 

const Header = () => {
  
  return (
    <div className="fixed top-0 z-50 w-full bg-white shadow-sm">
      <TopHead />
      <Navbar />    
    </div>
  );
};

export default Header;
