# Quick Start: Using Marathi Voice in NeuroX

## Immediate Steps to Enable Marathi Voice

### 1. **Update Your System (Recommended)**

**Windows 10/11:**
- Settings → Time & Language → Language
- Click "Add a language" → Search "Marathi (मराठी)"
- Select and click "Next" → Download language pack
- Settings → Time & Language → Speech → Download Marathi voice

**macOS:**
- System Preferences → Sound & Haptics → Text to Speech
- Click dropdown next to "System Voice" → Download Marathi voice
- Or: System Settings → Accessibility → Spoken Content

**Linux:**
```bash
sudo apt-get install espeak-ng
```

### 2. **Use the App**

1. Open the NeuroX app
2. Click language selector (top-right) → Select **Marathi (मराठी)**
3. Navigate to **"Get Legal Help"** → Chat section
4. Voice selector appears in top-right of chat
5. Click **"Test"** button to hear Marathi voice sample
6. Chat normally - responses will play in Marathi voice!

### 3. **Manual Voice Selection** (if needed)

If auto-selection doesn't pick Marathi:
1. Open voice dropdown in chat
2. Look for **⭐ Marathi (mr-IN)** option
3. Or select **Hindi (hi-IN)** as fallback (similar language)
4. Click Test button to verify
5. Use dropdown to select different voice

## Troubleshooting

| Problem | Solution |
|---------|----------|
| No voices in dropdown | Refresh page after installing OS language |
| Only English voice shows | Install Marathi language on system |
| Wrong accent | Select different voice from dropdown (try Hindi) |
| No audio | Check browser volume, microphone permissions |
| Still not working | Try Chrome or Edge browser, or refresh system |

## Voice Quality Tips

- **Slower playback**: App automatically slows Marathi speech for clarity
- **Pitch adjusted**: Higher pitch (1.1x) for natural Indian accent
- **Full volume**: Audio plays at maximum safe volume

## Features

✅ **Automatic Marathi Detection** - Switches voice when you select Marathi language
✅ **Hindi Fallback** - Uses Hindi voice if Marathi unavailable
✅ **Manual Selection** - Choose any available voice via dropdown
✅ **Test Voice** - Hear sample text before chatting
✅ **Play/Pause Controls** - Control audio playback in chat messages
✅ **Smart Recommendations** - Dropdown marks best voices with ⭐

## Debugging

Open browser Developer Console (F12):
- Shows loaded system voices
- Shows selected voice for current language
- Shows any errors or warnings
- Helps diagnose voice issues

## Still Not Working?

Try these in order:
1. Refresh the page (Ctrl+R or Cmd+R)
2. Check system voice settings are installed
3. Try different browser (Chrome/Edge best)
4. Select manually from voice dropdown
5. Fall back to English or Hindi

## For Developers

See detailed implementation in:
- [MARATHI_VOICE_IMPLEMENTATION.md](./MARATHI_VOICE_IMPLEMENTATION.md) - Technical details
- [MARATHI_VOICE_SETUP.md](./MARATHI_VOICE_SETUP.md) - Platform-specific guides
- [src/components/LegalChatbot.tsx](./src/components/LegalChatbot.tsx) - Source code

Happy chatting in Marathi! 🇮🇳
