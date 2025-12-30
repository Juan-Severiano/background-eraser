import { useCallback, useState } from 'react'
import { X, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DragDropZoneProps {
  onFileSelect: (file: File) => void
  className?: string
}

export function DragDropZone({ onFileSelect, className }: DragDropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }, [])

  const validateFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return false
    }
    setError(null)
    return true
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        onFileSelect(file)
      }
    }
  }, [onFileSelect])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        onFileSelect(file)
      }
    }
  }

  return (
    <div
      className={cn(
        "relative rounded-[2rem] shadow-2xl transition-all duration-300 ease-in-out w-full max-w-[480px] mx-auto min-h-[380px] flex flex-col items-center justify-center p-8 text-center group bg-white dark:bg-zinc-900",
        isDragActive
          ? "border-2 border-rose-500 scale-[1.02]"
          : "border border-transparent hover:scale-[1.01]",
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />

      {/* Ghost overlay for drag state */}
      {isDragActive && (
        <div className="absolute inset-0 bg-rose-50/90 dark:bg-rose-950/90 rounded-[2rem] flex items-center justify-center z-20 backdrop-blur-sm">
          <p className="text-xl font-bold text-rose-600 dark:text-rose-400 animate-bounce">Drop file here!</p>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 relative z-10 w-full">
        <div className="relative">
          {/* Decorative background blob */}
          <div className="absolute inset-0 bg-rose-100 dark:bg-rose-900/30 blur-2xl rounded-full opacity-60" />
          <ImageIcon className="size-24 text-zinc-300 dark:text-zinc-700 relative" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Upload an Image</h3>
          <p className="text-zinc-500 text-sm max-w-[260px] mx-auto">
            Drag & drop or paste an image to simplify the background instantly.
          </p>
        </div>

        <button
          onClick={() => document.getElementById('file-upload')?.click()}
          className="mt-4 px-8 py-4 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-full text-lg font-bold shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-1 w-full max-w-[280px]"
        >
          Upload Image
        </button>

        <p className="text-xs text-zinc-400 mt-4">
          No image? <span className="underline cursor-pointer hover:text-rose-500 transition-colors" onClick={() => {/* Placeholder for demo logic */ }}>Try one of these</span>
        </p>
      </div>

      {error && (
        <div className="absolute bottom-6 left-0 right-0 text-center animate-in slide-in-from-bottom-2">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium border border-red-100">
            <X className="size-4" /> {error}
          </span>
        </div>
      )}
    </div>
  )
}
