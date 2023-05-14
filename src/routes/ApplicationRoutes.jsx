import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
function ApplicationRoutes() {
    // const ProtectedRoute = ({ children }) => {
    //     const { user } = useContext(AuthContext);
    //     if (!user) {
    //         return <Navigate to="/login" />;
    //     }
    //     return children;
    // };

    // const RoleBase = () => {
    //     const { user } = useContext(AuthContext);
    //     if (user?.role == 'admin') return <DashboardContents />;
    //     if (user?.role == 'agent') return <DashboardContentsAgents />;
    //     if (user?.role == 'client') return <DashboardContentsClient />;
    // };

    return (
        <>
            <Routes>
             <Route path="/" element={<Login />}> </Route>
             <Route path="/signup" element={<SignUp />}> </Route>  
             <Route path="/home" element={<Home />}> </Route>  

            </Routes>
        </>
    );
}
export default ApplicationRoutes;