import React from 'react';
import { isEmpty } from 'lodash';
import { Description, ErrorMessage, Label } from '@buffetjs/styles';
import { Error } from '@buffetjs/core';
import Editor from '../CKEditor';
import Wrapper from './Wrapper';
import cn from 'classnames';

class WysiwygWithErrors extends React.Component {

  render() {
    const {
      className,
      error: inputError,
      inputDescription,
      label,
      name,
      onChange,
      style,
      validations,
      value,
    } = this.props;

    return (
      <Error
        inputError={inputError}
        name={name}
        type="text"
        validations={validations}
      >
        {({ error }) => {
          const hasError = error && error !== null;

          return (
            <Wrapper
              className={`${cn(!isEmpty(className) && className)} ${
                hasError ? 'bordered' : ''
              }`}
              style={style}
            >
              <Label htmlFor={name}>{label}</Label>
              <Editor name={name} onChange={onChange} value={value} />
              {!hasError && inputDescription && (
                <Description>{inputDescription}</Description>
              )}
              {hasError && <ErrorMessage>{error}</ErrorMessage>}
            </Wrapper>
          )
        }}
      </Error>
    );
  }
}

export default WysiwygWithErrors;
