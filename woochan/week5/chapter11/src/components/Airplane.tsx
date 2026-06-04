import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const MODEL_URL = '/airplane.glb';
const TARGET_SIZE = 2.8;

interface IAirplaneProps {
  isMobile: boolean;
}

export const Airplane = ({ isMobile }: IAirplaneProps) => {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);
  const poseRef = useRef({ x: 0, y: -0.5, z: 0.1 });
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const model = useMemo(() => {
    const root = scene.clone(true);

    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = TARGET_SIZE / (Math.max(size.x, size.y, size.z) || 1);

    root.scale.setScalar(scale);
    root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    root.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return root;
  }, [scene]);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const startX = isMobile ? 0 : 1.1;
    const endX = isMobile ? 0 : -0.5;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: '#wrap', start: 'top top', end: 'bottom bottom', scrub: 1 },
    });

    tl.fromTo(group.position, { x: startX, y: -0.2 }, { x: endX, y: 0.3, z: -0.3 })
      .to(poseRef.current, { x: 0.05, y: -0.95, z: -0.25 }, '<')
      .to(group.position, { x: endX, y: 0, z: 0 })
      .to(group.scale, { x: 1.25, y: 1.25, z: 1.25 }, '<')
      .to(poseRef.current, { x: -0.05, y: -0.3, z: 0.05 }, '<');
  }, [isMobile]);

  useEffect(() => {
    const handleDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleUp = () => {
      isDraggingRef.current = false;
    };

    const handleMove = (e: PointerEvent) => {
      const group = groupRef.current;
      if (!isDraggingRef.current || !group) return;

      const deltaX = e.clientX - lastPointerRef.current.x;
      const deltaY = e.clientY - lastPointerRef.current.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;

      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointermove', handleMove);

    return () => {
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  useFrame(() => {
    const group = groupRef.current;
    if (!group || isDraggingRef.current) return;

    group.rotation.x += (poseRef.current.x - group.rotation.x) * 0.05;
    group.rotation.y += (poseRef.current.y - group.rotation.y) * 0.05;
    group.rotation.z += (poseRef.current.z - group.rotation.z) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
};

useGLTF.preload(MODEL_URL);
