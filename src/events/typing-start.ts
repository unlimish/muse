import {TextChannel, User} from 'discord.js';
import Settings from '../models/settings';

const TYPING_DURATION_THRESHOLD = 2000;

export default async (channel: TextChannel, user: User): Promise<void> => {
  const settings = await Settings.findByPk(channel.guild.id);

  if (!settings || channel.id !== settings.channel) {
    return;
  }

  console.log(channel.id, user, user.typingIn(channel.id));

  setTimeout(() => {
    console.log((channel as any)._typing);
  }, 3000);

  const typingInterval = setInterval(async () => {
    const duration = user.typingDurationIn(channel.id);

    console.log(duration);

    if (duration >= TYPING_DURATION_THRESHOLD) {
      clearInterval(typingInterval);
      await channel.send('c\'mon, spit it out');
    } else if (duration === -1) {
      // Cancel check
      clearInterval(typingInterval);
    }
  }, 500);
};
