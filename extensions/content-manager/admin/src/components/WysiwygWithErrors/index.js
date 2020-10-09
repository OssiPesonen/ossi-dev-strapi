import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@buffetjs/core'
import { isEmpty } from 'lodash'
import { Label, InputDescription, InputErrors } from 'strapi-helper-plugin'
import Editor from '../CKEditor'
import MediaLib from '../MediaLib'

const WysiwygWithErrors = ({
  inputDescription,
  errors,
  label,
  name,
  noErrorsDescription,
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = data => {
    if (data.mime.includes('image')) {
      const imgTag = `<p><img src="${data.url}" caption="${data.caption}" alt="${data.alternativeText}"></img></p>`
      const newValue = value ? `${value}${imgTag}` : imgTag
      onChange({ target: { name, value: newValue } })
    }
  }

  const handleToggle = () => setIsOpen(prev => !prev)

  let spacer = !isEmpty(inputDescription) ? (<div style={{ height: '.4rem' }}/>) : <></>

  if (!noErrorsDescription && !isEmpty(errors)) {
    spacer = <div/>
  }

  return (
    <div style={{ marginBottom: '1.6rem' }}>
      <Label htmlFor={name} message={label} style={{ marginBottom: 10 }}/>
      <div style={{ marginBottom: '1rem' }}>
        <Button color="secondary" onClick={handleToggle}>
          Insert Media
        </Button>
      </div>
      <Editor name={name} onChange={onChange} value={value}/>
      <InputDescription
        message={inputDescription}
        style={!isEmpty(inputDescription) ? { marginTop: '1.4rem' } : {}}
      />
      <InputErrors
        errors={(!noErrorsDescription && errors) || []}
        name={name}
      />
      {spacer}
      <MediaLib onToggle={handleToggle} isOpen={isOpen} onChange={handleChange}/>
    </div>
  )
}

WysiwygWithErrors.defaultProps = {
  errors: [],
  label: '',
  noErrorsDescription: false,
}

WysiwygWithErrors.propTypes = {
  errors: PropTypes.array,
  inputDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  name: PropTypes.string.isRequired,
  noErrorsDescription: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default WysiwygWithErrors
