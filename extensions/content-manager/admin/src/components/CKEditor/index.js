import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useCKEditor from './hooks/useCkEditor'
import { editorConfig } from './editorConfig'

const Wrapper = styled.div`
    .ck-content {
        font-family: "Fira Sans", sans-serif, arial, verdana;
        font-size: 16px;
        line-height: 1.8;

        &.ck-focused {
            box-shadow: none !important;
        }

        p {
            line-height: 1.8;
            padding-bottom: 1.5rem;
        }

        h2, h3, h4 {
            font-family: "Poppins", sans-serif, arial, verdana;
            font-weight: 500;
            margin-bottom: 1.5rem;
            line-height: 1.3;
       }

       h2 {
         font-size: 2.2rem;
       }

       h3 {
         font-size: 1.8rem;
       }

       h4 {
        font-size: 1.5rem;
       }
    }
`

const Editor = ({ onChange, name, value }) => {
  const { CKEditor, BalloonEditor, isEditorLoaded } = useCKEditor()
  const [editorState, setEditorState] = useState('')
  const [isEntryLoaded, setEntryloaded] = useState(false)

  /**
   * Set editor content once entry is ready
   */
  useEffect(() => {
    if (value) {
      setEditorState(value)
      setEntryloaded(true)
    }
  }, [value])

  return (
    <Wrapper className="ck-editor">
      {isEditorLoaded && isEntryLoaded ? (
        <CKEditor
          config={editorConfig}
          editor={BalloonEditor}
          data={editorState}
          onChange={(event, editor) => {
            const data = editor.getData()
            onChange({ target: { name, value: data } })
          }}
        />
      ) : ''}
    </Wrapper>
  )
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Editor
