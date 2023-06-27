import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

import { AuthContext, AuthProvider } from './contexts/auth';
import { useContext } from 'react';
import SignUp from './pages/SignUp';

export default function AppRoutes(){
    const PrivateRoute = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if(loading){
            return <div className="loading">Carregando...</div>
        }

        if(!authenticated) {
            return <Navigate to="/login"/>
        }

        return children;
    }

    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path='/login' element={<Login/>} />
                    <Route exact path='/cadastro' element={<SignUp/>} />
                    <Route exact path='/' element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>
                    } />
                </Routes>
            </AuthProvider>
        </Router>
    );
}