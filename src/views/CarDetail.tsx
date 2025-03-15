import { useParams } from "react-router";

function CarDetail() {
  const { id } = useParams();
  return (
    <div>
      <h1>Car Detail {id}</h1>
    </div>
  );
}

export default CarDetail;
