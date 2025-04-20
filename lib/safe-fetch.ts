import { toast } from 'sonner';

export interface SafeFetchOptions extends RequestInit {
  throwErrors?: boolean;
  fallback?: any;
  showToast?: boolean;
}

export async function safeFetch<T>(url: string, options: SafeFetchOptions = {}): Promise<T | null> {
  const {
    throwErrors = false,
    fallback = null,
    showToast = true,
    ...fetchOptions
  } = options;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    // Handle non-200 responses
    if (!response.ok) {
      const errorMessage = `HTTP error! status: ${response.status}`;
      if (showToast) {
        toast.error(`Failed to fetch data: ${response.statusText}`);
      }
      if (throwErrors) {
        throw new Error(errorMessage);
      }
      console.error(errorMessage);
      return fallback;
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      console.warn('Response is not JSON');
      return fallback;
    }

    // Get the response text first to check if it's empty
    const text = await response.text();
    if (!text) {
      console.warn('Empty response received');
      return fallback;
    }

    // Try to parse the JSON
    try {
      const data = JSON.parse(text);
      return data as T;
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      if (showToast) {
        toast.error('Failed to parse response data');
      }
      if (throwErrors) {
        throw parseError;
      }
      return fallback;
    }

  } catch (error) {
    // Handle network errors
    const errorMessage = error instanceof Error ? error.message : 'Network error';
    console.error('Fetch error:', errorMessage);
    
    if (showToast) {
      toast.error('Failed to connect to server');
    }
    
    if (throwErrors) {
      throw error;
    }
    
    return fallback;
  }
}