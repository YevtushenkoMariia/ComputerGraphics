import { COLORS } from "../constants/colors";
import Point from "../models/Point";
import { useState, useEffect } from "react";
import PointInput from "./PointInput";
import ColorPicker from "./СolorPicker";
import { useCanvasSize } from "../context/CanvsSizeContext";
import { ValidatePoints, randomInt } from "../utils/Validators";
import ErrorSection from "./ErrorSection";
import { createTriangle } from "../services/TriangleCreating";
import apexOptions from "../constants/ApexTypes";
import type { TriangleControlsProps } from "../types/props";

const pointsInputs = [{ pointId: "A" }, { pointId: "B" }];

export default function TriangleControls({
  onLog,
  onReset,
  onDraw,
}: TriangleControlsProps) {
  const [pointA, setPointA] = useState<Point>(
    new Point(randomInt(0, 10), randomInt(0, 10), "A"),
  );
  const [pointB, setPointB] = useState<Point>(
    new Point(randomInt(0, 10), randomInt(0, 10), "B"),
  );
  const [pointC1, setPointC1] = useState<Point | null>(null);
  const [pointC2, setPointC2] = useState<Point | null>(null);
  const [isC1Selected, setIsC1] = useState<boolean>(true);

  const [isC1Disabled, setIsC1Disabled] = useState<boolean>(false);
  const [isC2Disabled, setIsC2Disabled] = useState<boolean>(false);

  const [borderColor, setBorderColor] = useState<string>("#3df500");
  const [fillColor, setFillColor] = useState<string>("#0010f5");

  const { canvasWidth, canvasHeight, step } = useCanvasSize();

  const [apex, setApex] = useState<string>("None");
  const [errors, setErrors] = useState<string[]>([]);
  const [isTwoApexValid, setIsTwoApexValid] = useState<boolean>(false);

  const handlePointChange = (pointId: string, value: Point) => {
    if (pointId === "A") setPointA(new Point(value.x, value.y, value.name));
    else if (pointId === "B")
      setPointB(new Point(value.x, value.y, value.name));
  };

  const handleCreateTriangle = () => {
    const triangle = createTriangle(
      pointA,
      pointB,
      borderColor,
      fillColor,
      apex,
      isC1Selected,
    );
    onDraw(triangle);
    onLog({
      name: "Triangle 1",
      apexA: pointA,
      apexB: pointB,
      apexC: triangle.isC1() ? triangle.pointC1! : triangle.pointC2!,
      borderColor: borderColor,
      fillColor: fillColor,
      apexType: apex,
    });
  };

  const handleResetBoard = () => {
    onReset();
  };

  function ThirdApexPreview() {
    const triangle = createTriangle(
      pointA,
      pointB,
      borderColor,
      fillColor,
      apex,
      isC1Selected,
    );
    triangle.FindThirdApex();
    setPointC1(triangle.pointC1!);
    setPointC2(triangle.pointC2!);

    setIsC1Disabled(
      !triangle.IsPointInCanvas(
        triangle.pointC1!,
        canvasWidth,
        canvasHeight,
        step,
      ),
    );
    setIsC2Disabled(
      !triangle.IsPointInCanvas(
        triangle.pointC2!,
        canvasWidth,
        canvasHeight,
        step,
      ),
    );
  }

  useEffect(() => {
    const { isValid, errors } = ValidatePoints(pointA, pointB);

    if (isValid) {
      setErrors([]);
      setIsTwoApexValid(true);

      ThirdApexPreview();
    } else {
      setErrors(errors);
      setIsTwoApexValid(false);
    }
  }, [pointA, pointB]);

  useEffect(() => {}, [isTwoApexValid]);

  const handleThirdApexChange = (id: string) => {
    if (id === "C1") setIsC1(true);
    else if (id === "C2") setIsC1(false);
  };

  const handleApexTypeChange = (id: string) => {
    setApex(id);
  };

  return (
    <div
      style={{ borderColor: COLORS.darkBlue, backgroundColor: COLORS.white }}
      className="m-4 p-4 border-2 rounded-lg w-full max-w-md flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-center">Налаштування трикутника</h2>

      <div className="flex flex-col gap-2">
        {pointsInputs.map((point) => (
          <PointInput
            key={point.pointId}
            pointId={point.pointId}
            initialPoint={point.pointId === "A" ? pointA : pointB}
            onChange={(x, y) =>
              handlePointChange(point.pointId, new Point(x, y, point.pointId))
            }
          />
        ))}
      </div>

      {errors.length > 0 && (
        <ErrorSection errorMessage={errors.join(", ")} pointId="AB" />
      )}

      {isTwoApexValid && (
        <div>
          <h3 className="font-semibold mb-1">Вершина C:</h3>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 disabled:opacity-50">
              <input
                type="radio"
                id="third-apex-1"
                name="third-apex"
                defaultChecked={true}
                onChange={() => handleThirdApexChange("C1")}
                disabled={isC1Disabled}
              />
              <label
                htmlFor="third-apex-1"
                className={isC1Disabled ? "text-gray-500" : ""}
              >
                Перша вершина {isC1Disabled ? " (не в межах)" : ""}
                {pointC1 && (
                  <small className="text-xs text-gray-500">
                    {" "}
                    {pointC1.getString()}
                  </small>
                )}
              </label>
            </div>
            <div className="flex items-center gap-2 disabled:opacity-50">
              <input
                type="radio"
                id="third-apex-2"
                name="third-apex"
                disabled={isC2Disabled}
                onChange={() => handleThirdApexChange("C2")}
              />
              <label
                htmlFor="third-apex-2"
                className={isC2Disabled ? "text-gray-500" : ""}
              >
                Друга вершина {isC2Disabled ? " (не в межах)" : ""}
                {pointC2 && (
                  <small className="text-xs text-gray-500">
                    {" "}
                    {pointC2.getString()}
                  </small>
                )}
              </label>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-1">Кольори:</h3>
        <div className="flex flex-row gap-2">
          <ColorPicker
            id="borderColor"
            label="Межі"
            value={borderColor}
            onChange={setBorderColor}
          />
          <ColorPicker
            id="fillColor"
            label="Заливка"
            value={fillColor}
            onChange={setFillColor}
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Позначення вершин:</h3>
        <div className="flex gap-4">
          {apexOptions.map((option) => (
            <div key={option.id} className="flex items-center gap-1">
              <input
                type="radio"
                name="apex"
                id={option.id}
                checked={apex === option.id}
                onChange={() => handleApexTypeChange(option.id)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          id="createBtn"
          onClick={handleCreateTriangle}
          className="px-4 py-2 rounded-md text-white transition-colors"
          style={{ backgroundColor: COLORS.darkBlue }}
        >
          Створити
        </button>
        <button
          id="resetBtn"
          onClick={handleResetBoard}
          className="px-4 py-2 rounded-md border-2 hover:bg-gray-100 transition-colors"
        >
          Очистити
        </button>
      </div>
    </div>
  );
}
