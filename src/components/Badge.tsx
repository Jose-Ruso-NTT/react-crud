import { useCallback } from "react";

const getMileageStatus = (mileage: number) => {
  if (!mileage) {
    return { label: "Nuevo", color: "bg-green-500" };
  } else if (mileage < 100) {
    return { label: "Km 0", color: "bg-blue-500 text-white" };
  } else {
    return { label: "Ocasión", color: "bg-yellow-500" };
  }
};

function Badge({ mileage }: { mileage: number }) {
  const mileageStatus = useCallback(() => {
    return getMileageStatus(mileage);
  }, [mileage])();

  return (
    <span
      title={mileageStatus.label}
      className={`badge ${mileageStatus.color} text-s min-w-16 overflow-hidden text-ellipsis rounded px-2 py-1 font-bold`}
    >
      {mileageStatus.label}
    </span>
  );
}

export default Badge;
