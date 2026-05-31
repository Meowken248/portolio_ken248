import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            // console.log(child);

            if (child.name === "Aquarium") {
                // console.log(child);
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness = 0;
                child.children[0].material.color.set(0x549dd2);
                child.children[0].material.ior = 3;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;
                child.children[0].material.depthWrite = false;
                child.children[0].material.depthTest = false;
            }

            if (child.name === "Computer") {
                this.prepareComputerMaterials(child);
            }

            if (child.name === "Table Stuff") {
                this.prepareTableStuffMaterials(child);
            }

            if (child.name === "Mini_Floor") {
                child.position.x = -0.289521;
                child.position.z = 8.83572;
            }

            if (child.name === "Lamp") {
                this.prepareLampMaterials(child);
            }

            // if (
            //     child.name === "Mailbox" ||
            //     child.name === "Lamp" ||
            //     child.name === "FloorFirst" ||
            //     child.name === "FloorSecond" ||
            //     child.name === "FloorThird" ||
            //     child.name === "Dirt" ||
            //     child.name === "Flower1" ||
            //     child.name === "Flower2"
            // ) {
            //     child.scale.set(0, 0, 0);
            // }

            child.scale.set(0, 0, 0);
            if (child.name === "Cube") {
                // child.scale.set(1, 1, 1);
                child.position.set(0, -1, 0);
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });

        const width = 0.5;
        const height = 0.7;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(7.68244, 7, 0.5);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / 4;
        this.actualRoom.add(rectLight);

        this.roomChildren["rectLight"] = rectLight;

        // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add(rectLightHelper);
        // console.log(this.room);

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
        this.setLampLight();
    }

    setLampLight() {
        const lamp = this.roomChildren.lamp;

        if (!lamp) return;

        const lampPosition = lamp.position.clone();
        lampPosition.y += 0.72;

        this.lampLight = new THREE.PointLight(0xffd36f, 0, 2.15, 2);
        this.lampLight.position.copy(lampPosition);
        this.actualRoom.add(this.lampLight);
    }

    prepareComputerMaterials(computer) {
        computer.traverse((child) => {
            if (!child.isMesh || !child.material) return;

            const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];

            const updatedMaterials = materials.map((material) => {
                const materialName = material.name?.toLowerCase() || "";

                if (materialName.includes("screen")) {
                    return new THREE.MeshBasicMaterial({
                        name: material.name,
                        map: this.resources.items.screen,
                    });
                }

                const clonedMaterial = material.clone();

                if (materialName.includes("computer") || materialName !== "screen") {
                    clonedMaterial.color.set(0xc7443b);
                    clonedMaterial.emissive = new THREE.Color(0x4d0b08);
                    clonedMaterial.emissiveIntensity = 0.16;
                    clonedMaterial.roughness = 0.58;
                }

                return clonedMaterial;
            });

            child.material = Array.isArray(child.material)
                ? updatedMaterials
                : updatedMaterials[0];
        });
    }

    prepareTableStuffMaterials(tableStuff) {
        this.keyboardRgbMaterials = [];

        tableStuff.traverse((child) => {
            if (!child.isMesh || !child.material) return;

            const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];

            const updatedMaterials = materials.map((material) => {
                const materialName = material.name?.toLowerCase() || "";
                const isKeyboardMaterial =
                    materialName === "key" ||
                    materialName === "material.001" ||
                    materialName === "material";

                if (isKeyboardMaterial) {
                    const keyboardMaterial = new THREE.MeshBasicMaterial({
                        name: material.name,
                        color:
                            materialName === "key"
                                ? new THREE.Color().setHSL(0, 0.9, 0.58)
                                : 0x1b1d23,
                    });

                    if (materialName === "key") {
                        this.keyboardRgbMaterials.push(keyboardMaterial);
                    }

                    return keyboardMaterial;
                }
                
                const clonedMaterial = material.clone();
                return clonedMaterial;
            });

            child.material = Array.isArray(child.material)
                ? updatedMaterials
                : updatedMaterials[0];

        });
    }

    getMaterialBounds(mesh, materials, targetNames) {
        const geometry = mesh.geometry;

        if (!geometry?.attributes?.position || !geometry.groups?.length) return null;

        const targetSet = new Set(targetNames);
        const indexAttribute = geometry.index;
        const positionAttribute = geometry.attributes.position;
        const box = new THREE.Box3();
        const vertex = new THREE.Vector3();
        let hasBounds = false;

        geometry.groups.forEach((group) => {
            const material = materials[group.materialIndex];
            const materialName = material?.name?.toLowerCase() || "";

            if (!targetSet.has(materialName)) return;

            for (let i = group.start; i < group.start + group.count; i++) {
                const vertexIndex = indexAttribute ? indexAttribute.getX(i) : i;
                vertex.fromBufferAttribute(positionAttribute, vertexIndex);
                box.expandByPoint(vertex);
                hasBounds = true;
            }
        });

        return hasBounds ? box : null;
    }

    prepareLampMaterials(lamp) {
        const materials = [];

        lamp.traverse((child) => {
            if (!child.isMesh || !child.material) return;

            const childMaterials = Array.isArray(child.material)
                ? child.material
                : [child.material];
            const clonedMaterials = childMaterials.map((material) =>
                material.clone()
            );

            child.material = Array.isArray(child.material)
                ? clonedMaterials
                : clonedMaterials[0];

            materials.push(...clonedMaterials);
        });

        const glassMaterials = materials.filter((material) => {
            const name = material.name?.toLowerCase() || "";
            return name !== "lamp";
        });

        this.lampGlassMaterials = glassMaterials.length ? glassMaterials : materials;

        this.lampGlassMaterials.forEach((material) => {
            material.emissive = new THREE.Color(0xffd36f);
            material.emissiveIntensity = 0;
            material.needsUpdate = true;
        });
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.05;
        });
    }

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);

        if (this.keyboardRgbMaterials) {
            const elapsed = this.time.elapsed * 0.00022;

            this.keyboardRgbMaterials.forEach((material, index) => {
                material.color.setHSL((elapsed + index * 0.16) % 1, 0.95, 0.62);
            });
        }
    }
}
