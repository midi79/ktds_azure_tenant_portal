import { useEffect, useState, ReactNode } from "react";
import axios from "axios";

const AUTH_API = "https://atportal.cbiz.kubepia.net/auth/login";
const AZURE_LOGIN_URL = `https://login.microsoftonline.com/4f0a3bfd-1156-4cce-8dc2-a049a13dba23/oauth2/v2.0/authorize?
    client_id=74e200be-ff66-4210-8c2a-d409a652915e&
    response_type=code&
    redirect_uri=https://atportal.cbiz.kubepia.net/auth/callback&    
    scope=openid+profile+email&state=QucYkovVq4i0pz8DaiOVFEQNNuPunK&nonce=TAybA5TpdgWEpEyf71nq`;

interface AppWrapperProps {
    children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios
            .get(AUTH_API, { withCredentials: true }) // `withCredentials` sends cookies with the request
            .then((response) => {
                if (response.status !== 200 || !response.data) {
                    throw new Error("Unauthorized");
                }
            })
            .catch(() => {
                window.location.href = AZURE_LOGIN_URL; // Redirect if authentication fails
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;

    return <>{children}</>;
};

export default AppWrapper;
