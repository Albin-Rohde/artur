import fs from 'fs';
import Jimp from 'jimp';
import isImage from './is-image';

const calcAvg = (arr: number[]) =>
  arr.reduce((acc, num) => acc + num, 0) / (arr.length - 1);

const predict = async (path: string): Promise<string | number> => {
  try {
    if (!fs.existsSync(path) && !isImage(path)) {
      return 2;
    }
    let color = '';
    const red: number[] = [];
    const green: number[] = [];
    const blue: number[] = [];

    const image = await Jimp.read(path);

    image.cover(
      224,
      224,
      Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
    );

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, _) => {
      const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
      red.push(pixel.r);
      green.push(pixel.g);
      blue.push(pixel.b);
    });

    const [redavg, greeenavg, blueavg] = await Promise.all([
      calcAvg(red),
      calcAvg(green),
      calcAvg(blue),
    ]);

    if (redavg > greeenavg && redavg > blueavg) {
      color = 'red';
    } else if (greeenavg > redavg && greeenavg > blueavg) {
      color = 'green';
    } else if (blueavg > redavg && blueavg > greeenavg) {
      color = 'blue';
    } else {
      return 1;
    }

    return color;
  } catch (error) {
    console.log(error);
    return 1;
  }
};

export { predict };
