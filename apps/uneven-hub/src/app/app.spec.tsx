import { render } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: async () => ({ data: [], error: null }),
      }),
    }),
    storage: {
      from: () => ({
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      }),
    },
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => undefined } },
      }),
    },
  },
}));

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
