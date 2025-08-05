import '@testing-library/jest-dom';


const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (
        args[0].includes('MUI Grid: The `xs` prop has been removed.') ||
        args[0].includes('MUI Grid: The `md` prop has been removed.') ||
        args[0].includes('MUI Grid: The `item` prop has been removed.') ||
        args[0].includes('React Router Future Flag Warning')
      )
    ) {
      return;
    }
    originalWarn(...args);
  };
});


afterAll(() => {
  console.warn = originalWarn;
});



