import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import PageTitle from '../../components/PageTitle';

import { ALink, Block, Container, LinkWrapper, P, Wave, Separator } from './components';

const HomePage = ({ global: { plugins }, history: { push } }) => {
  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {title => <PageTitle title={title} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Block>
              <h1>Hello, you!</h1>
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
