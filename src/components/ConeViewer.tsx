import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ConeViewer: React.FC<{ triangulation: any }> = ({ triangulation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = 1000;
      const containerHeight = 1000;

      renderer.setSize(containerWidth, containerHeight);

      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();

      containerRef.current.appendChild(renderer.domElement);
    }
  }, [containerRef]);

  useEffect(() => {
    if (
      triangulation &&
      Array.isArray(triangulation.triangulation.vertices) &&
      Array.isArray(triangulation.triangulation.triangles)
    ) {
      const geometry = new THREE.BufferGeometry();

      const verticesArray = [];
      const indicesArray = [];

      for (const vertex of triangulation.triangulation.vertices) {
        verticesArray.push(vertex.x, vertex.y, vertex.z);
      }

      for (const triangle of triangulation.triangulation.triangles) {
        indicesArray.push(triangle.a, triangle.b, triangle.c);
      }

      const vertices = new Float32Array(verticesArray);
      const indices = new Uint32Array(indicesArray);

      geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
      geometry.setIndex(new THREE.BufferAttribute(indices, 1));
      console.log(geometry);
      const edgesGeometry = new THREE.EdgesGeometry(geometry);

      const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
      const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

      const material = new THREE.MeshPhongMaterial({
        color: 0x808080,
        shininess: 100,
      });

      const coneMesh = new THREE.Mesh(geometry, material);

      scene.add(coneMesh);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

      const pointLight = new THREE.PointLight(0xffffff, 0.5);
      pointLight.position.x = 2;
      pointLight.position.y = 3;
      pointLight.position.z = 4;

      scene.add(ambientLight, pointLight);

      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.5,
        1000
      );
      camera.position.set(-5, -15, 15);
      camera.lookAt(0, 0, 0);
      renderer.setClearColor(0x000000, 0);

      scene.add(edges);

      renderer.render(scene, camera);
    }
  }, [triangulation]);

  return <div ref={containerRef} />;
};

export default ConeViewer;
