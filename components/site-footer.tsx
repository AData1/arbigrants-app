// import { siteConfig } from "@/config/site"

export function SiteFooter() {
    return (
        <footer>
            <div className="container flex flex-col items-center justify-between gap-1 ">
                <div className="mt-4 grid gap-3 md:gap-7 grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-row justify-center gap-2">
                        <p className="text-center text-base font-semibold uppercase text-muted-foreground">
                            Powered By
                        </p>
                        <a

                            href="https://www.allium.so/"
                            target="_blank"
                        >
                            <img src="/allium-logo.png" alt="Allium Logo" className="h-[20px]" />
                        </a>
                    </div>
                    <div className="flex flex-col">
                        <p className="mb-4 text-center text-base font-semibold uppercase text-muted-foreground">
                            Built by{" "}
                            <a
                                href="https://twitter.com/0xKofi"
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium underline underline-offset-4"
                            >
                                0xKofi
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
