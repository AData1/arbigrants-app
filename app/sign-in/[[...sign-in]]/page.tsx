import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex-1 space-y-4 pt-6">
                <SignIn
                    appearance={{
                        elements: {
                            cardBox: {
                                boxShadow: "none",
                                borderWidth: 1,
                                borderColor: "black"
                            },
                        },
                    }}
                    path="/sign-in" />
            </div>
        </div>
    )
}