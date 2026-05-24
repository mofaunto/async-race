interface Props {
    children: React.ReactNode
}

const AppShell = ({ children }: Props): React.ReactElement => (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 p-6">
            {children}
        </div>
    </div>
)

export default AppShell
