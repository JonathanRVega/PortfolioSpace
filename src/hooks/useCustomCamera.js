import { Vector3 } from 'three';
import create from 'zustand';

export const useCustomCamera = create((set) => ({
  cameraPosition: new Vector3(),
  cameraLookAt: new Vector3(),
  setCameraPosition: (pos = new Vector3()) =>
    set((state) => ({ ...state, cameraPosition: pos })),
  setCameraLookAt: (pos = new Vector3()) =>
    set((state) => ({ ...state, cameraLookAt: pos })),
}));
