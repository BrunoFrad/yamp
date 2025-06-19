import { LoginForm } from "../components/login-form";

export default function Login() {
    return(
        <div className="flex flex-col items-center justify-center p-6 md:p-10 h-[calc(100vh-80px)]">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm />
            </div>
        </div>
    );
}