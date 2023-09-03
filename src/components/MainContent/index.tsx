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
  const preload = (p5: p5Types) => {
    // 画像などのロードを行う
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  let x = 50;
  const y = 50;

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x++;
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
