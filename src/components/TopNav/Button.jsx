function HistoryButton({text, onClick}) {
    return (
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3" 
        onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history h-4 w-4 mr-2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <path d="M3 3v5h5"></path>
          <path d="M12 7v5l4 2"></path>
        </svg>{text}
        </button>
    )
}


function ExportButton({text, onClick}) {
    return (
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3" 
        onClick={onClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download h-4 w-4 mr-2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" x2="12" y1="15" y2="3"></line>
          </svg>{text}
        </button>
    )
}


function UploadButton({text}) {
    return (
        <label htmlFor="file-upload">
        <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload h-4 w-4 mr-2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" x2="12" y1="3" y2="15"></line>
          </svg>{text}
        </span>
      </label>
    )
}




function RawJsonModal() {
    return (
        <div 
            role="dialog" 
            id="radix-r3" 
            aria-describedby="radix-r5" 
            aria-labelledby="radix-r4" 
            data-state="open" 
            className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-w-4xl max-h-[80vh]" 
            tabIndex="-1" 
            style={{ pointerEvents: 'auto' }}
        >
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <h2 
                    id="radix-r4" 
                    className="text-lg font-semibold leading-none tracking-tight flex items-center justify-between"
                >
                    <span>Raw JSON Data</span>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="lucide lucide-copy h-4 w-4 mr-2"
                        >
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                        </svg>
                        복사
                    </button>
                </h2>
            </div>
            <div 
                dir="ltr" 
                className="relative overflow-hidden h-[60vh] w-full border rounded-md" 
                style={{ 
                    position: 'relative', 
                    '--radix-scroll-area-corner-width': '0px', 
                    '--radix-scroll-area-corner-height': '0px' 
                }}
            >
                <style jsx>{`
                    [data-radix-scroll-area-viewport] {
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                        -webkit-overflow-scrolling: touch;
                    }
                    [data-radix-scroll-area-viewport]::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                <div 
                    data-radix-scroll-area-viewport="" 
                    className="h-full w-full rounded-[inherit]" 
                    style={{ overflow: 'hidden scroll' }}
                >
                    <div style={{ minWidth: '100%', display: 'table' }}>
                        <pre className="text-xs bg-muted p-4 rounded-lg whitespace-pre-wrap break-words">
                            <code>{'{}'}</code>
                        </pre>
                    </div>
                </div>
            </div>
            <button 
                type="button" 
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={() => {
                }}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-x h-4 w-4"
                >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
                <span className="sr-only">Close</span>
            </button>
        </div>
    )
}


function RawJSON({onClick}){
 
  return (
    <button 
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3" 
        type="button" 
        aria-haspopup="dialog" 
        aria-expanded="false" 
        aria-controls="radix-«r3»" 
        data-state="closed"
        onClick={onClick}
    >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-code h-4 w-4 mr-2"
        >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        Raw JSON
    </button>
  )
}

  export { HistoryButton, ExportButton, UploadButton, RawJSON };