import data from "./data";
import './App.css';
import { useState } from "react";
import ScholarList from "./Components/ScholarList";
import ScholarForm from "./Components/ScholarForm";
import ScholarItem from "./components/ScholarItem";

function App() {
  const [scholars, setScholars] = useState(data);

  // Hàm để thêm học bổng mới
  const addScholar = (newScholar) => {
    setScholars([...scholars, newScholar]);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-left">
          <span className="logo">ScholarPro </span>
          <input type="text" className="search-input" placeholder="Search scholarship..." />
          
        </div>
        <div className="nav-right">
          
          <a href="/" className="nav-link">Home</a>
          <a href="/list" className="nav-link">List</a>
          <a href="/add" className="nav-link">Add new</a>
          <a href="/about" className="nav-link">About</a>
        </div>
      </nav>

      <main className="croptext">
        <div>
          <h1>Scholarship catalog</h1>
          
          <p className="">Track spomsors, award value,....</p>
        </div>
        <div className="header-list">
            <p >Table filter</p>
          <input type="text" className="search-input" placeholder="Type a keywork." />

        </div>

       
       

        {/* Hiển thị form thêm mới học bổng ngay lập tức, không ở dạng pop-up */}
        <ScholarForm 
          onAdd={addScholar} 
        />
         {/* Hiển thị danh sách học bổng */}
         <ScholarList data={scholars} />
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="left-side">
            <span>scholarPro</span>
            
            <br />
          </div>
          <div className="right-side">
           <span>Studen ID</span>
          </div>
          <br />
          <div className="">@2026..</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
