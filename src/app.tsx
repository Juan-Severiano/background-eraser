import { useState, useEffect } from 'react'
import { removeBackground } from '@imgly/background-removal'
import { DragDropZone } from './components/DragDropZone'
import { Button } from './components/ui/button'
import { Download, ChevronLeft, Loader2, Eraser, Check } from 'lucide-react'
import { cn } from './lib/utils'

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [loadingText, setLoadingText] = useState("Initializing...")

  const handleFileSelect = async (file: File) => {
    const objectUrl = URL.createObjectURL(file)
    setOriginalImage(objectUrl)
    setProcessedImage(null)
    setIsProcessing(true)
    setLoadingText("Starting processing engine...")

    try {
      const blob = await removeBackground(file, {
        progress: (_key, current, total) => {
          const percent = Math.round((current / total) * 100)
          setLoadingText(`Processing: ${percent}%`)
        },
        debug: true
      })
      const processedUrl = URL.createObjectURL(blob)
      setProcessedImage(processedUrl)
    } catch (error) {
      console.error("Background removal failed:", error)
      alert("Failed to remove background.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a')
      link.href = processedImage
      link.download = 'removed-background.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleReset = () => {
    setOriginalImage(null)
    setProcessedImage(null)
    setIsProcessing(false)
  }

  useEffect(() => {
    return () => {
      if (originalImage) URL.revokeObjectURL(originalImage)
      if (processedImage) URL.revokeObjectURL(processedImage)
    }
  }, [originalImage, processedImage])

  if (originalImage || isProcessing) {
    return (
      <div className="h-screen flex flex-col bg-[#f8f9fa] dark:bg-[#0a0a0a]">
        <header className="h-16 px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleReset} className="hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
              <ChevronLeft className="size-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="size-8 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center text-rose-600 dark:text-rose-400">
                <Eraser className="size-4" />
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Editor</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 hidden sm:inline-block">Auto-saved</span>
            {processedImage && (
              <Button onClick={handleDownload} className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-6 shadow-lg shadow-rose-500/20">
                <Download className="mr-2 size-4" /> Download
              </Button>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-hidden relative flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

          <div className="relative max-w-5xl w-full max-h-full flex items-center justify-center">
            <div className={cn(
              "relative rounded-lg overflow-hidden shadow-2xl bg-[url('/checker-board.svg')] bg-repeat transition-all duration-500 ease-out",
              !processedImage ? "aspect-[4/3] w-full max-w-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200" : ""
            )}>
              {isProcessing ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-rose-500 blur-xl opacity-20 animate-pulse" />
                    <Loader2 className="size-12 animate-spin text-rose-600 relative z-10" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-zinc-600 dark:text-zinc-300 animate-pulse">{loadingText}</p>
                </div>
              ) : null}

              <img
                src={processedImage || originalImage || ""}
                alt="Editing"
                className="max-w-full max-h-[calc(100vh-180px)] object-contain relative z-10 shadow-sm"
              />
            </div>
          </div>

          {processedImage && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-full shadow-xl flex gap-2 animate-in slide-in-from-bottom-4">
              <div className="px-4 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 rounded-full text-sm font-medium flex items-center">
                <Check className="size-3 mr-2" /> Background Removed
              </div>
            </div>
          )}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] dark:bg-[#0a0a0a] text-zinc-900 font-sans flex flex-col">
      <nav className="h-20 px-6 md:px-12 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-zinc-900 dark:bg-white rounded-lg" />
          <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">remove<span className="text-zinc-400">.bg</span><span className="text-xs align-top text-rose-500 ml-1">open source</span></span>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center gap-12 lg:gap-24">

        <div className="flex-1 space-y-8 text-center md:text-left animate-in slide-in-from-left-4 duration-700">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Remove Image Background <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">100% Automatically</span>
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
            The most powerful background eraser, running entirely in your browser. Free, private, and unlimited.
          </p>
        </div>

        <div className="flex-1 w-full max-w-md animate-in slide-in-from-right-4 duration-700 delay-100">
          <DragDropZone onFileSelect={handleFileSelect} />
        </div>

      </main>

      <footer className="py-8 text-center text-sm text-zinc-400">
        Cloned for demonstration • @imgly/background-removal
      </footer>
    </div>
  )
}

export default App
