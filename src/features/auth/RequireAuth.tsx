import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectUser } from "./authSlice";

export function RequireAuth({ children }: { children: JSX.Element }) {
    const user = useAppSelector(selectUser);
    const location = useLocation();

    if (user === null) {
        return <Navigate to="/signin" state={{from: location }} replace />
    }

    return children;
}
