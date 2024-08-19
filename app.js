import { createSSRApp } from 'vue';

export function createApp(context) {
  return createSSRApp({
    data: () => ({ message: context.message || ''}),
    template: `<p id='secret-word'>{{ message }}  </p>`,
  });
}

