import { Routes, Route, Navigate } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { RepositoriesRoutes } from "../favoriteRepositories/routes/RepositoriesRoutes"
import { CheckingAuth } from "../ui";
import { usecheckAuth } from "../hooks/usecheckAuth";

export const AppRouter = () => {

    const status = usecheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />
    }

    return (
        <Routes>
            {status === 'authenticated'
                ? <Route path="/*" element={< RepositoriesRoutes />} />
                : <Route path="/auth/*" element={<AuthRoutes />} />
            }

            <Route path='/*' element={<Navigate to='/auth/login' />} />

        </Routes>
    )
}
