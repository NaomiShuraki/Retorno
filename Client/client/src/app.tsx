import ChatPage from "Componnents/Chat/chat";
import { Login } from "Componnents/Login/login";
import { CoursesPage } from "Componnents/Pages/Data/Courses/courses";
import { ExstrimCowboyPage } from "Componnents/Pages/Data/Teams/extrimCowboy";
import { TheraphyPage } from "Componnents/Pages/Data/Theraphy/therapy";
import { HomePage } from "Componnents/Pages/HomePage/homePage";
import { Register } from "Componnents/Registeration/register";
import { Route, Routes } from "react-router-dom";

export function App() {
  return (
    <>
      <Routes>
        <Route  path="/register" element={<Register/>}/> 
        <Route  path="/login" element={<Login/>}/> 
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/theraphy" element={<TheraphyPage />} />
        <Route path="/teams" element={<ExstrimCowboyPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/records" element={<CoursesPage />} />
        <Route path="/chat" element={<ChatPage />} />

      </Routes>
    </>
  );
}

export default App;
