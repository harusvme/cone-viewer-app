interface Vertex {
  x: number;
  y: number;
  z: number;
}

interface Triangle {
  a: number;
  b: number;
  c: number;
}

export const calculateTriangulation = (
  height: number,
  radius: number,
  segments: number
) => {
  const vertices: Vertex[] = [];
  const triangles: Triangle[] = [];

  const vertexTop: Vertex = { x: 0, y: 0, z: height };
  vertices.push(vertexTop);

  for (let i = 0; i < segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    const vertexBase: Vertex = { x, y, z: 0 };
    vertices.push(vertexBase);

    triangles.push({ a: 0, b: i + 1, c: ((i + 1) % segments) + 1 });

    triangles.push({
      a: i + 1,
      b: ((i + 1) % segments) + 1,
      c: (segments + 1) % (segments * 2),
    });
  }

  return { vertices, triangles };
};
