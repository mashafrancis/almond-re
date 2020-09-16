const reportError = (error, info) => 
  // in a real app this would report an error
  // but this isn't a real app and is only here to be mocked.
   Promise.resolve({ success: true })
;

export default reportError;
