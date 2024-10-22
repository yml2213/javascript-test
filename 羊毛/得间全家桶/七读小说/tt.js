// const zlib = require('zlib');
//
// const compressedData = Buffer.from('1F 8B 08 00 00 00 00 00 00 00 25 8F 5B 73 82 30 10 85 FF 4B 5E 6D C7 DC 08 4D 67 FA A2 63 A5 A2 54 AD 76 1C 4A A7 13 72 B1 28 08 0A B6 88 C3 7F 6F B0 4F 7B F6 CB EE C9 D9 2B 10 69 22 4A F0 08 B8 36 5C 23 A3 90 A4 8A 22 82 63 87 09 23 B5 23 F1 03 8C B1 36 E0 0E 28 51 09 3B F9 71 8D 40 75 29 74 04 1E D9 5D 74 A3 56 5A 88 21 A6 F7 10 DD 43 FA DF 2B 64 6B 37 1D 27 CA AA 08 20 EC 32 06 31 8F 80 DD 33 F9 29 13 D5 8D 37 17 5D 9C E3 1B AD 92 AC 33 C6 C4 EA 93 2E 57 FF FF 74 5A 58 8F F6 B3 6D DB 4F 1B A5 48 45 D5 19 BC 28 1B C8 81 88 39 CC D2 32 D9 1E 6C 3F 95 FA C0 39 CB FD DF 61 A1 63 3E 7B DB FE D0 FD 72 80 D9 3C A9 87 EB 50 BF CD BD 7D EA 87 C8 1F 8C 2E DF 97 BE 83 29 11 C1 AB AE BC 2A D8 F4 26 0A D5 7A 74 26 72 E3 0E 64 C8 17 FE 72 3A 0B E0 C4 4B 0F B0 09 8E 9B 71 3D 35 AE 7A 6E 56 EC 48 D3 7E FD 93 EB DF 30 9F AC B3 3E 6C DE F7 66 C2 3C AC 16 7E 93 19 D7 1F 3B BE A0 FB 9D 3B 7A E5 1E 2B B2 5E 3D 30 9B 74 2D F3 5E C8 E4 72 2E C7 CF C1 70 41 9F 6C EA EE E4 B2 12 59 61 A3 23 17 52 42 08 E5 84 C2 EE A2 73 A9 4F 5F 07 91 69 FB B6 43 2E E5 98 3A 8C 80 F6 0F 28 DE 19 81 B8 01 00 00'.split(' ').map(byte => parseInt(byte, 16)));
//
// const uncompressedData = zlib.gunzipSync(compressedData);
//
// const fs = require('fs');
// fs.writeFileSync('uncompressed_data.txt', uncompressedData);
//
// console.log('解压缩完成！');

const zlib = require('zlib');

const compressedData = Buffer.from('1F 8B 08 00 00 00 00 00 00 00 25 8F 5B 6F 82 40 10 85 FF CB BE 62 93 BD B1 B8 26 7D 68 7A C1 0B 8A 8A 1A 62 69 9A 45 16 B9 4B 60 D5 6A C3 7F EF 62 9F E6 CC 37 33 67 CF FE 02 51 A4 A2 05 23 C0 65 CC 25 8A 23 74 A0 11 45 04 87 26 13 F1 41 9A 07 3C 84 21 96 31 18 80 48 28 A1 37 3F 7F 03 A0 6E B5 0C C0 88 0D 82 07 D5 52 43 0C 31 7D 82 E8 09 D2 FF 3E 42 BA F6 DB 61 1A 69 15 00 84 2D C6 20 E6 01 D0 77 F1 A9 29 85 7A F0 FB 4D D6 E7 F0 41 55 5A F6 C6 64 A8 75 23 DB CD FF 3B BD 16 DA A3 FB EA BA EE 4B 47 A9 0B A1 7A 83 49 A4 03 99 10 31 93 69 DA A6 C7 4A F7 9B 9D F7 43 DA 5D 56 61 C7 08 C5 FE B5 61 7B BE CD 5A FC 73 B1 D3 38 4D BC 3C 74 DC 3A 2C D7 CA 80 6E 39 3B 9D 6E 95 E7 E7 4B 99 AF A7 D3 65 B1 BC 89 24 A9 4E D1 C7 61 8F D4 55 BD 14 AD 61 BD 88 85 A7 F2 E2 CA B8 EF 6E DD F9 6B 34 99 2A 7B E6 6D 2F 92 24 A6 B3 F1 FC 24 8F ED 71 B6 A0 EF 29 7F 1B 3B D7 8F FC EE ED 86 F7 C6 9D C3 B9 73 64 3E 5E 65 7C B2 AC 0C 3B 43 D5 CA 9F 27 66 B3 77 D4 1A 2F 86 93 67 9D BA FF 72 AB 44 59 EB E8 C8 82 94 10 C2 39 25 16 D4 B3 73 2B 9B EF 4A 94 52 CF 32 64 51 8E A9 C9 08 E8 FE 00 FF 3B A1 5E B8 01 00 00'.split(' ').map(byte => parseInt(byte, 16)));

const uncompressedData = zlib.gunzipSync(compressedData).toString();

console.log('解压缩完成！');
console.log(uncompressedData); // 输出解压后的数据
