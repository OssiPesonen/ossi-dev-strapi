import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@buffetjs/styles';

// Media library
import MediaLibrary from './MediaLibrary';

// CKEditor
import './ck-editor.css';

const ClassicEditor = require('./module/build/ckeditor');
import { CKEditor } from '@ckeditor/ckeditor5-react';

const Editor = ({ onChange, name, value }) => {
// Media library
const [isMediaLibOpen, toggleMediaLibOpen] = useState(false);
// Editor instance
const [editorRef, setEditorRef] = useState(null);

/**
 * Toggle media library on
 */
const toggleMediaLib = () => {
  toggleMediaLibOpen(!isMediaLibOpen);
};

/**
 * When ever the onChange event in MediaLib fires,
 * all selected image data is passed here and
 * we have to append it to the editor
 *
 * @param data
 */
const addImageCallback = (data) => {
  for (const image of data) {
    // Grab cursor position
    let position = editorRef.model.document.selection.getFirstPosition();

    // Create the image element
    const htmlString = `<img src="${image.url}" alt="${image.alt}">`;

    // Create a model for the image (ckeditor stuff)
    const htmlDP = editorRef.data.processor;
    const viewFragment = htmlDP.toView(htmlString);
    const modelFragment = editorRef.data.toModel(viewFragment);

    // Add to content
    editorRef.model.insertContent(modelFragment, position);
  }
};

  // Editor configuration
  const configuration = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'code',
        '|',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'alignment',
        'indent',
        'outdent',
        'horizontalLine',
        '|',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        '|',
        'codeBlock'
      ]
    },
    language: 'en',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:full',
        'imageStyle:side',
        'linkImage'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    },
  };

  return (
    <>
      <Button type="button" onClick={toggleMediaLib} style={{ marginBottom: '0.5rem' }}>Media Library</Button>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={configuration}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
        onReady={editor => setEditorRef(editor)}
      />
      <MediaLibrary isOpen={isMediaLibOpen} onToggle={toggleMediaLib} onChange={addImageCallback}
      />
    </>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;