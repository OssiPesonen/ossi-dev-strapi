export const editorConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'link',
      'codeBlock',
      'code',
      'bulletedList',
      'numberedList',
      '|',
      'alignment',
      'indent',
      'outdent',
      'horizontalLine',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ]
  },
  link: {
    decorators: {
      isExternal: {
        mode: 'manual',
        label: 'Open in a new tab',
        attributes: {
          target: '_blank'
        }
      }
    }
  },
  image: {
    toolbar: [
      'imageTextAlternative',
      'imageStyle:full',
      'imageStyle:side'
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
}
