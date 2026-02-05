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
  const [isCodeMode, setIsCodeMode] = useState(false)

  const execCommand = (command: string, arg?: string) => {
    document.execCommand(command, false, arg)
    editorRef.current?.focus()
    updateContent()
  }

  // Initialize editor content only once on mount
  useEffect(() => {
    if (editorRef.current && value && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value
    }
  }, [])

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    setIsImageLoading(true)
    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imgSrc = event.target?.result as string
        // Create image element and insert
        const img = document.createElement('img')
        img.src = imgSrc
        img.style.maxWidth = '100%'
        img.style.height = 'auto'
        img.style.borderRadius = '8px'
        img.style.marginTop = '12px'
        img.style.marginBottom = '12px'
        
        const selection = window.getSelection()
        if (selection?.rangeCount) {
          const range = selection.getRangeAt(0)
          range.insertNode(img)
          updateContent()
        }
      }
      reader.readAsDataURL(file)
    } finally {
      setIsImageLoading(false)
    }
  }

  const handleH1Click = () => {
    document.execCommand('formatBlock', false, '<h1>')
    editorRef.current?.focus()
    updateContent()
  }

  const handleH2Click = () => {
    document.execCommand('formatBlock', false, '<h2>')
    editorRef.current?.focus()
    updateContent()
  }

  const handleBulletClick = () => {
    document.execCommand('insertUnorderedList', false)
    editorRef.current?.focus()
    updateContent()
  }

  const handleNumberedClick = () => {
    document.execCommand('insertOrderedList', false)
    editorRef.current?.focus()
    updateContent()
  }

  const handleLinkClick = () => {
    const url = prompt('Enter URL (e.g., https://example.com):')
    if (url) {
      // Check if URL has protocol
      const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url
      document.execCommand('createLink', false, fullUrl)
      editorRef.current?.focus()
      updateContent()
    }
  }

  const handleCodeToggle = () => {
    if (isCodeMode) {
      // Exit code mode - HTML should display as content
      setIsCodeMode(false)
      editorRef.current?.focus()
    } else {
      // Enter code mode - wrap content in pre/code tags
      const selection = window.getSelection()
      const selectedText = selection?.toString() || ''
      
      if (selectedText) {
        document.execCommand('formatBlock', false, '<pre>')
        updateContent()
      }
      setIsCodeMode(true)
    }
  }

  const handleInput = () => {
    updateContent()
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, text)
    updateContent()
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
            onClick={handleH1Click}
            className="gap-1"
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleH2Click}
            className="gap-1"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleBulletClick}
            className="gap-1"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleNumberedClick}
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
            onClick={handleLinkClick}
            className="gap-1"
            title="Add Link"
          >
            <LinkIcon className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant={isCodeMode ? 'default' : 'outline'}
            size="sm"
            onClick={handleCodeToggle}
            className="gap-1"
            title={isCodeMode ? 'Exit Code Mode' : 'Code Block'}
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
        className="p-4 focus:outline-none max-w-none w-full text-foreground overflow-auto"
        style={{ minHeight }}
        data-placeholder={placeholder}
      />
      
      {/* Prose styling for proper rendering */}
      <style jsx>{`
        [contenteditable] {
          font-family: inherit;
          font-size: 14px;
          line-height: 1.6;
        }
        [contenteditable] h1 {
          font-size: 32px;
          font-weight: bold;
          margin: 16px 0 12px 0;
        }
        [contenteditable] h2 {
          font-size: 24px;
          font-weight: bold;
          margin: 14px 0 10px 0;
        }
        [contenteditable] ul {
          margin: 12px 0;
          padding-left: 20px;
          list-style-type: disc;
        }
        [contenteditable] ol {
          margin: 12px 0;
          padding-left: 20px;
          list-style-type: decimal;
        }
        [contenteditable] li {
          margin: 4px 0;
        }
        [contenteditable] a {
          color: hsl(var(--primary));
          text-decoration: underline;
          cursor: pointer;
        }
        [contenteditable] pre {
          background-color: var(--muted);
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;
          margin: 12px 0;
          font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
          font-size: 13px;
        }
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 12px 0;
        }
      `}</style>
    </div>
  )
}
