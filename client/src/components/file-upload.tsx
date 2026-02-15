"use client"

import { cn } from "@/lib/utils"
import { ImagePlus, Upload, X } from "lucide-react"
import Image from "next/image"
import * as React from "react"
import { useDropzone, type DropzoneOptions } from "react-dropzone"
import { Button } from "./ui/button"

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onFileChange: (dataUri: string | null) => void
  options?: DropzoneOptions
}

export function FileUpload({ onFileChange, options, className, ...props }: FileUploadProps) {
  const [file, setFile] = React.useState<File & { preview: string } | null>(null)

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const acceptedFile = acceptedFiles[0]
      if (acceptedFile) {
        const fileWithPreview = Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        })
        setFile(fileWithPreview)

        const reader = new FileReader()
        reader.onload = () => {
          onFileChange(reader.result as string)
        }
        reader.readAsDataURL(acceptedFile)
      }
    },
    [onFileChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    ...options,
  })

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (file) {
      URL.revokeObjectURL(file.preview)
      setFile(null)
      onFileChange(null)
    }
  }

  React.useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview)
      }
    }
  }, [file])

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group relative grid h-64 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className,
        isDragActive && "border-primary bg-muted/50"
      )}
      {...props}
    >
      <input {...getInputProps()} />

      {file ? (
        <div className="relative h-full w-full">
          <Image
            src={file.preview}
            alt={file.name}
            fill
            className="rounded-md object-contain"
            onLoad={() => URL.revokeObjectURL(file.preview)}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 z-10 size-7"
            onClick={removeFile}
          >
            <X className="size-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className={cn(
              "rounded-full border border-dashed p-3",
              isDragActive && "border-muted-foreground/25"
            )}
          >
            <Upload
              className={cn("size-8 text-muted-foreground", isDragActive && "text-primary")}
              aria-hidden="true"
            />
          </div>
          <div className="space-y-px">
            <p className="font-medium text-muted-foreground">
              Drag & drop an image here, or
              <span className="text-primary"> click to select</span>
            </p>
            <p className="text-sm text-muted-foreground/70">
              PNG, JPG, or WEBP.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
