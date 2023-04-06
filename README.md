# Meltotron

![Meltotron](https://raw.githubusercontent.com/tcodej/meltotron/main/preset/preview.png)

A simple web interface to generate XML for my Meltotron [DecentSampler](https://www.decentsamples.com/) preset.

I don't expect anyone other than myself to find this useful. And I'll only find it useful again if I discover a new Mellotron sample pack that I want to add.

See [DecentSampler developer resources](https://www.decentsamples.com/decent-sampler-developer-resources/) for more information.

I used samples found freely on the web, but had to [rename](https://www.advancedrenamer.com/) the files to suit my needs. Use as you see fit.

[Leisureland](http://www.leisureland.us/mellotron.htm)  
[Sonic Bloom](https://sonicbloom.net/en/free-sb-mellotron-samples/)  
[Sinewave Lab Kontakt Library](https://sinewavelab.com/products/free-mellotron-library-for-kontakt/)

This is formatted for Windows directories. I haven't tested for any other platforms, but I imagine replacing `\\` with `/` would do the trick.

The expected directory format is:

```
DecentSampler
+-- Meltotron
    +-- Samples
        +-- Brass
        |   +-- Trumpet
        |       +--- G2.wav
        |       +--- G#2.wav
        |       +--- ...
        |       +--- F5.wav
        +-- Woodwinds
            +-- Flute
                +-- G2.wav
                +-- G#2.wav
                +-- ...
                +-- F5.wav
