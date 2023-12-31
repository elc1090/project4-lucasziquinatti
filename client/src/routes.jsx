import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

import { AuthContext, AuthProvider } from './contexts/auth';
import { useContext } from 'react';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import BasePage from './pages/BasePage';
import Game from './pages/Game';
import ChangeChar from './pages/ChangeChar';

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
                    <Route exact path='/' element={<BasePage/>}>
                        <Route index element={<Home/>} />
                        <Route exact path='/login' element={<Login/>} />
                        <Route exact path='/cadastro' element={<SignUp/>} />
                        <Route exact path='/profile' element={
                            <PrivateRoute>
                                <Profile/>
                            </PrivateRoute>
                        } />
                        <Route exact path='/game' element={
                            <PrivateRoute>
                                <Game />
                            </PrivateRoute>
                        } />
                        <Route exact path='/change' element={
                            <PrivateRoute>
                                <ChangeChar />
                            </PrivateRoute>
                        } />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}