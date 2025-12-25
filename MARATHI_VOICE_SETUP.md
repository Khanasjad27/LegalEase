# Marathi Voice Functionality Setup Guide

## Overview
The NeuroX application includes full support for Marathi language voice synthesis. However, voice availability depends on your operating system and browser configuration.

## How to Enable Marathi Voice

### Windows 10/11
1. **Install Marathi Language Pack:**
   - Go to Settings → Time & Language → Language
   - Click "Add a language"
   - Search for and select "Marathi (मराठी)"
   - Click "Next" and complete installation
   - This may require downloading language files

2. **Verify Voice Installation:**
   - Settings → Time & Language → Speech
   - Check that Marathi voice appears in the "Voices" section
   - Download/install if available

3. **Browser Support:**
   - **Chrome**: Supports Windows voices natively ✅
   - **Edge**: Supports Windows voices natively ✅
   - **Firefox**: May require additional configuration
   - **Safari**: Uses system voices (if installed)

### macOS
1. **Install Marathi Voice:**
   - System Preferences → Sound & Haptics → Text to Speech
   - Click "System Voice" dropdown
   - Download Marathi voice if available
   - Or: System Settings → Accessibility → Spoken Content

2. **Browser Support:**
   - **Safari**: Best support for macOS voices ✅
   - **Chrome**: Good support for system voices
   - **Firefox**: May have limitations

### Linux
1. **Install TTS Engine:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install espeak-ng

   # Install Marathi language data (if available)
   sudo apt-get install espeak-ng-data
   ```

2. **Browser Support:**
   - **Chrome/Chromium**: Supports espeak-ng ✅
   - **Firefox**: Install espeak with proper configuration

### Fallback Behavior
If Marathi voice is not available on your system:
- ✅ The app will automatically fall back to **Hindi voice** (similar language)
- ✅ Or use the **nearest available India-region voice**
- ✅ Test voices using the "Test Voice" button in the chat interface

## Testing Marathi Voice

1. Navigate to the Legal AI Assistant chat
2. Change language to Marathi (मराठी) in the top navigation
3. Click "Test Voice" button to hear a sample in Marathi
4. The test will attempt to use available Marathi voices in order:
   - Marathi (mr-IN)
   - Hindi as fallback (hi-IN)
   - Other India-region voices

## Voice Selection Dropdown

The chatbot includes a voice selector that shows:
- All available voices on your system
- Voice name and language code
- Currently selected voice (for testing)

**Steps to use:**
1. Open the chat interface
2. Find the voice dropdown in the top-right section
3. Select your preferred voice from the list
4. Click "Test Voice" to preview
5. Use voice playback controls in chat messages to hear responses

## Marathi Language Support Status

- ✅ Full Marathi translations available
- ✅ Marathi text input support
- ✅ Voice synthesis enabled (system-dependent)
- ✅ Automatic fallback to Hindi if needed
- ✅ Voice selection UI for manual override

## Troubleshooting

### "No voices available" message
- Browser doesn't support speech synthesis
- Try a different browser (Chrome/Edge recommended)
- Update your browser to the latest version

### Marathi voice not in dropdown
- Install Marathi language on your operating system
- Refresh the browser page after installing OS language
- Browser will reload available system voices

### Audio not working
- Check browser microphone/audio permissions
- Ensure volume is not muted
- Try a different browser
- Clear browser cache and reload

### Wrong accent/pronunciation
- Select a different voice from the dropdown
- Fall back to Hindi voice (मराठी भाषा as fallback)
- Some system voices may have limitations

## Recommended Browser Configuration

**Best experience:**
- **Windows**: Chrome or Edge with Marathi language pack installed
- **macOS**: Safari with Marathi voice downloaded
- **Linux**: Chrome with espeak-ng properly configured

## Voice Quality Notes

The app optimizes speech synthesis for Indian languages:
- **Slower speech rate** (0.8) for better clarity in Hindi/Marathi
- **Slightly higher pitch** (1.1) for natural Indian accent
- **Full volume** for optimal audio output

These settings are automatically applied when speaking in Hindi or Marathi.

## API Implementation Details

For developers: Voice selection logic in `LegalChatbot.tsx`:
1. Attempts exact language-region match (e.g., mr-IN)
2. Searches for keyword matches (Marathi, मराठी, Google voices)
3. Falls back to Hindi for Marathi if unavailable
4. Uses any India-region voice as secondary fallback
5. Uses system default as final fallback

See `getBestVoiceForLanguage()` function for detailed logic.
