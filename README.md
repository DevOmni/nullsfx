# NullSFX

A easy to use lite weight script/lib to play sounds manually or when some even occurs

## Docs

### Creating NullSFX instance

```html
<body>
    <script src="https://raw.githubusercontent.com/DevOmni/nullsfx/main/dist/nullsfx.min.js"></script>
    <script type="text/javascript">
        const sfx_list = {
            "audio1": "path/to/file.mp3",
            "audio2": "/assets/sfx/boom.wav",
            "audio3": "/assets/sfx/hover/select.wav",
        }
        const sfxer = nullsfx(sfx_list);
    </script>
</body>
```

```txt
Note:
the key corresponding to each source path in sfx_list should not contain any 
space or any special symbol other than "_" & "-" and should strictly be in 
lower case.
```

### Juicy Stuff

```txt
Attribute: "nsfx"
    role: define audio to play on event
    syntax-ex1:
        nsfx="event1?audio1%vol;event2?audio2"    
    syntax-ex2:
        nsfx="keyevent!key?audio3%1;even2?audio1"
    syntax-ex3:
        nsfx="keypress?audio5%0.4"
    syntax-ex4:
        nsfx="keyup!f?audio3" (checks for key up event of key "f")

    note:
        1. In key events the specific to check for (the "key") should be from the
        values of event.key object 
        2. To set Volume of any audio specifically just put the amount of volume 
        between 1 to 0 (float) after %. If not set then default value will be 
        value of nsfx-vol and it is also not set then default volume is 1.
        example: nsfx="event?audio%0.6" or nsfx="event?audio%1"

Attribute: "nsfx-vol"
    role: to set volume of the all sounds on one element
    example: nsfx-vol="0.2"  or  nsfx-vol="1"
```

```html
<body nsfx="keydown!G?nani" nsfx-vol="0.4">
    <button nsfx="click?audio2" nsfx-vol="0.5">click me</button>
    <button nsfx="mousedown?audio1%0.2;mouseup?audio3" nsfx-vol="0.8">BOTH</button>
</body>
```
