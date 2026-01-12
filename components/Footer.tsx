export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-16 flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href="https://github.com/awixor"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            awixor
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/awixor/Block-Explorer"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
