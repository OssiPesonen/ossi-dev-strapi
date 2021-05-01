import styled from 'styled-components';

const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  display: flex;
  overflow-x: hidden;
  p,
  span {
    font-family: 'Inter', -apple-system, sans-serif;
  }
  
  .adminPageRightWrapper {
    width: ${props => `calc(100% - ${props.theme.main.sizes.leftMenu.width})`};
  }
`;

Wrapper.defaultProps = {
  theme: {
    main: {
      sizes: {
        leftMenu: {},
      },
    },
  },
};

export default Wrapper;
