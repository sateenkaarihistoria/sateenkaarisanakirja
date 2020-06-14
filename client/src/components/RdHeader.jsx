import React from 'react';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const MainStructure = ({ className }) => {
  return (
    <div className={className}>
      <Header className="header" as="h1">
        SATEENKAARIHISTORIAN HAKUSANAKIRJA
      </Header>
    </div>
  );
};

const RdHeader = styled(MainStructure)`
  .header {
    position: relative;
    top: 50%;
    left: 0;
    transform: translateY(40%);

    padding-top: 1rem;
    padding-bottom: 4rem;
    margin: 0;
    color: ${({ theme }) => theme.palette.primary.dark};
    text-align: center;
  }
`;

MainStructure.propTypes = {
  className: PropTypes.string,
};

export default RdHeader;
