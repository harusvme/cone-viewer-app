import { useState } from "react";

type SubmitFunction = (data: {
  height: number;
  radius: number;
  segments: number;
}) => void;

function ConeForm({ onSubmit }: { onSubmit: SubmitFunction }) {
  const [formData, setFormData] = useState({
    height: 0,
    radius: 0,
    segments: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Height:
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Radius:
        <input
          type="number"
          name="radius"
          value={formData.radius}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Segments:
        <input
          type="number"
          name="segments"
          value={formData.segments}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Calculate</button>
    </form>
  );
}

export default ConeForm;
