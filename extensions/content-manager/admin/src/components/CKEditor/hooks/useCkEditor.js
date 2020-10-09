import React, { useRef, useState, useEffect } from 'react'

export default function useCKEditor () {
  const editorRef = useRef()
  const [isEditorLoaded, setIsEditorLoaded] = useState(false)
  const { CKEditor, BalloonEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react'),
      BalloonEditor: require('./../custom-build/build/ckeditor')
    }
    setIsEditorLoaded(true)
  }, [])

  return Object.freeze({
    isEditorLoaded,
    CKEditor,
    BalloonEditor
  })
}
