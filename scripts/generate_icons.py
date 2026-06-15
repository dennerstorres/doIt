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
brand_color = (73, 160, 120)

# --- Android Icons ---
android_densities = {
    'mdpi': 48,
    'hdpi': 72,
    'xhdpi': 96,
    'xxhdpi': 144,
    'xxxhdpi': 192
}

android_base_path = 'android/app/src/main/res'

for density, size in android_densities.items():
    dir_path = os.path.join(android_base_path, f'mipmap-{density}')
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

    png_content = create_png(size, size, brand_color)

    for filename in ['ic_launcher.png', 'ic_launcher_round.png']:
        file_path = os.path.join(dir_path, filename)
        with open(file_path, 'wb') as f:
            f.write(png_content)
        print(f'Generated Android {file_path} ({size}x{size})')

# --- iOS Icons ---
ios_icon_path = 'ios/doIt/Images.xcassets/AppIcon.appiconset'
if not os.path.exists(ios_icon_path):
    os.makedirs(ios_icon_path)

# Standard iOS Icon Sizes and configurations
ios_icons = [
    {"size": 20, "scales": [2, 3], "idiom": "iphone", "usage": "notification"},
    {"size": 29, "scales": [2, 3], "idiom": "iphone", "usage": "settings"},
    {"size": 40, "scales": [2, 3], "idiom": "iphone", "usage": "spotlight"},
    {"size": 60, "scales": [2, 3], "idiom": "iphone", "usage": "app"},
    {"size": 1024, "scales": [1], "idiom": "ios-marketing", "usage": "marketing"}
]

contents_images = []

for icon in ios_icons:
    size_val = icon["size"]
    for scale in icon["scales"]:
        pixel_size = int(size_val * scale)
        filename = f"icon-{size_val}x{size_val}@{scale}x.png" if scale > 1 else f"icon-{size_val}x{size_val}.png"

        file_path = os.path.join(ios_icon_path, filename)
        png_content = create_png(pixel_size, pixel_size, brand_color)
        with open(file_path, 'wb') as f:
            f.write(png_content)
        print(f'Generated iOS {file_path} ({pixel_size}x{pixel_size})')

        contents_images.append({
            "size": f"{size_val}x{size_val}",
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
print(f'Updated {os.path.join(ios_icon_path, "Contents.json")}')
