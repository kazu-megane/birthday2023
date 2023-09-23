import clsx from "clsx";
import dynamic from "next/dynamic";
import p5Types from "p5";

type Props = {
  className?: string;
};

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

export const MainContent = ({ className }: Props) => {
  let myFont: p5Types.Font;
  const myText = "Happy Birthday Aika.";

  const preload = (p5: p5Types) => {
    // 画像などのロードを行う
    const url =
      "https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Bold.otf";
    myFont = p5.loadFont(url);
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(
      canvasParentRef
    );
    p5.colorMode(p5.HSB, 100);
    p5.textFont(myFont);
    p5.textSize(30);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.frameRate(24);
  };

  const drawText = (p5: p5Types, textIndex: number) => {
    p5.push();
    for (let i = 0; i < 80; i++) {
      p5.fill(50, 55, 100); // 色の追加
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

  const draw = (p5: p5Types) => {
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
    for (let i = 0; i < myText.length; i++) {
      drawText(p5, i);
    }
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <div className={clsx(className)}>
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        className={className}
        windowResized={windowResized}
      />
    </div>
  );
};
