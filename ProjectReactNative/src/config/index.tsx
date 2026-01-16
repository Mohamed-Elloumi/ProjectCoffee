import { Platform } from 'react-native';

// For Android emulator, localhost is 10.0.2.2
// For iOS/Physical device, use your machine's local IP (e.g., 192.168.1.XX)
export const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
export const API_URL = `${BASE_URL}/api`;
export const UPLOADS_URL = `${BASE_URL}/uploads`;
