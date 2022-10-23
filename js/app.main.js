const app = {};

app.main = (function() {
    'use strict';
    const
        silence = { name: "Off", sample: '<sample path="Samples\\Other\\Silence.wav" />'},
        groups = [
            // woodwinds, keys
            {
                name: 'A',
                patches: [
                    silence,
                    { name: "Flute", path: "Woodwinds\\Flute" },
                    { name: "Flute Chamberlin", path: "Woodwinds\\Flute-Chmb" },
                    { name: "Clarinet", path: "Woodwinds\\Clarinet" },
                    { name: "Alto Sax", path: "Woodwinds\\Alto-Sax" },
                    { name: "Tenor Sax", path: "Woodwinds\\Tenor-Sax" },
                    { name: "Tenor Sax Chamberlin", path: "Woodwinds\\Tenor-Sax-Chmb", range: { start: 44, end: 77 } },
                    { name: "Tenor &amp; Alto Sax", path: "Woodwinds\\Tenor-Alto-Sax" },
                    { name: "Oboe", path: "Woodwinds\\Oboe", range: { start: 46, end: 77 } },
                    { name: "Bassoon", path: "Woodwinds\\Bassoon" },
                    { name: "Woodwinds II", path: "Woodwinds\\Woodwind-2" },
                    { name: "Organ", path: "Keys\\Church-Organ" },
                    { name: "Pipe Organ", path: "Keys\\Church-Pipe-Organ" },
                    { name: "Accordion", path: "Keys\\Italian-Accordion" },
                    { name: "Vibes", path: "Keys\\Vibes" }
                ]
            },
            // strings, voice
            {
                name: 'B',
                patches: [
                    silence,
                    { name: "16 Violins", path: "Strings\\Violins" },
                    { name: "Viola", path: "Strings\\Viola" },
                    { name: "Cello", path: "Strings\\Cello" },
                    { name: "Cello Chamberlin", path: "Strings\\Cello-Chmb" },
                    { name: 'Split Cello &amp; Viola', path: 'Strings\\300-Strings', range: { start: 45, end: 96 }},
                    { name: "Mixed Strings", path: "Strings\\Mixed-Strings" },
                    { name: "Strings Brass", path: "Strings\\Strings-Brass" },
                    { name: "M300 Strings A", path: "Strings\\M300A" },
                    { name: "M300 Strings B", path: "Strings\\M300B" },
                    { name: "Guitar", path: "Strings\\Guitar" },
                    { name: "8 Voice Choir", path: "Voices\\8-Choir" },
                    { name: "Combined Choir", path: "Voices\\Combined-Choir" },
                    { name: "Female Voice", path: "Voices\\Female", range: { start: 48, end: 72 }},
                    { name: "Male Voice", path: "Voices\\Male" },
                    { name: "Boys Choir", path: "Voices\\Boys-Choir" }
                ]
            },
            // brass, other
            {
                name: 'C',
                patches: [
                    silence,
                    { name: "Trumpet", path: "Brass\\Trumpet" },
                    { name: "Trombone", path: "Brass\\Trombone" },
                    { name: "Trombone Chamberlin", path: "Brass\\Trombone-Chmb" },
                    { name: "Trombone &amp; Trumpet", path: "Brass\\Trombone-Trumpet" },
                    { name: "Mixed Brass", path: "Brass\\Mixed-Brass-B" },
                    { name: "Mixed Brass MkII", path: "Brass\\Mixed-Brass-MkII" },
                    { name: "GC 3 Brass", path: "Brass\\GC3-Brass" },
                    { name: "Bossa Nova", path: "Other\\Bossa-Nova" },
                    { name: "Cha Cha", path: "Other\\Cha-Cha" },
                    { name: "Dixie &amp; Trombone", path: "Other\\Dixie-Trombone" },
                    { name: "Foxtrot &amp; Saxophone", path: "Other\\Foxtrot-Sax" },
                    { name: "Jazz &amp; Strings", path: "Other\\Jazz-Strings" },
                    { name: "Gong", sample: '<sample path="Samples\\Other\\Gong\\Gong.wav" loNote="40" hiNote="77" rootNote="60" />'},
                    { name: "Bungalow Bill", sample: '<sample path="Samples\\Other\\Bungalow-Bill\\Bill.wav" loNote="40" hiNote="77" rootNote="64" />'},
                    { name: "Test Saw", path: "Other\\Test-Saw", range: { start: 48, end: 60 }}
                ]
            }
        ],
        defaultRange = { start: 43, end: 77 },
        notes = ['C-1','C#-1','D-1','D#-1','E-1','F-1','F#-1','G-1','G#-1','A-1','A#-1','B-1','C0','C#0','D0','D#0','E0','F0','F#0','G0','G#0','A0','A#0','B0','C1','C#1','D1','D#1','E1','F1','F#1','G1','G#1','A1','A#1','B1','C2','C#2','D2','D#2','E2','F2','F#2','G2','G#2','A2','A#2','B2','C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3','C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5','C6','C#6','D6','D#6','E6','F6','F#6','G6','G#6','A6','A#6','B6','C7','C#7','D7','D#7','E7','F7','F#7','G7','G#7','A7','A#7','B7','C8','C#8','D8','D#8','E8','F8','F#8','G8','G#8','A8','A#8','B8','C9','C#9','D9','D#9','E9','F9','F#9','G9'],
        templates = {
            menu: {
                open: '<menu x="%1" y="%2" width="%3" height="%4" requireSelection="false" placeholderText="%5" value="2">',
                close: '</menu>'
            },
            option: {
                open: '<option name="%s">',
                close: '</option>'
            },
            binding: '<binding type="general" level="group" position="%1" parameter="ENABLED" translation="fixed_value" translationValue="%2" />',
            group: {
                open: '<group name="%s">',
                close: '</group>'
            },
            sample: '<sample path="%1" loNote="%2" hiNote="%3" rootNote="%3" tags="%4" />'
        },
        xml = {
            options: [],
            groups: []
        },
        menuPos = {
            x: 22,
            y: 75,
            width: 225,
            height: 30,
            margin: 5
        },
        self = {
            
        /**
         * Initialize this module
         */  
        init: function() {
            self.populateMenu();
            self.populateGroups();
            self.render();
        },

        populateMenu: function() {
            let patches,
                groupIdx = 0,
                i, j, val, binding;

            groups.forEach(function(group, idx) {
                patches = group.patches;
                xml.options.push(self.strReplace(templates.menu.open, [menuPos.x, menuPos.y + (idx * (menuPos.height + menuPos.margin)), menuPos.width, menuPos.height, group.name]));

                for (i=0; i<patches.length; i++) {
                    xml.options.push(self.strReplace(templates.option.open, patches[i].name));

                    for (j=0; j<patches.length; j++) {
                        val = j == i ? true : false;

                        if (patches[i].name == 'Off') {
                            val = false;
                        }

                        binding = self.strReplace(templates.binding, [j+groupIdx, val]);
                        xml.options.push(binding);
                    }

                    xml.options.push(templates.option.close);
                };

                xml.options.push(templates.menu.close);
                groupIdx += patches.length;
           });
        },

        populateGroups: function() {
            let patches, midiNote, i, sample, lowNote,
                transpose = false;

            groups.forEach(function(group) {
                patches = group.patches;

                patches.forEach(function(patch) {
                    if (!patch.range) {
                        patch.range = defaultRange;
                        transpose = true;
                    }

                    if (!patch.path) {
                        patch.path = "Keys\\Vibes";
                    }

                    midiNote = patch.range.start;
                    xml.groups.push(self.strReplace(templates.group.open, patch.name));

                    // for scaled single wav patches
                    if (patch.sample) {
                        xml.groups.push(patch.sample);

                    } else {
                        for (i=patch.range.start; i<=patch.range.end; i++) {
                            // transpose the first sample down to F2 for default ranges
                            if (transpose) {
                                lowNote = midiNote - 2;
                                transpose = false;

                            } else {
                                lowNote = midiNote;
                            }

                            sample = self.strReplace(templates.sample, [self.getPath(patch.path) + notes[i] +'.wav', lowNote, midiNote, group.name]);
                            midiNote++;
                            xml.groups.push(sample);
                        }
                    }

                    xml.groups.push(templates.group.close);
                });
            });
        },

        /**
         * Helper to replace %s with the provided string.
         */
        strReplace: function(str, repl) {
            let i, re;

            try {
                if (Array.isArray(repl)) {
                    // check for format %1, %2, etc.
                    // todo: can't use both %s and %1
                    if (str.indexOf('%1') > -1) {
                        for (i=0; i<repl.length; i++) {
                            re = new RegExp('%'+ (i+1), 'g');
                            str = str.replace(re, repl[i]);
                        }

                    } else {
                        for (i=0; i<repl.length; i++) {
                            str = str.replace(/%s/, repl[i]);
                        }
                    }

                } else {
                    str = str.replace(/%s/g, repl);
                }
            } catch(e) {
                str = '';
            }
            return str;
        },

        getPath: function(shortPath) {
            return 'Samples\\'+ shortPath +'\\';
        },

        render: function() {
            const xmlOptions = document.getElementById('xml-options');
            xmlOptions.value = xml.options.join('\n');

            const xmlGroups = document.getElementById('xml-groups');
            xmlGroups.value = xml.groups.join('\n');
        }
    };

    return self;
})();

app.main.init();
