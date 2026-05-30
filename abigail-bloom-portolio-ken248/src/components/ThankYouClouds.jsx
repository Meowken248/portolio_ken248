import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const cloudConfigs = [
    { start: [-8.8, 2.85, -1.8], target: [-4.7, 2.35, -0.05], scale: 1.42, color: 0xffffff },
    { start: [9.0, 2.65, -1.6], target: [4.75, 2.22, 0], scale: 1.5, color: 0xf6f2ff },
    { start: [-8.8, -2.95, -1.6], target: [-4.7, -2.28, 0.05], scale: 1.5, color: 0xeaf8ff },
    { start: [8.8, -3.05, -1.5], target: [4.72, -2.32, 0.05], scale: 1.46, color: 0xffeef6 },
    { start: [0, -6.2, -1.3], target: [0, -2.96, 0.2], scale: 1.72, color: 0xffffff },
    { start: [0, 6.1, -1.6], target: [0, 2.86, 0.1], scale: 1.58, color: 0xecfff8 },
    { start: [-9.2, 0.1, -1.8], target: [-5.35, 0.0, 0.02], scale: 1.22, color: 0xfef3ff },
    { start: [9.2, -0.1, -1.8], target: [5.35, -0.05, 0.02], scale: 1.22, color: 0xf0fbff },
    { start: [-4.8, 5.8, -1.7], target: [-2.75, 3.05, 0.04], scale: 1.2, color: 0xffffff },
    { start: [4.8, -5.8, -1.7], target: [2.75, -3.05, 0.04], scale: 1.24, color: 0xf7fbff },
];

function createCloud(config, index) {
    const group = new THREE.Group();
    group.position.set(...config.start);
    group.userData.start = new THREE.Vector3(...config.start);
    group.userData.target = new THREE.Vector3(...config.target);
    group.userData.floatOffset = index * 1.7;

    const material = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });

    const puffGeometry = new THREE.SphereGeometry(0.56, 28, 28);
    const puffData = [
        [-1.15, -0.08, 0, 0.9],
        [-0.46, 0.18, 0.08, 1.06],
        [0.24, 0.04, -0.04, 0.98],
        [0.9, 0.12, 0.08, 0.84],
        [1.42, -0.1, -0.08, 0.7],
        [-0.05, -0.28, 0.12, 1.12],
        [0.7, -0.34, 0, 0.88],
    ];

    puffData.forEach(([x, y, z, scale], puffIndex) => {
        const puff = new THREE.Mesh(puffGeometry, material);
        puff.position.set(x, y, z);
        puff.scale.set(
            scale * config.scale,
            scale * config.scale * (0.58 + puffIndex * 0.025),
            scale * config.scale * 0.62
        );
        group.add(puff);
    });

    group.userData.material = material;
    return group;
}

function createVortexStars() {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const palette = [
        new THREE.Color(0xfff6d7),
        new THREE.Color(0xe5a1aa),
        new THREE.Color(0x8395cd),
        new THREE.Color(0x7ad0ac),
        new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < 180; i++) {
        const t = i / 180;
        const arm = i % 5;
        const angle = t * Math.PI * 7 + arm * ((Math.PI * 2) / 5);
        const radius = 0.75 + t * 5.0 + Math.random() * 0.42;
        positions.push(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.62,
            -3.8 - Math.random() * 2.4
        );

        const color = palette[i % palette.length];
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.032,
        vertexColors: true,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });

    return new THREE.Points(geometry, material);
}

export default function ThankYouClouds() {
    const canvasRef = useRef(null);
    const activeRef = useRef(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const onCloudsChange = (event) => {
            const nextActive = Boolean(event.detail?.active);
            activeRef.current = nextActive;
            setActive(nextActive);
        };

        window.addEventListener("portfolio-cloud-thanks", onCloudsChange);
        return () => window.removeEventListener("portfolio-cloud-thanks", onCloudsChange);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        const clouds = cloudConfigs.map((config, index) => createCloud(config, index));
        clouds.forEach((cloud) => scene.add(cloud));

        const stars = createVortexStars();
        scene.add(stars);

        const planetGroup = new THREE.Group();
        planetGroup.position.set(3.75, 2.4, -0.45);
        planetGroup.scale.setScalar(0.001);
        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(0.38, 36, 36),
            new THREE.MeshBasicMaterial({
                color: 0xe5a1aa,
                transparent: true,
                opacity: 0.88,
            })
        );
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(0.58, 0.014, 12, 96),
            new THREE.MeshBasicMaterial({
                color: 0xfff6d7,
                transparent: true,
                opacity: 0.72,
            })
        );
        ring.rotation.x = Math.PI * 0.58;
        ring.rotation.y = Math.PI * 0.08;
        planetGroup.add(planet, ring);
        scene.add(planetGroup);

        let frameId;
        const clock = new THREE.Clock();
        const scaleVector = new THREE.Vector3();

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const animate = () => {
            const elapsed = clock.getElapsedTime();
            const isActive = activeRef.current;
            const targetOpacity = isActive ? 0.44 : 0;

            clouds.forEach((cloud, index) => {
                const destination = isActive ? cloud.userData.target : cloud.userData.start;
                cloud.position.lerp(destination, isActive ? 0.025 : 0.08);
                cloud.position.y += Math.sin(elapsed * 0.55 + cloud.userData.floatOffset) * 0.0012;
                cloud.rotation.z = Math.sin(elapsed * 0.16 + index) * 0.025;
                cloud.rotation.y = Math.sin(elapsed * 0.12 + index) * 0.025;
                cloud.userData.material.opacity += (targetOpacity - cloud.userData.material.opacity) * 0.05;
            });

            stars.material.opacity += ((isActive ? 0.45 : 0) - stars.material.opacity) * 0.05;
            stars.rotation.z += isActive ? 0.0008 : 0.0003;
            stars.rotation.y += 0.0002;

            const targetPlanetScale = isActive ? 1 : 0.001;
            scaleVector.set(targetPlanetScale, targetPlanetScale, targetPlanetScale);
            planetGroup.scale.lerp(scaleVector, 0.05);
            planetGroup.rotation.y += 0.0018;
            planetGroup.position.y = 2.4 + Math.sin(elapsed * 0.45) * 0.05;

            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", onResize);
        animate();

        return () => {
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(frameId);
            stars.geometry.dispose();
            stars.material.dispose();
            clouds.forEach((cloud) => {
                cloud.userData.material.dispose();
                cloud.children.forEach((child) => child.geometry.dispose());
            });
            planet.geometry.dispose();
            planet.material.dispose();
            ring.geometry.dispose();
            ring.material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className={`thank-you-clouds ${active ? "show" : ""}`} aria-hidden={!active}>
            <canvas className="thank-you-canvas" ref={canvasRef}></canvas>
            <div className="thank-you-message">
                <span className="thank-you-kicker">You reached the end</span>
                <strong>Thank you for visiting ken248!</strong>
                <span>See you in the next little 3D dream.</span>
            </div>
        </div>
    );
}
