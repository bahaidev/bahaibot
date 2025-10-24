declare module 'discord-tts' {
  const getVoiceStream: (str: string, opts?: {
    lang: string
  }) => PassThrough
}
