# NeuroX

Voice/TTS Notes
----------------

1. Browser voices vary by OS and browser. For best Indian-accent TTS on Windows, try Microsoft Edge or recent Chrome builds.

2. To list available voices in the browser console:

```js
window.speechSynthesis.getVoices().map(v => ({ name: v.name, lang: v.lang, uri: v.voiceURI }))
```

3. In the app, open the Legal AI Assistant and use the voice dropdown to pick a voice. Use the "Test Voice" button to play a sample phrase.

4. If your system lacks Hindi/Marathi voices, enable additional system voices (Windows: Settings → Time & Language → Speech → Manage voices) or try Edge which exposes more voices.

Optional: Cloud TTS (high-quality Indian voices)
------------------------------------------------

If you want guaranteed high-quality Indian accents, integrate a cloud TTS provider. Two options:

- Google Cloud Text-to-Speech (WaveNet)
- Azure Cognitive Services Speech (Neural)

You can implement a simple server endpoint that calls the provider and returns an audio blob. Store credentials on the server (never expose API keys to clients). Example env vars:

```
GOOGLE_TTS_KEY=your_google_api_key
AZURE_TTS_KEY=your_azure_key
AZURE_TTS_REGION=your_region
```

Minimal flow:
1. Frontend sends text and language to `/api/tts`.
2. Server reads secrets and requests audio from Google/Azure.
3. Server returns audio (base64 or stream) to the frontend.

I can add a supabase Edge Function or simple Express route for this if you want—tell me which provider and I'll implement it (you'll need to provide keys or set secrets in your hosting platform).
NeuroX