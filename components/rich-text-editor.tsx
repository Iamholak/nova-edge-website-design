'use client'

import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Image as ImageIcon,
  Heading2,
  Heading1,
  List,
  ListOrdered,
  Code,
  Link as LinkIcon
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = 'Write your content here...',
  minHeight = '400px'
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isImageLoading, setIsImageLoading] = useState(false)

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  // Initialize editor content only once on mount
  useEffect(() => {
    if (editorRef.current && value && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value
    }
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.[0]
    if (!file) return

    setIsImageLoading(true)
    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imgSrc = event.target?.result as string
        execCommand('insertImage', imgSrc)
      }
      reader.readAsDataURL(file)
    } finally {
      setIsImageLoading(false)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, text)
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="bg-muted p-3 border-b border-border flex flex-wrap gap-2">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r border-border pr-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => execCommand('bold')}
            className="gap-1"
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => execCommand('italic')}
            className="gap-1"
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </Button>
        </div>

        {/* Headings & Lists */}
        <div className="flex gap-1 border-r border-border pr-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => execCommand('formatBlock', '<h1>')}
            className="gap-1"
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => execCommand('formatBlock', '<h2>')}
            className="gap-1"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => execCommand('insertUnorderedList')}
            className="gap-1"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => execCommand('insertOrderedList')}
            className="gap-1"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r border-border pr-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => execCommand('justifyLeft')}
            className="gap-1"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => execCommand('justifyCenter')}
            className="gap-1"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => execCommand('justifyRight')}
            className="gap-1"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Media & Special */}
        <div className="flex gap-1">
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isImageLoading}
              className="gap-1"
              title="Insert Image"
              asChild
            >
              <label className="cursor-pointer">
                <ImageIcon className="w-4 h-4" />
                {isImageLoading && <span className="ml-1">...</span>}
              </label>
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isImageLoading}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const url = prompt('Enter URL:')
              if (url) execCommand('createLink', url)
            }}
            className="gap-1"
            title="Add Link"
          >
            <LinkIcon className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => execCommand('formatBlock', '<pre>')}
            className="gap-1"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        className="p-4 focus:outline-none prose prose-sm max-w-none w-full text-foreground"
        style={{ minHeight }}
        data-placeholder={placeholder}
      />
    </div>
  )
}
