import zlib
import struct
import os
import json

def create_png(width, height, color):
    # PNG signature
    signature = b'\x89PNG\r\n\x1a\n'

    # IHDR chunk
    # Width: 4 bytes, Height: 4 bytes, Bit depth: 1 byte (8), Color type: 1 byte (2=RGB),
    # Compression: 1 byte (0), Filter: 1 byte (0), Interlace: 1 byte (0)
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr = b'IHDR' + ihdr_data
    ihdr_chunk = struct.pack('>I', len(ihdr_data)) + ihdr + struct.pack('>I', zlib.crc32(ihdr) & 0xffffffff)

    # IDAT chunk
    # Each row starts with a filter byte (0)
    row = b'\x00' + (struct.pack('BBB', *color) * width)
    data = row * height
    compressed_data = zlib.compress(data)
    idat = b'IDAT' + compressed_data
    idat_chunk = struct.pack('>I', len(compressed_data)) + idat + struct.pack('>I', zlib.crc32(idat) & 0xffffffff)

    # IEND chunk
    iend = b'IEND'
    iend_chunk = struct.pack('>I', 0) + iend + struct.pack('>I', zlib.crc32(iend) & 0xffffffff)

    return signature + ihdr_chunk + idat_chunk + iend_chunk

# Color: #49a078 -> (73, 160, 120)
color = (73, 160, 120)

# 1. Android Mipmaps
densities = {
    'mdpi': 48,
    'hdpi': 72,
    'xhdpi': 96,
    'xxhdpi': 144,
    'xxxhdpi': 192
}

base_path_android = 'android/app/src/main/res'

for density, size in densities.items():
    dir_path = os.path.join(base_path_android, f'mipmap-{density}')
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

    png_content = create_png(size, size, color)

    for filename in ['ic_launcher.png', 'ic_launcher_round.png']:
        file_path = os.path.join(dir_path, filename)
        with open(file_path, 'wb') as f:
            f.write(png_content)
        print(f'Generated {file_path} ({size}x{size})')

# 2. Android Play Store Assets
playstore_path = 'android/app/src/main/playstore'
if not os.path.exists(playstore_path):
    os.makedirs(playstore_path)

# App Icon 512x512
with open(os.path.join(playstore_path, 'icon.png'), 'wb') as f:
    f.write(create_png(512, 512, color))
print(f'Generated {playstore_path}/icon.png (512x512)')

# Feature Graphic 1024x500
with open(os.path.join(playstore_path, 'feature_graphic.png'), 'wb') as f:
    f.write(create_png(1024, 500, color))
print(f'Generated {playstore_path}/feature_graphic.png (1024x500)')

# 3. iOS AppIcon
ios_icon_path = 'ios/doIt/Images.xcassets/AppIcon.appiconset'
if not os.path.exists(ios_icon_path):
    os.makedirs(ios_icon_path)

ios_icons = [
    {"size": 20, "scales": [2, 3], "idiom": "iphone"},
    {"size": 29, "scales": [2, 3], "idiom": "iphone"},
    {"size": 40, "scales": [2, 3], "idiom": "iphone"},
    {"size": 60, "scales": [2, 3], "idiom": "iphone"},
    {"size": 1024, "scales": [1], "idiom": "ios-marketing"}
]

contents_images = []

for icon in ios_icons:
    for scale in icon["scales"]:
        px_size = int(icon["size"] * scale)
        filename = f"icon-{icon['size']}@{scale}x.png" if scale > 1 else f"icon-{icon['size']}.png"

        file_path = os.path.join(ios_icon_path, filename)
        with open(file_path, 'wb') as f:
            f.write(create_png(px_size, px_size, color))
        print(f'Generated {file_path} ({px_size}x{px_size})')

        contents_images.append({
            "size": f"{icon['size']}x{icon['size']}",
            "idiom": icon["idiom"],
            "filename": filename,
            "scale": f"{scale}x"
        })

contents = {
    "images": contents_images,
    "info": {
        "version": 1,
        "author": "xcode"
    }
}

with open(os.path.join(ios_icon_path, 'Contents.json'), 'w') as f:
    json.dump(contents, f, indent=2)
print(f'Updated {ios_icon_path}/Contents.json')
