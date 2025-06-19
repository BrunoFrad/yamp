import { SignUpForm } from "@/app/components/signup-form";

export default function SignUp() {
    return(
        <div className="flex mt-30 flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <SignUpForm />
            </div>
        </div>
    );
}