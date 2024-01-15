import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

const WebGLRenderer = ({ data, image }) => {
  const containerRef = useRef(null);
  const appRef = useRef();

  const imageRenderer = (app) => {
    // Draw background image
    const backgroundTexture = PIXI.Texture.from(image);
    const background = new PIXI.Sprite(backgroundTexture);
    background.width = app.view.width;
    background.height = app.view.height;
    app.stage.addChild(background);
  };

  const maskRenderer = (app) => {
    // Draw a rounded rectangle
    const overlap = new PIXI.Graphics();
    overlap.beginFill("#000", 0.5);
    overlap.drawRoundedRect(0, 0, 1088, 284, 60); // x, y, width, height, radius
    overlap.x = 56;
    overlap.y = 1259;
    overlap.endFill();
    app.stage.addChild(overlap);

    // Draw circle shape which contains a icon
    const circleFigure = new PIXI.Graphics();
    circleFigure.beginFill("#111827", 1);
    circleFigure.drawCircle(0, 0, 86); // x, y, radius
    circleFigure.x = circleFigure.width / 2 + 56;
    circleFigure.y = overlap.height / 2;
    circleFigure.endFill();
    overlap.addChild(circleFigure);

    // Draw icon into circle
    const iconTexture = PIXI.Texture.from("svg/figure.run.svg");
    iconTexture.baseTexture.on("loaded", () => {
      let sprite = PIXI.Sprite.from(iconTexture);
      // Scale icon to fit the circle
      const maxDimension = 80;
      const scaleFactor = Math.min(
        maxDimension / sprite.width,
        maxDimension / sprite.height
      );
      sprite.scale.set(scaleFactor);
      sprite.anchor.set(0.5);
      circleFigure.addChild(sprite);
    });

    // Workout text container
    const workoutContainer = new PIXI.Container();
    const workout = new PIXI.Text(data?.workout, {
      fontFamily: "Outfit",
      fontSize: 62,
      fontWeight: "500",
      lineHeight: 62,
      letterSpacing: 0,
      fill: "white",
    });
    const result = new PIXI.Text(data?.result, {
      fontFamily: "Outfit",
      fontSize: 96,
      fontWeight: "500",
      lineHeight: 96,
      letterSpacing: 2,
      fill: "#A6FF00",
    });
    result.position.set(0, workout.height);
    workoutContainer.addChild(workout, result);
    workoutContainer.pivot.set(
      workoutContainer.width / 2,
      workoutContainer.height / 2
    );
    workoutContainer.x = workoutContainer.width / 2 + 284;
    workoutContainer.y = overlap.height / 2;
    overlap.addChild(workoutContainer);

    // Date text
    const date = new PIXI.Text(`${data?.period || ""} \n ${data?.date || ""}`, {
      fontFamily: "Outfit",
      align: "right",
      fontSize: 32,
      fontWeight: "600",
      lineHeight: 32,
      letterSpacing: 0,
      leading: 16,
      fill: "white",
    });
    date.anchor.set(0.5);
    date.position.set(
      overlap.width - 56 - date.width / 2,
      workoutContainer.y + workoutContainer.height / 2 - date.height / 2
    );

    overlap.addChild(date);
  };

  useEffect(() => {
    // Initialize PIXI Application
    let app = new PIXI.Application({
      backgroundAlpha: 1,
      backgroundColor: "#f1f5f9",
      width: 1200,
      height: 1600,
    });
    appRef.current = app;
    app.view.className = "w-full aspect-[3/4] bg-slate-100 rounded-2xl";
    containerRef.current.appendChild(app.view);
    if (image) imageRenderer(app);
    if (Object.keys(data).length !== 0 && image) maskRenderer(app);

    return () => {
      app.destroy(true, true);
    };
  }, [data, image]);

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[3/4] bg-slate-100 rounded-2xl"></div>
  );
};

export default WebGLRenderer;
