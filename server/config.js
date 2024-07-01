// config.js
process.emitWarning = (warning, name) => {
    if (name === 'DEP0040') return;
    console.warn(warning);
  };
  
  // other configuration options