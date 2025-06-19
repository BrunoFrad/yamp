import { SignUpForm } from "@/app/components/signup-form";

export default function SignUp() {
    return(
        <div className="flex flex-col items-center justify-center p-6 md:p-10 h-full">
            <div className="w-full max-w-sm md:max-w-3xl">
                <SignUpForm />
            </div>
        </div>
    );
}