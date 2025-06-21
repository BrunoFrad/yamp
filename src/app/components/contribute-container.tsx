export default function ContributeContainer({ children }: { children: React.ReactNode }) {
    return(
        <div className="flex flex-col h-[70vh] w-[70vw] items-center justify-center border-2 gap-10 rounded-lg">
            {children}
        </div>
    );
}