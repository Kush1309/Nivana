import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loop cubes">
        <div className="item cubes" />
        <div className="item cubes" />
        <div className="item cubes" />
        <div className="item cubes" />
        <div className="item cubes" />
        <div className="item cubes" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cubes {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
  }

  .loop {
    transform: rotateX(-35deg) rotateY(-45deg) translateZ(1.5625em);
  }

  @keyframes s {
    to {
      transform: scale3d(0.2, 0.2, 0.2);
    }
  }

  .item {
    margin: -1.5625em;
    width: 3.125em;
    height: 3.125em;
    transform-origin: 50% 50% -1.5625em;
    box-shadow: 0 0 0.125em currentColor;
    background: currentColor;
    animation: s 0.6s cubic-bezier(0.45, 0.03, 0.51, 0.95) infinite alternate;
  }

  .item:before,
  .item:after {
    position: absolute;
    width: inherit;
    height: inherit;
    transform-origin: 0 100%;
    box-shadow: inherit;
    background: currentColor;
    content: "";
  }

  .item:before {
    bottom: 100%;
    transform: rotateX(90deg);
  }

  .item:after {
    left: 100%;
    transform: rotateY(90deg);
  }

  /* ------ NEW COLORS APPLIED HERE ------ */

  .item:nth-child(1) {
    margin-top: 6.25em;
    color: #F5F5DC; /* Beige */
    animation-delay: -1.2s;
  }
  .item:nth-child(1):before { color: #faf7e6; }
  .item:nth-child(1):after { color: #eee9c9; }

  .item:nth-child(2) {
    margin-top: 3.125em;
    color: #C8D5B9; /* Soft transition beige → green */
    animation-delay: -1s;
  }
  .item:nth-child(2):before { color: #dce4cf; }
  .item:nth-child(2):after { color: #b4c7a5; }

  .item:nth-child(3) {
    margin-top: 0em;
    color: #32CD32; /* Grass Green */
    animation-delay: -0.8s;
  }
  .item:nth-child(3):before { color: #6ee36e; }
  .item:nth-child(3):after { color: #2eb82e; }

  .item:nth-child(4) {
    margin-top: -3.125em;
    color: #2EAE2E; /* Slightly deeper grass green */
    animation-delay: -0.6s;
  }
  .item:nth-child(4):before { color: #55c755; }
  .item:nth-child(4):after { color: #249a24; }

  .item:nth-child(5) {
    margin-top: -6.25em;
    color: #008080; /* Teal Green */
    animation-delay: -0.4s;
  }
  .item:nth-child(5):before { color: #1a8f8f; }
  .item:nth-child(5):after { color: #006e6e; }

  .item:nth-child(6) {
    margin-top: -9.375em;
    color: #0a9396; /* Teal shade variant */
    animation-delay: -0.2s;
  }
  .item:nth-child(6):before { color: #3db7ba; }
  .item:nth-child(6):after { color: #08767a; }
`;

export default Loader;
