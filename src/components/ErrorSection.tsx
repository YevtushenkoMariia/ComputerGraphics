import { IMAGES } from "../assets/images/index.ts";

export default function ErrorSection({
  errorMessage,
  pointId,
}: {
  errorMessage: string;
  pointId: string;
}) {
  return (
    <div className="flex flex-row gap-2 items-center ml-4 mt-1 p-1 ">
      <img src={IMAGES.error} alt="Error" className="w-5 h-5" />
      <small
        className="text-red-500 text-sm font-bold ml-6 text-left"
        id={`error${pointId}`}
      >
        {errorMessage}
      </small>
    </div>
  );
}