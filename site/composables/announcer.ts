import { nextTick } from 'vue';

export function useAnnouncer() {
  const message = useState('announcement', () => '');

  async function announce(text: string): Promise<void> {
    message.value = '';
    await nextTick();
    message.value = text;
  }

  return { message, announce };
}
