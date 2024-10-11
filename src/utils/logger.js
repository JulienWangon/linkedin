import { logger } from 'react-native-logs';

// Set up the logger with different log levels
const config = {

  // Use 'debug' for development and 'silent' for production
  severity: __DEV__ ? 'debug' : 'silent', 
  transportOptions: {
    color: 'ansi', 
  },
};

// Create the logger instance
const log = logger.createLogger(config);

export default log;