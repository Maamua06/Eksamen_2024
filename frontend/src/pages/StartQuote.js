import { useEffect } from 'react';

// components
import styled from "styled-components";


import { useStartSide } from '../hooks/useStartside';

const Box = styled.div`
  border: 2px solid #333;
  padding: 20px;
  margin: 20px auto;
  background-color: #f0f0f0;
  border-radius: 8px;
  max-width: 600px;
  word-wrap: break-word;
`;

const BoxText = styled.p`
  font-size: 16px;
`;

const StartQuote = () => {
  const { startSide, quotes, isLoading, error } = useStartSide();

  useEffect(() => {
    startSide();
  }, []);

  return (
    <div className="blogs">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {quotes !== null && quotes.length > 0 && (
        <Box>
          <h4>{quotes[0]?.author}</h4>
          <BoxText>"{quotes[0]?.body}"</BoxText>
        </Box>
      )}
    </div>
  );
};

export default StartQuote;
