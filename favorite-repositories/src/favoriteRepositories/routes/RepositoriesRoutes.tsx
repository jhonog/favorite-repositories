import { Navigate, Routes, Route } from "react-router-dom"
import { RepositoriesPage } from "../pages/RepositoriesPage"

export const RepositoriesRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<RepositoriesPage />} />

            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
