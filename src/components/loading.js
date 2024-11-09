import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <svg width="100%" height={100} viewBox="-1 -1 22 22">
          <path style={{"--order": 7}} className="eight e-8" />
          <path style={{"--order": 6}} className="eight e-7" />
          <path style={{"--order": 5}} className="eight e-6" />
          <path style={{"--order": 4}} className="eight e-5" />
          <path style={{"--order": 3}} className="eight e-4" />
          <path style={{"--order": 2}} className="eight e-3" />
          <path style={{"--order": 1}} className="eight e-2" />
          <path style={{"--order": 0}} className="eight e-1" />
        </svg>
        <h3>Loading...</h3>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }

  .container svg {
    --spin-duration: 2000ms;
    --infinity-duration: 2000ms;
    --hsl-base-h: 5deg;
    --hsl-base-s: 70%;
    --hsl-base-l: 50%;
    animation: spin81213 var(--spin-duration) linear infinite;
  }

  .eight {
    --eight-length-px: 60.84563446044922px;
   /* As seen on getTotalLength */
    --offset: calc(var(--order) * 5px);
    animation: infinity8123 var(--infinity-duration) linear infinite;
    d: path("m5 5a1 1 0 0110 0c0 4-10 6-10 10a1 1 0 0010 0c0-4-10-6-10-10");
    fill: none;
    stroke: hsl(calc(var(--hsl-base-h) * var(--order)) var(--hsl-base-s) var(--hsl-base-l));
    stroke-dasharray: 6px calc(var(--eight-length-px) - 6px);
    stroke-linecap: round;
    stroke-width: calc(1 - var(--order) / 10);
  }

  @keyframes infinity8123 {
    0% {
      stroke-dashoffset: calc(var(--eight-length-px) + var(--offset));
    }

    100% {
      stroke-dashoffset: var(--offset);
    }
  }

  @keyframes spin81213 {
    0% {
      transform: rotate(0)
    }

    100% {
      transform: rotate(360deg)
    }
  }`;

export default Loader;
