import { Routes, Route } from 'react-router-dom'
import Register from './components/Register';
import Student from './pages/Student';
import Login from './components/Login';
import Admin from './pages/Admin';
import Faculty from './pages/Faculty';
import HomePage from './pages/HomePage';
import FacultyLogin from './components/FacultyLogin';
import Success from './pages/Success';
import Error from './pages/Error';
import FacultyRegistration from './components/FacultyRegistration';
import ReviewForm from './components/ReviewForm';
import StudentResetPassword from './components/StudentResetPassword';
import FacultyResetPassword from './components/FacultyResetPassword';

// import Student from './pages/Student';
import Students from './components/Students';
import Blog from './pages/BlogPage';
import SubjectForm from './components/SubjectForm';
import ProtectedStudentRoute from './components/ProtectedStudentRoutes';
import ProtectedFacultyRoutes from './components/ProtectedFacultyRoutes';

function App() {

 
  return (
    <div className="App">
      {/* <Navbar/> */}
      <Routes>
        <Route index path="/" element={<HomePage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/blog" element={<Blog />} />
        <Route path='/reset-password' element={<StudentResetPassword/>}/>
        <Route path='/faculty-reset-password' element={<FacultyResetPassword/>}/>

        <Route element={<ProtectedStudentRoute/>}>
            <Route path="/student" element={<Student />}/>
            <Route path='/review' element ={<ReviewForm/>}/>
            <Route path="/success" element={<Success />} />
        </Route>

        <Route element={<ProtectedFacultyRoutes/>}>
            <Route path="/admin" element={ <Admin />} />
            <Route path="/faculty" element={<Faculty />} />
            {/* <Route path="/detail/:id" element={<DetailPage />} /> */}
            <Route path="/students" element={<Students />} />
            <Route path='/register-subject' element ={<SubjectForm/>}/>
            <Route path='/add-faculty' element ={<FacultyRegistration/>}/>
        </Route>
        
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
