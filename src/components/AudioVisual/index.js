import getConfig from "next/config";
import dynamic from "next/dynamic";

const Sketch = dynamic(
  () =>
    import("react-p5").then((mod) => {
      window.myp5 = p5;
      require("p5/lib/addons/p5.sound.js");

      return mod.default;
    }),
  {
    ssr: false,
  }
);

export const AudioVisual = () => {
  const { publicRuntimeConfig } = getConfig();
  let myFont;
  const myText = "Happy Birthday Aika.";

  let sound;
  let amp;
  let index = 0;
  let OPACITY = 1.0;

  const preload = (p5) => {
    // 画像などのロードを行う
    const url =
      "https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Bold.otf";
    myFont = p5.loadFont(url);
    p5.soundFormats("mp3");
    sound = p5.loadSound(`${publicRuntimeConfig.urlPrefix}/audio.mp3`);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(
      canvasParentRef
    );
    p5.colorMode(p5.HSB, 100);
    p5.textFont(myFont);
    p5.textSize(30);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.frameRate(24);
    sound.play();
    amp = new myp5.Amplitude();
  };

  const drawText = (p5, textIndex) => {
    p5.push();
    for (let i = 0; i < 80; i++) {
      p5.fill(255, 200); // 色の追加
      p5.translate(
        10 * p5.sin(p5.frameCount * 0.1 + i),
        10 * p5.cos(p5.frameCount * 0.1 + i),
        50
      );

      p5.text(myText.charAt(textIndex), textIndex * 20 - 190, 0);

      p5.rotateX(p5.frameCount * 0.01);
      p5.rotateY(p5.frameCount * 0.01);
      p5.rotateZ(p5.frameCount * 0.01);
    }
    p5.pop();
  };

  const draw = (p5) => {
    const vol = amp.getLevel();
    // p5.background(20, 20, 45);
    p5.background(0);
    // p5.push();
    // for (let i = 0; i < 80; i++) {
    //   p5.fill(50, 55, 100); // 色の追加
    //   p5.translate(
    //     10 * p5.sin(p5.frameCount * 0.1 + i),
    //     10 * p5.cos(p5.frameCount * 0.1 + i),
    //     50
    //   );
    //   // p5.text("Happy Birthday Aika", 0, 0);
    //   // for (var j = 0; j < myText.length; j++) {

    //   // }
    //   p5.text(myText.charAt(0), 0, 0);

    //   theta += 1;

    //   p5.rotateX(p5.frameCount * 0.01);
    //   p5.rotateY(p5.frameCount * 0.01);
    //   p5.rotateZ(p5.frameCount * 0.01);
    // }
    // p5.pop();
    // p5.push();

    // for (let i = 0; i < myText.length; i++) {
    //   drawText(p5, i);
    // }

    if (vol > 0.315) {
      drawText(p5, index);
      index++;
    } else if (vol <= 0.1) {
      p5.fill(255, 200);
      p5.text("Happy Birthday Aika", 0, 0);
    }
    if (index >= myText.length) {
      index = 0;
    }
  };

  const windowResized = (p5) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <div>
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        windowResized={windowResized}
      />
    </div>
  );
};
