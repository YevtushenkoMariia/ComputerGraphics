import { useState } from "react";
import ErrorSection from "./ErrorSection";
import { ValidateCoordinate } from "../utils/Validators";
import { useCanvasSize } from "../context/CanvsSizeContext";
import { useEffect } from "react";
import type { PointInputProps } from "../types/props";
import type { FieldErrors } from "../types/types";


export default function PointInput({
  pointId,
  onChange,
  initialPoint,
}: PointInputProps) {
  const [x, setX] = useState<number>(initialPoint.x);
  const [y, setY] = useState<number>(initialPoint.y);
  const [isError, setIsError] = useState<boolean>(false);
  const [errors, setErrors] = useState<FieldErrors>({ x: null, y: null });
  const { step, canvasHeight, canvasWidth } = useCanvasSize();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const isXField = e.target.id === `X${pointId}`;
    const fieldKey: keyof FieldErrors = isXField ? "x" : "y";

    const { isValid, errors: validationErrors } = ValidateCoordinate(
      fieldKey,
      e.target.value.trim(),
      step,
      canvasWidth,
      canvasHeight,
    );

    setErrors((prev) => ({
      ...prev,
      [fieldKey]: isValid ? null : validationErrors.join(", "),
    }));

    setIsError(errors.x !== null || errors.y !== null);

    if (isXField) {
      setX(value);
      onChange(value, y);
    } else if (e.target.id === `Y${pointId}`) {
      setY(value);
      onChange(x, value);
    }
  };

  useEffect(() => {
    const activeErrors = Object.values(errors).filter(
      (msg): msg is string => msg !== null,
    );
    setIsError(activeErrors.length > 0);
  }, [errors]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          <h3>Вершина {pointId}:</h3>
          <div className="flex justify-start  mx-2.5">
            <label className="ml-3 mr-1 p-1;" htmlFor={`X${pointId}`}>
              X:
            </label>
            <input
              type="number"
              step="0.25"
              id={`X${pointId}`}
              value={x}
              className="h-7 w-24 border-2 border-gray-300 rounded-md text-center"
              onChange={handleChange}
            />
            <label className="ml-3 mr-1 p-1;" htmlFor={`Y${pointId}`}>
              Y:
            </label>
            <input
              type="number"
              step="0.25"
              id={`Y${pointId}`}
              value={y}
              className="h-7 w-24 border-2 border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
        </div>

        {isError && (
          <div className="flex flex-row gap-2">
            <ErrorSection
              errorMessage={Object.values(errors)
                .filter((msg): msg is string => msg !== null)
                .join("\n")}
              pointId={pointId}
            />
          </div>
        )}
      </div>
    </>
  );
}
