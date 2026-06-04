import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';

export const Donut = ({ isMobile }) => {
  const meshRef = useRef(null);
  const groupRef = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0, z: 0 });
  const isMouseDownRef = useRef(false);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#wrap',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    const startX = isMobile ? 0 : 1.2;
    const endX = isMobile ? 0 : 0.5;

    if (groupRef.current) {
      tl.fromTo(
        groupRef.current.position,
        { x: startX, y: -0.5 },
        { x: endX, y: 0.5, z: -0.25 },
      )
        .to(groupRef.current.scale, { x: 0.9, y: 0.9, z: 0.9 }, '<')
        .to(
          rotationRef.current,
          { x: Math.PI, y: Math.PI * 2, z: Math.PI },
          '<',
        )
        .to(groupRef.current.position, {
          y: 0,
          x: endX,
          z: 0,
        })
        .to(
          groupRef.current.scale,
          {
            x: isMobile ? 1.5 : 1.3,
            y: isMobile ? 1.5 : 1.3,
            z: isMobile ? 1.5 : 1.3,
          },
          '<',
        )
        .to(rotationRef.current, { x: Math.PI / 2, y: 0, z: 0 }, '<');
    }

    const handleMouseDown = (e) => {
      isMouseDownRef.current = true;
      lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    const handleMouseMove = (e) => {
      if (isMouseDownRef.current && groupRef.current) {
        const deltaMove = {
          x: e.clientX - lastMousePositionRef.current.x,
          y: e.clientY - lastMousePositionRef.current.y,
        };

        const rotationSpeed = 0.01;
        groupRef.current.rotation.y += deltaMove.x * rotationSpeed;
        groupRef.current.rotation.x += deltaMove.y * rotationSpeed;

        lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  useFrame((_state, delta) => {
    if (!isMouseDownRef.current && groupRef.current) {
      groupRef.current.rotation.x +=
        (rotationRef.current.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y +=
        (rotationRef.current.y - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.z +=
        (rotationRef.current.z - groupRef.current.rotation.z) * 0.05;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={1.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusGeometry args={[0.8, 0.28, 48, 128]} />
        <meshStandardMaterial color="#ff9f1c" roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
};
