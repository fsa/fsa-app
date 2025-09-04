import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { initSession } from "../api/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const token = await initSession();
            if (!token) {
                navigate("/login"); // редирект если нет токена
            } else {
                setAllowed(true);
            }
            setLoading(false);
        })();
    }, [navigate]);

    if (loading) {
        return <div>Проверка авторизации...</div>;
    }

    if (!allowed) {
        return null; // пока редирект не произойдёт
    }

    return <>{children}</>;
}
