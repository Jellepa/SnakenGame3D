import {
  MeshStandardMaterial,
  MeshBasicMaterial,
  TextureLoader,
  SRGBColorSpace,
  RepeatWrapping,
} from "three";
import grassTextureUrl from "../../../assets/images/grass2.png";

const loader = new TextureLoader();

function createMaterials() {
  // Load the texture with the correct path for webpack
  const grasstexture = loader.load(grassTextureUrl);

  // Set texture properties
  grasstexture.colorSpace = SRGBColorSpace;
  grasstexture.wrapS = RepeatWrapping;
  grasstexture.wrapT = RepeatWrapping;
  grasstexture.repeat.set(10, 10); // Repeat the texture to avoid stretching

  // Add error handling
  grasstexture.onError = function (error) {
    console.error("Error loading grass texture:", error);
  };

  grasstexture.onLoad = function () {};

  // Use MeshStandardMaterial for better lighting interaction
  const ground = new MeshStandardMaterial({
    map: grasstexture,
    roughness: 0.8,
    metalness: 0.2,
  });

  return { ground };
}

export { createMaterials };
