import zlib
import struct
import os

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

# Android Mipmaps
densities = {
    'mdpi': 48,
    'hdpi': 72,
    'xhdpi': 96,
    'xxhdpi': 144,
    'xxxhdpi': 192
}

base_res_path = 'android/app/src/main/res'

for density, size in densities.items():
    dir_path = os.path.join(base_res_path, f'mipmap-{density}')
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

    png_content = create_png(size, size, color)

    for filename in ['ic_launcher.png', 'ic_launcher_round.png']:
        file_path = os.path.join(dir_path, filename)
        with open(file_path, 'wb') as f:
            f.write(png_content)
        print(f'Generated {file_path} ({size}x{size})')

# Play Store Assets
playstore_path = 'android/app/src/main/playstore'
if not os.path.exists(playstore_path):
    os.makedirs(playstore_path)

# Play Store Icon: 512x512
ps_icon_content = create_png(512, 512, color)
ps_icon_path = os.path.join(playstore_path, 'icon.png')
with open(ps_icon_path, 'wb') as f:
    f.write(ps_icon_content)
print(f'Generated {ps_icon_path} (512x512)')

# Feature Graphic: 1024x500
fg_content = create_png(1024, 500, color)
fg_path = os.path.join(playstore_path, 'feature_graphic.png')
with open(fg_path, 'wb') as f:
    f.write(fg_content)
print(f'Generated {fg_path} (1024x500)')
