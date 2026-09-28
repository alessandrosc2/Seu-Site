(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/orbit-delivery-hero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrbitDeliveryHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$803f4abc$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-803f4abc.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$803f4abc$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-803f4abc.esm.js [app-client] (ecmascript) <export D as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/GLTFLoader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$DRACOLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/DRACOLoader.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
// @ts-nocheck — generated single-file distribution; typed sources live in the app.
"use client";
// Orbit Delivery — self-contained 3D hero. Configurable hosted GLB models; all application code and styles in one file.
// Dependencies: React, Three.js, @react-three/fiber.
// Drag to rotate. Pause to greet. Supports .dark and data-theme="dark".
"use client";
;
;
;
;
;
// Motion helpers
const clamp = (value, min, max)=>Math.max(min, Math.min(max, value));
const damp = (value, target, lambda, dt)=>value + (target - value) * (1 - Math.exp(-lambda * dt));
const smoothstep = (value, min, max)=>{
    const t = clamp((value - min) / (max - min), 0, 1);
    return t * t * (3 - 2 * t);
};
const GAIT_DISTANCE = 0.44;
function createMotion() {
    return {
        planetAngle: 0,
        planetVelocity: 0,
        dragTarget: 0,
        characterTarget: 0,
        characterAngle: 0,
        characterVelocity: 0,
        phase: 0,
        activity: 0,
        direction: 1,
        time: 0,
        dragging: false,
        lastInteraction: 0,
        pitchAngle: 0,
        pitchVelocity: 0,
        pitchTarget: 0
    };
}
function stepPlanet(m, dt, auto, reduced, autoRoll = -0.032) {
    m.time += dt;
    if (!auto) {
        m.dragging = false;
        m.planetVelocity = m.pitchVelocity = 0;
        m.dragTarget = m.planetAngle;
        m.pitchTarget = m.pitchAngle;
        return;
    }
    if (m.dragging) {
        const acceleration = 90 * (m.dragTarget - m.planetAngle) - 18 * m.planetVelocity;
        m.planetVelocity += acceleration * dt;
    } else {
        const desired = auto && !reduced && m.time - m.lastInteraction > 3.5 ? autoRoll : 0;
        m.planetVelocity = damp(m.planetVelocity, desired, reduced ? 12 : 5, dt);
    }
    m.planetVelocity = clamp(m.planetVelocity, -1.15, 1.15);
    m.planetAngle += m.planetVelocity * dt;
}
function stepRunner(m, dt, screenTopLocal, reduced) {
    m.characterTarget += Math.atan2(Math.sin(screenTopLocal - m.characterTarget), Math.cos(screenTopLocal - m.characterTarget));
    const error = m.characterTarget - m.characterAngle;
    const stiffness = reduced ? 110 : 48;
    const damping = reduced ? 21 : 11;
    m.characterVelocity += (stiffness * error - damping * m.characterVelocity) * dt;
    m.characterAngle += m.characterVelocity * dt;
    const speed = Math.abs(m.characterVelocity);
    m.activity = damp(m.activity, smoothstep(speed, 4e-3, 0.022), 9, dt);
    if (speed > 0.025) m.direction = Math.sign(m.characterVelocity);
    m.phase += speed * 2.25 / GAIT_DISTANCE * Math.PI * 2 * dt;
}
function createGlobeMotion() {
    return {
        delta: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](),
        orientation: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]().setFromEuler(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"](0.1, 0.5, 0)),
        angular: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        route: 0
    };
}
function stepGlobeMotion(globe, m, dt, auto, reduced) {
    const roaming = auto && !reduced && !m.dragging && m.time - m.lastInteraction > 3.5;
    if (roaming) globe.route += 0.24 * dt;
    stepPlanet(m, dt, auto, reduced, -0.24 * Math.cos(globe.route));
    if (!auto) {
        globe.angular.set(0, 0, 0);
        return;
    }
    if (m.dragging) m.pitchVelocity += (70 * (m.pitchTarget - m.pitchAngle) - 17 * m.pitchVelocity) * dt;
    else m.pitchVelocity = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].damp(m.pitchVelocity, roaming ? 0.24 * Math.sin(globe.route) : 0, 6, dt);
    m.pitchVelocity = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(m.pitchVelocity, -0.55, 0.55);
    m.pitchAngle += m.pitchVelocity * dt;
    globe.angular.set(m.pitchVelocity, m.planetVelocity * 0.45, -m.planetVelocity);
    const speed = globe.angular.length();
    if (speed > 1e-8) {
        globe.delta.setFromAxisAngle(globe.angular.multiplyScalar(1 / speed), speed * dt);
        globe.orientation.premultiply(globe.delta).normalize();
    }
}
function createSurfaceMotion() {
    return {
        current: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0),
        target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0),
        velocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        error: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        worldNormal: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        worldVelocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        inverse: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](),
        initialized: false
    };
}
function stepSurface(s, m, rotation, screenUp, dt, reduced, paused = false) {
    s.inverse.copy(rotation).invert();
    s.target.copy(screenUp).applyQuaternion(s.inverse).normalize();
    if (!s.initialized) {
        s.current.copy(s.target);
        s.initialized = true;
    }
    if (paused) {
        s.velocity.set(0, 0, 0);
        s.worldVelocity.set(0, 0, 0);
        s.worldNormal.copy(s.current).applyQuaternion(rotation);
        m.characterVelocity = 0;
        m.activity = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].damp(m.activity, 0, 10, dt);
        return;
    }
    const cosine = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(s.current.dot(s.target), -1, 1);
    const angle = Math.acos(cosine);
    s.error.copy(s.target).addScaledVector(s.current, -cosine);
    if (s.error.lengthSq() > 1e-12) s.error.normalize().multiplyScalar(angle);
    const stiffness = reduced ? 110 : 48, damping = reduced ? 21 : 11;
    s.velocity.addScaledVector(s.error, stiffness * dt).multiplyScalar(Math.exp(-damping * dt));
    s.velocity.addScaledVector(s.current, -s.velocity.dot(s.current));
    s.current.addScaledVector(s.velocity, dt).normalize();
    s.velocity.addScaledVector(s.current, -s.velocity.dot(s.current));
    s.worldNormal.copy(s.current).applyQuaternion(rotation);
    s.worldVelocity.copy(s.velocity).applyQuaternion(rotation);
    const speed = s.velocity.length();
    m.characterTarget = Math.atan2(s.target.x, s.target.y);
    m.characterAngle = Math.atan2(s.current.x, s.current.y);
    if (Math.abs(s.worldVelocity.x) > 0.012) m.direction = Math.sign(s.worldVelocity.x);
    m.characterVelocity = speed * m.direction;
    m.activity = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].damp(m.activity, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].smoothstep(speed, 4e-3, 0.022), 9, dt);
    m.phase += speed * 2.25 / GAIT_DISTANCE * Math.PI * 2 * dt;
}
const AssetBaseContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])("");
const surfaceData = "https://cdn.jsdelivr.net/gh/fadeichev2121/planet@b3f70fbf4b577845b1d9d5947c9410fb4d925dae/models/surface.json";
function disposeScene(scene) {
    const textures = new Set();
    const materials = new Set();
    const geometries = new Set();
    const skeletons = new Set();
    scene.traverse((node)=>{
        if (!(node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"])) return;
        geometries.add(node.geometry);
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkinnedMesh"]) skeletons.add(node.skeleton);
        for (const material of Array.isArray(node.material) ? node.material : [
            node.material
        ]){
            materials.add(material);
            for (const value of Object.values(material))if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"]) textures.add(value);
        }
    });
    geometries.forEach((g)=>g.dispose());
    skeletons.forEach((s)=>s.dispose());
    materials.forEach((m)=>m.dispose());
    textures.forEach((t)=>{
        t.dispose();
        if (typeof ImageBitmap !== "undefined" && t.image instanceof ImageBitmap) t.image.close();
    });
}
function surfaceRadius(surface2, x, y, z) {
    if (!surface2 || !surface2.radii) return 2.2;
    const u = (Math.atan2(x, z) / (2 * Math.PI) % 1 + 1) % 1 * surface2.width;
    const v = Math.acos(Math.max(-1, Math.min(1, y))) / Math.PI * (surface2.height - 1);
    const x0 = Math.floor(u), x1 = (x0 + 1) % surface2.width;
    const y0 = Math.floor(v), y1 = Math.min(y0 + 1, surface2.height - 1);
    const tx = u - x0, ty = v - y0;
    const a = surface2.radii[y0 * surface2.width + x0] * (1 - tx) + surface2.radii[y0 * surface2.width + x1] * tx;
    const b = surface2.radii[y1 * surface2.width + x0] * (1 - tx) + surface2.radii[y1 * surface2.width + x1] * tx;
    return a * (1 - ty) + b * ty;
}
function usePlanetAsset(onReady) {
    _s();
    const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AssetBaseContext);
    const [asset, setAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePlanetAsset.useEffect": ()=>{
            const abort = new AbortController();
            const draco = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$DRACOLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DRACOLoader"]().setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/").setDecoderConfig({
                type: "wasm"
            }).setWorkerLimit(2);
            const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLTFLoader"]().setDRACOLoader(draco);
            let disposed = false;
            let scene;
            const fetchChecked = {
                "usePlanetAsset.useEffect.fetchChecked": async (path)=>{
                    const response = await fetch(path, {
                        signal: abort.signal
                    });
                    if (!response.ok) throw new Error(`Planet asset could not load (${response.status})`);
                    return response;
                }
            }["usePlanetAsset.useEffect.fetchChecked"];
            onReady?.(false);
            Promise.all([
                fetchChecked(`${base}models/whimsical-world.glb`).then({
                    "usePlanetAsset.useEffect": (r)=>r.arrayBuffer()
                }["usePlanetAsset.useEffect"]),
                fetch(surfaceData, {
                    signal: abort.signal
                }).then({
                    "usePlanetAsset.useEffect": (r)=>r.json()
                }["usePlanetAsset.useEffect"]).catch({
                    "usePlanetAsset.useEffect": ()=>({
                            width: 128,
                            height: 65,
                            radii: new Array(128 * 65).fill(0.9355)
                        })
                }["usePlanetAsset.useEffect"])
            ]).then({
                "usePlanetAsset.useEffect": async ([buffer, surface2])=>{
                    if (disposed) return;
                    const gltf = await loader.parseAsync(buffer, `${base}models/`);
                    scene = gltf.scene;
                    if (disposed) {
                        disposeScene(scene);
                        return;
                    }
                    scene.traverse({
                        "usePlanetAsset.useEffect": (node)=>{
                            node.updateMatrix();
                            node.matrixAutoUpdate = false;
                            if (!(node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"])) return;
                            const materials = Array.isArray(node.material) ? node.material : [
                                node.material
                            ];
                            for (const mat of materials)if (mat instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]) {
                                mat.side = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FrontSide"];
                                mat.metalness = 0;
                                mat.roughness = 0.86;
                                mat.normalScale.setScalar(0.65);
                                if (mat.map) mat.map.anisotropy = 4;
                            }
                        }
                    }["usePlanetAsset.useEffect"]);
                    setAsset({
                        scene,
                        surface: surface2
                    });
                    onReady?.(true);
                }
            }["usePlanetAsset.useEffect"]).catch({
                "usePlanetAsset.useEffect": (reason)=>{
                    if (!disposed) setError(reason instanceof Error ? reason : new Error(String(reason)));
                }
            }["usePlanetAsset.useEffect"]).finally({
                "usePlanetAsset.useEffect": ()=>{
                    if (!disposed) draco.dispose();
                }
            }["usePlanetAsset.useEffect"]);
            return ({
                "usePlanetAsset.useEffect": ()=>{
                    disposed = true;
                    abort.abort();
                    draco.dispose();
                    if (scene) disposeScene(scene);
                }
            })["usePlanetAsset.useEffect"];
        }
    }["usePlanetAsset.useEffect"], [
        onReady,
        base
    ]);
    if (error) throw error;
    return asset;
}
_s(usePlanetAsset, "0dM9hAVXoWTWcAYb8kERO6JiLAg=");
function makeSeamlessRun(source) {
    const reference = source.tracks.reduce((best, track)=>track.times.length > best.times.length ? track : best);
    const start = reference.times[0];
    const last = reference.times[reference.times.length - 1];
    const intervals = Array.from(reference.times).slice(1).map((time, i)=>time - reference.times[i]).sort((a, b)=>a - b);
    const step = intervals.length ? intervals[Math.floor(intervals.length / 2)] : 1 / 24;
    const period = Math.max(step, last - start + step);
    const frames = Math.max(40, Math.ceil(period * 120));
    const quaternion = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    const tracks = source.tracks.map((track)=>{
        const count = track.times.length, size = track.getValueSize();
        const knots = Array.from(track.times, (time)=>time - start);
        const samples = Array.from(track.values);
        const isRotation = track.name.endsWith(".quaternion");
        const isMorph = track.name.endsWith(".morphTargetInfluences");
        if (isRotation) for(let i = 1; i < count; i++){
            let dot = 0;
            for(let c = 0; c < 4; c++)dot += samples[(i - 1) * 4 + c] * samples[i * 4 + c];
            if (dot < 0) for(let c = 0; c < 4; c++)samples[i * 4 + c] *= -1;
        }
        const times = [], values = [];
        for(let frame = 0; frame <= frames; frame++){
            const time = frame === frames ? 0 : frame / frames * period;
            times.push(frame / frames * period);
            let index = 0;
            while(index < count - 1 && knots[index + 1] <= time)index++;
            const previous = (index - 1 + count) % count, next = (index + 1) % count, after = (index + 2) % count;
            const t1 = knots[index], t2 = next === 0 ? period + knots[0] : knots[next];
            const t0 = previous > index ? knots[previous] - period : knots[previous];
            const t3 = after <= next ? knots[after] + period : knots[after];
            const afterTime = t3 <= t2 ? t3 + period : t3;
            const length = Math.max(t2 - t1, 1e-6), u = Math.max(0, Math.min(1, (time - t1) / length));
            for(let c = 0; c < size; c++){
                const p0 = samples[previous * size + c], p1 = samples[index * size + c], p2 = samples[next * size + c], p3 = samples[after * size + c];
                const a = count < 3 ? 0 : (p2 - p0) / Math.max(t2 - t0, 1e-6) * length;
                const b = count < 3 ? 0 : (p3 - p1) / Math.max(afterTime - t1, 1e-6) * length;
                values.push(count === 1 ? p1 : isMorph ? p1 + (p2 - p1) * u : (2 * u ** 3 - 3 * u ** 2 + 1) * p1 + (u ** 3 - 2 * u ** 2 + u) * a + (-2 * u ** 3 + 3 * u ** 2) * p2 + (u ** 3 - u ** 2) * b);
            }
            if (isRotation) {
                quaternion.fromArray(values, values.length - 4).normalize();
                quaternion.toArray(values, values.length - 4);
            }
        }
        const result = track.clone();
        result.times = new Float32Array(times);
        result.values = new Float32Array(values);
        return result;
    });
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationClip"]("Courier_Run_Seamless", period, tracks);
}
class BagSuspension {
    constructor(scene){
        this.scene = scene;
        const bone = scene.getObjectByName("CourierBag");
        if (!(bone instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bone"])) throw new Error("Courier bag attachment is missing.");
        this.bone = bone;
        scene.updateWorldMatrix(true, true);
        scene.getWorldQuaternion(this.sceneOrientation);
        bone.getWorldQuaternion(this.restOrientation);
        this.restOrientation.premultiply(this.sceneOrientation.invert());
        this.inverseRest.copy(this.restOrientation).invert();
    }
    bone;
    restOrientation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    animatedOrientation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    animatedPosition = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    localAnchor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    gravityTilt = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    pelvisYaw = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    inverseRest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    xAxis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0);
    hangingOrientation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    sceneOrientation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    parentOrientation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    swing = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    angles = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]();
    inverseScene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    anchor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    previousAnchor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    velocity = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    previousVelocity = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    acceleration = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    initialized = false;
    applied = false;
    pitch = 0;
    roll = 8e-3;
    pitchVelocity = 0;
    rollVelocity = 0;
    restore() {
        if (!this.applied) return;
        this.bone.position.copy(this.animatedPosition);
        this.bone.quaternion.copy(this.animatedOrientation);
        this.applied = false;
    }
    update(dt, activity, _phase, turnRate, reduced, bodyLean = 0) {
        if (dt <= 0 || !this.bone.parent) return;
        this.animatedPosition.copy(this.bone.position);
        this.animatedOrientation.copy(this.bone.quaternion);
        this.inverseScene.copy(this.scene.matrixWorld).invert();
        this.bone.getWorldPosition(this.anchor).applyMatrix4(this.inverseScene);
        if (!this.initialized) {
            this.previousAnchor.copy(this.anchor);
            this.initialized = true;
        }
        this.velocity.copy(this.anchor).sub(this.previousAnchor).divideScalar(dt);
        this.acceleration.copy(this.velocity).sub(this.previousVelocity).divideScalar(dt);
        this.previousVelocity.lerp(this.velocity, 1 - Math.exp(-14 * dt));
        this.previousAnchor.copy(this.anchor);
        const gravity = Math.max(4, 9.81 + this.acceleration.y);
        const targetPitch = reduced ? 0 : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(Math.atan2(this.acceleration.z, gravity), -0.1, 0.1);
        const targetRoll = reduced ? 0 : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(Math.atan2(-this.acceleration.x, gravity) + Math.abs(turnRate) * 1e-3, -0.012, 0.045);
        const steps = Math.ceil(dt / (1 / 120)), h = dt / steps;
        for(let i = 0; i < steps; i++){
            this.pitchVelocity += ((targetPitch - this.pitch) * 72 - this.pitchVelocity * 11) * h;
            this.rollVelocity += ((targetRoll - this.roll) * 64 - this.rollVelocity * 10) * h;
            this.pitch = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.pitch + this.pitchVelocity * h, -0.12, 0.12);
            this.roll = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.roll + this.rollVelocity * h, -0.012, 0.05);
        }
        this.scene.getWorldQuaternion(this.sceneOrientation);
        this.bone.getWorldQuaternion(this.pelvisYaw).premultiply(this.parentOrientation.copy(this.sceneOrientation).invert()).multiply(this.inverseRest);
        this.pelvisYaw.set(0, this.pelvisYaw.y, 0, this.pelvisYaw.w).normalize();
        this.bone.parent.getWorldQuaternion(this.parentOrientation).invert();
        this.swing.setFromEuler(this.angles.set(this.pitch, 0, this.roll));
        this.gravityTilt.setFromAxisAngle(this.xAxis, -bodyLean);
        this.hangingOrientation.copy(this.parentOrientation).multiply(this.sceneOrientation).multiply(this.gravityTilt).multiply(this.pelvisYaw).multiply(this.swing).multiply(this.restOrientation);
        this.bone.quaternion.copy(this.animatedOrientation).slerp(this.hangingOrientation, 1 - activity * 0.3);
        this.localAnchor.copy(this.anchor).addScaledVector(this.xAxis, -9e-3 * (1 - activity * 0.5));
        this.localAnchor.y -= 0.027;
        this.localAnchor.applyMatrix4(this.scene.matrixWorld);
        this.bone.parent.worldToLocal(this.localAnchor);
        this.bone.position.copy(this.localAnchor);
        this.bone.updateWorldMatrix(false, true);
        this.applied = true;
    }
}
class CourierGreeting {
    constructor(scene){
        this.scene = scene;
        scene.updateWorldMatrix(true, true);
        const inverseScene = scene.getWorldQuaternion(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]()).invert();
        const up = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0);
        this.joints = [
            "RightArm",
            "RightForeArm",
            "RightHand"
        ].map((name)=>{
            const bone = scene.getObjectByName(name);
            if (!(bone instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bone"])) throw new Error(`Greeting joint ${name} is missing.`);
            const rest = bone.getWorldQuaternion(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]()).premultiply(inverseScene);
            const direction = up.clone().applyQuaternion(rest).normalize();
            const palm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0).addScaledVector(direction, -direction.x).normalize();
            return {
                bone,
                rest,
                direction,
                palm,
                animated: bone.quaternion.clone()
            };
        });
        this.restBendNormal.crossVectors(this.joints[0].direction, this.joints[1].direction).normalize();
    }
    joints;
    sceneRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    inverseParent = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    aim = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    twist = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    target = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
    direction = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    palm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    wantedPalm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    cross = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    restBendNormal = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    bendNormal = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    upperDirection = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.55, -0.65, 0.52).normalize();
    forearmDirection = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    phase = 0;
    applied = false;
    weight = 0;
    restore() {
        if (!this.applied) return;
        for (const joint of this.joints)joint.bone.quaternion.copy(joint.animated);
        this.applied = false;
    }
    step(dt, ready, reduced) {
        this.weight = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].damp(this.weight, ready ? 1 : 0, ready ? 4 : 9, dt);
        if (this.weight < 1e-4) {
            this.weight = 0;
            this.phase = 0;
        }
        if (ready && this.weight > 0.85 && !reduced) this.phase += dt * Math.PI * 2 * 0.9;
    }
    apply(reduced) {
        if (this.weight === 0) return;
        this.scene.getWorldQuaternion(this.sceneRotation);
        const wave = Math.sin(this.phase) * (reduced ? 0 : 0.12) * __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].smoothstep(this.weight, 0.85, 0.99);
        this.forearmDirection.set(-0.08 + wave * 0.35, 0.94, 0.33).normalize();
        this.bendNormal.crossVectors(this.upperDirection, this.forearmDirection).normalize();
        this.joints.forEach((joint, index)=>{
            joint.animated.copy(joint.bone.quaternion);
            if (index === 0) this.direction.copy(this.upperDirection);
            else if (index === 1) this.direction.copy(this.forearmDirection);
            else this.direction.set(-0.06 + wave, 0.97, 0.22);
            this.direction.normalize();
            this.aim.setFromUnitVectors(joint.direction, this.direction);
            this.target.copy(this.aim).multiply(joint.rest);
            this.palm.copy(this.restBendNormal).addScaledVector(joint.direction, -this.restBendNormal.dot(joint.direction)).normalize().applyQuaternion(this.aim);
            this.wantedPalm.copy(this.bendNormal).addScaledVector(this.direction, -this.bendNormal.dot(this.direction)).normalize();
            const angle = Math.atan2(this.direction.dot(this.cross.crossVectors(this.palm, this.wantedPalm)), this.palm.dot(this.wantedPalm));
            this.twist.setFromAxisAngle(this.direction, angle);
            this.target.premultiply(this.twist);
            joint.bone.parent.getWorldQuaternion(this.inverseParent).invert();
            this.target.premultiply(this.sceneRotation).premultiply(this.inverseParent);
            joint.bone.quaternion.slerp(this.target, this.weight);
            joint.bone.updateWorldMatrix(false, true);
        });
        this.applied = true;
    }
}
function optimizeRigidBag(scene) {
    scene.updateWorldMatrix(true, true);
    const candidates = [];
    scene.traverse((node)=>{
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkinnedMesh"] && node.name.startsWith("Delivery_Bag")) candidates.push(node);
    });
    for (const mesh of candidates){
        if (Object.keys(mesh.geometry.morphAttributes || {}).length) continue;
        const weights = mesh.geometry.getAttribute("skinWeight");
        const indices = mesh.geometry.getAttribute("skinIndex");
        if (!weights || !indices) continue;
        let joint = -1, rigid = true;
        for(let vertex = 0; vertex < weights.count && rigid; vertex++){
            let total = 0;
            for(let channel = 0; channel < 4; channel++){
                const weight = weights.getComponent(vertex, channel);
                if (weight < 1e-6) continue;
                const index = indices.getComponent(vertex, channel);
                if (joint < 0) joint = index;
                if (index !== joint) {
                    rigid = false;
                    break;
                }
                total += weight;
            }
            if (Math.abs(total - 1) > 1e-4) rigid = false;
        }
        if (!rigid || joint < 0) continue;
        const bone = mesh.skeleton.bones[joint];
        const bind = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().multiplyMatrices(mesh.skeleton.boneInverses[joint], mesh.bindMatrix);
        const geometry = mesh.geometry.clone().applyMatrix4(bind);
        geometry.deleteAttribute("skinIndex");
        geometry.deleteAttribute("skinWeight");
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();
        const bag = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, mesh.material);
        bag.name = mesh.name;
        bag.castShadow = mesh.castShadow;
        bag.receiveShadow = mesh.receiveShadow;
        bag.renderOrder = mesh.renderOrder;
        bag.matrixAutoUpdate = false;
        mesh.removeFromParent();
        bone.add(bag);
        let shared = false;
        scene.traverse((node)=>{
            if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] && node.geometry === mesh.geometry) shared = true;
        });
        if (!shared) mesh.geometry.dispose();
    }
}
function makeIdle(scene) {
    const tracks = [];
    const breath = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]().setFromAxisAngle(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0), 9e-3);
    scene.traverse((node)=>{
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] && node.morphTargetInfluences?.length) {
            const zeros = new Array(node.morphTargetInfluences.length).fill(0);
            tracks.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberKeyframeTrack"](`${node.name}.morphTargetInfluences`, [
                0,
                3
            ], [
                ...zeros,
                ...zeros
            ]));
        }
        if (!(node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bone"])) return;
        const q = node.quaternion.clone(), middle = q.clone();
        if (node.name === "Spine02" || node.name === "neck") middle.multiply(breath);
        tracks.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuaternionKeyframeTrack"](`${node.name}.quaternion`, [
            0,
            1.5,
            3
        ], [
            ...q.toArray(),
            ...middle.toArray(),
            ...q.toArray()
        ]));
        const p = node.position.clone(), inhale = p.clone();
        if (node.name === "Hips") inhale.y += 4e-3;
        tracks.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VectorKeyframeTrack"](`${node.name}.position`, [
            0,
            1.5,
            3
        ], [
            ...p.toArray(),
            ...inhale.toArray(),
            ...p.toArray()
        ]));
        tracks.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VectorKeyframeTrack"](`${node.name}.scale`, [
            0,
            3
        ], [
            ...node.scale.toArray(),
            ...node.scale.toArray()
        ]));
    });
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationClip"]("Courier_Idle", 3, tracks);
}
const MODEL_SCALE = 0.76 / 1.7;
function Courier({ motion, paused, reduced, onReady }) {
    _s1();
    const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AssetBaseContext);
    const facing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), lean = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const greetingTurn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const turnVelocity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const [asset, setAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Courier.useEffect": ()=>{
            const abort = new AbortController();
            const draco = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$DRACOLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DRACOLoader"]().setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/").setDecoderConfig({
                type: "wasm"
            }).setWorkerLimit(1);
            const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLTFLoader"]().setDRACOLoader(draco);
            let cancelled = false;
            let owned;
            onReady?.(false);
            const modelFile = "courier.glb";
            fetch(`${base}models/${modelFile}`, {
                signal: abort.signal
            }).then({
                "Courier.useEffect": async (response)=>{
                    if (!response.ok) throw new Error(`Courier could not load (${response.status})`);
                    const data = await response.arrayBuffer();
                    if (cancelled) return;
                    const gltf = await loader.parseAsync(data, `${base}models/`);
                    if (cancelled) {
                        disposeScene(gltf.scene);
                        return;
                    }
                    optimizeRigidBag(gltf.scene);
                    gltf.scene.traverse({
                        "Courier.useEffect": (node)=>{
                            if (!(node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"])) return;
                            node.morphTargetInfluences?.fill(0);
                            if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkinnedMesh"]) node.frustumCulled = false;
                            for (const material of Array.isArray(node.material) ? node.material : [
                                node.material
                            ]){
                                if (material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]) {
                                    material.metalness = 0;
                                    material.roughness = 0.9;
                                    material.roughnessMap = null;
                                    material.normalScale.setScalar(0.25);
                                    if (material.map) material.map.anisotropy = 8;
                                }
                            }
                        }
                    }["Courier.useEffect"]);
                    const clips = gltf.animations.filter({
                        "Courier.useEffect.clips": (animation)=>animation.duration > 0.3
                    }["Courier.useEffect.clips"]);
                    if (!clips.length) {
                        disposeScene(gltf.scene);
                        throw new Error("The courier run animation is missing.");
                    }
                    const clip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationClip"]("Courier_Run_Source", -1, clips.flatMap({
                        "Courier.useEffect": (animation)=>animation.tracks
                    }["Courier.useEffect"]));
                    const mixer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationMixer"](gltf.scene);
                    const bag = new BagSuspension(gltf.scene);
                    const greeting = new CourierGreeting(gltf.scene);
                    const idle = mixer.clipAction(makeIdle(gltf.scene)).play();
                    const seamless = makeSeamlessRun(clip);
                    const run = mixer.clipAction(seamless).setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoopRepeat"], Infinity).play();
                    run.zeroSlopeAtStart = false;
                    run.zeroSlopeAtEnd = false;
                    run.setEffectiveTimeScale(0);
                    run.setEffectiveWeight(0);
                    mixer.update(0);
                    owned = {
                        scene: gltf.scene,
                        mixer,
                        idle,
                        run,
                        duration: seamless.duration,
                        bag,
                        greeting
                    };
                    setAsset(owned);
                    onReady?.(true);
                }
            }["Courier.useEffect"]).catch({
                "Courier.useEffect": (reason)=>{
                    if (!cancelled) setError(reason instanceof Error ? reason : new Error(String(reason)));
                }
            }["Courier.useEffect"]).finally({
                "Courier.useEffect": ()=>{
                    if (!cancelled) draco.dispose();
                }
            }["Courier.useEffect"]);
            return ({
                "Courier.useEffect": ()=>{
                    cancelled = true;
                    abort.abort();
                    draco.dispose();
                    if (owned) {
                        owned.mixer.stopAllAction();
                        owned.mixer.uncacheRoot(owned.scene);
                        disposeScene(owned.scene);
                    }
                }
            })["Courier.useEffect"];
        }
    }["Courier.useEffect"], [
        onReady,
        base
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$803f4abc$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "Courier.useFrame": (_, delta)=>{
            if (!asset) return;
            const dt = Math.min(delta, 0.05), m = motion.current;
            if (!paused) greetingTurn.current = false;
            else if (m.activity < 0.06) greetingTurn.current = true;
            const desired = paused ? greetingTurn.current ? m.cameraHeading ?? 0 : facing.current.rotation.y : (m.heading ?? 0) + Math.PI / 2;
            const turn = Math.atan2(Math.sin(desired - facing.current.rotation.y), Math.cos(desired - facing.current.rotation.y));
            if (paused) {
                const acceleration = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(18 * turn - 8.5 * turnVelocity.current, -5.5, 5.5);
                turnVelocity.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(turnVelocity.current + acceleration * dt, -2.2, 2.2);
                if (Math.abs(turn) < 3e-3 && Math.abs(turnVelocity.current) < 0.025) turnVelocity.current = 0;
                facing.current.rotation.y += turnVelocity.current * dt;
            } else {
                const rotation = turn * (1 - Math.exp(-12 * dt));
                facing.current.rotation.y += rotation;
                turnVelocity.current = rotation / dt;
            }
            const turning = paused && greetingTurn.current && !reduced ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].smoothstep(Math.abs(turnVelocity.current), 0.08, 1.2) : 0;
            asset.greeting.step(dt, paused && greetingTurn.current && Math.abs(turn) < 0.055 && Math.abs(turnVelocity.current) < 0.13, reduced);
            lean.current.rotation.x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].damp(lean.current.rotation.x, Math.min(Math.abs(m.characterVelocity) * 0.065, 0.09) * (reduced ? 0.35 : 1), 9, dt);
            const activity = Math.max(m.activity, turning * 0.3) * (1 - asset.greeting.weight);
            asset.run.setEffectiveWeight(activity);
            asset.idle.setEffectiveWeight(1 - activity);
            asset.idle.paused = reduced;
            const playback = Math.max(Math.abs(m.characterVelocity) * 2.25 / GAIT_DISTANCE * asset.duration, turning * 0.72);
            asset.run.setEffectiveTimeScale(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].damp(asset.run.timeScale, playback, 10, dt));
            asset.greeting.restore();
            asset.bag.restore();
            asset.mixer.update(dt);
            asset.scene.updateWorldMatrix(true, true);
            asset.greeting.apply(reduced);
            asset.bag.update(dt, activity, m.phase, turnVelocity.current, reduced, lean.current.rotation.x);
        }
    }["Courier.useFrame"]);
    if (error) throw error;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: facing,
        rotation: [
            0,
            Math.PI / 2,
            0
        ],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
            ref: lean,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                scale: MODEL_SCALE,
                children: asset && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                    object: asset.scene,
                    dispose: null
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                    lineNumber: 652,
                    columnNumber: 116
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 652,
                columnNumber: 79
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
            lineNumber: 652,
            columnNumber: 61
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
        lineNumber: 652,
        columnNumber: 10
    }, this);
}
_s1(Courier, "sBeZGVDP590CrMqkm6Uzkgh6hp4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$803f4abc$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Courier;
const upVector = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0);
function ResponsiveCamera() {
    _s2();
    const { size, camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$803f4abc$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ResponsiveCamera.useEffect": ()=>{
            const ortho = camera;
            ortho.zoom = size.width / (size.width < 700 ? 5.65 : 5.25);
            ortho.updateProjectionMatrix();
        }
    }["ResponsiveCamera.useEffect"], [
        size.width,
        size.height,
        camera
    ]);
    return null;
}
_s2(ResponsiveCamera, "SuheLBQSbUveGy1xTk2TmeuIsjY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$803f4abc$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"]
    ];
});
_c1 = ResponsiveCamera;
function World2({ motion, auto, reduced, onReady }) {
    _s3();
    const planet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), runner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const asset = usePlanetAsset();
    const [courierReady, setCourierReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "World2.useEffect": ()=>{
            onReady?.(!!asset && courierReady);
        }
    }["World2.useEffect"], [
        asset,
        courierReady,
        onReady
    ]);
    const radius = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(2.2);
    const surface2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(createSurfaceMotion());
    const globe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(createGlobeMotion, []);
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "World2.useMemo[frame]": ()=>({
                screenUp: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                localVelocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                cameraFront: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
                inverseRunner: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]()
            })
    }["World2.useMemo[frame]"], []);
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$803f4abc$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])({
        "World2.useThree[size]": (state)=>state.size
    }["World2.useThree[size]"]);
    const small = size.width < 700;
    const zoom = size.width / (small ? 5.65 : 5.25);
    const centerY = size.height / zoom * (small ? 0.08 : 0.19) - 2.17;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$803f4abc$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "World2.useFrame": ({ camera }, delta)=>{
            if (!asset || !courierReady) return;
            const m = motion.current;
            const elapsed = Math.min(delta, 0.05), count = Math.ceil(elapsed / (1 / 120));
            frame.screenUp.copy(upVector).applyQuaternion(camera.quaternion);
            for(let i = 0; i < count; i++){
                const dt = elapsed / count;
                stepGlobeMotion(globe, m, dt, auto, reduced);
                stepSurface(surface2.current, m, globe.orientation, frame.screenUp, dt, reduced, !auto);
            }
            planet.current.quaternion.copy(globe.orientation);
            const s = surface2.current;
            const r = surfaceRadius(asset.surface, s.current.x, s.current.y, s.current.z) * 2.25;
            radius.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].damp(radius.current, r + 8e-3, 25, elapsed);
            runner.current.position.copy(s.worldNormal).multiplyScalar(radius.current);
            runner.current.quaternion.setFromUnitVectors(upVector, s.worldNormal);
            frame.inverseRunner.copy(runner.current.quaternion).invert();
            frame.cameraFront.set(0, 0, 1).applyQuaternion(camera.quaternion).applyQuaternion(frame.inverseRunner);
            m.cameraHeading = Math.atan2(frame.cameraFront.x, frame.cameraFront.z);
            if (s.velocity.lengthSq() > 1e-4) {
                frame.localVelocity.copy(s.worldVelocity).applyQuaternion(frame.inverseRunner);
                m.heading = Math.atan2(-frame.localVelocity.z, frame.localVelocity.x);
            }
        }
    }["World2.useFrame"], -1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            0,
            centerY,
            0
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: planet,
                scale: 2.25,
                children: asset && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                    object: asset.scene,
                    dispose: null
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                    lineNumber: 711,
                    columnNumber: 48
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 711,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: runner,
                visible: !!asset && courierReady,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Courier, {
                    motion: motion,
                    paused: !auto,
                    reduced: reduced,
                    onReady: setCourierReady
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                    lineNumber: 712,
                    columnNumber: 59
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 712,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
        lineNumber: 710,
        columnNumber: 10
    }, this);
}
_s3(World2, "3iFi/q+GmrVtq/LngxRjTXs+74g=", false, function() {
    return [
        usePlanetAsset,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$803f4abc$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$803f4abc$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c2 = World2;
function PlanetScene({ motion, active, auto, reduced, onReady }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        orthographic: true,
        camera: {
            position: [
                0,
                0,
                9
            ],
            zoom: 150,
            near: 0.1,
            far: 30
        },
        dpr: [
            1,
            1.5
        ],
        frameloop: active ? "always" : "never",
        gl: {
            antialias: true,
            alpha: true
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResponsiveCamera, {}, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 725,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.9
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 726,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hemisphereLight", {
                args: [
                    "#f1f5ff",
                    "#8aabc5",
                    1.4
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 727,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    -3,
                    5,
                    5
                ],
                intensity: 2.6,
                color: "#fff8f1"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 728,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    3,
                    2,
                    -2
                ],
                intensity: 1.8,
                color: "#c5deff"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 729,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(World2, {
                motion: motion,
                auto: auto,
                reduced: reduced,
                onReady: onReady
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 730,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
        lineNumber: 718,
        columnNumber: 5
    }, this);
}
_c3 = PlanetScene;
function Arrow() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 12h15m-6-6 6 6-6 6",
            stroke: "currentColor",
            strokeWidth: "1.4",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
            lineNumber: 736,
            columnNumber: 66
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
        lineNumber: 736,
        columnNumber: 10
    }, this);
}
_c4 = Arrow;
class SceneBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    state = {
        failed: false
    };
    static getDerivedStateFromError() {
        return {
            failed: true
        };
    }
    componentDidCatch(error, _info) {
        console.error("3D scene failed:", error);
    }
    render() {
        return this.state.failed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "scene-fallback",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "We couldn’t load this little world."
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                    lineNumber: 748,
                    columnNumber: 64
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>location.reload(),
                    children: "Try again"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                    lineNumber: 748,
                    columnNumber: 106
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
            lineNumber: 748,
            columnNumber: 32
        }, this) : this.props.children;
    }
}
const stories = {
    "Como Funciona": {
        title: "Do seu briefing ao site no ar.",
        paragraphs: [
            "Cada site incrível começa com o que o seu negócio tem de melhor. Preencha o Briefing Mestre, gere os prompts e veja a mágica acontecer.",
            "Nosso método guiado dá vida a páginas modernas e que convertem de verdade."
        ]
    },
    "Para Negócios": {
        title: "Seu negócio encontrado no Google.",
        paragraphs: [
            "Mais de 50% das pequenas empresas ainda não têm site. Ter um site próprio conecta você diretamente a quem pesquisa pelos seus serviços.",
            "Seu Site Único coloca a sua marca em destaque sem depender apenas de redes sociais."
        ]
    },
    "Renda Extra": {
        title: "Crie sites para negócios locais.",
        paragraphs: [
            "Aprenda o método e ofereça criação de sites para empresas da sua cidade.",
            "Sites simples e rápidos cobrando de R$ 200 a R$ 800 por projeto."
        ]
    }
};
function App() {
    _s4();
    const motion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(createMotion());
    const interaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true), [tabVisible, setTabVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [reduced, setReduced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sceneMounted, setSceneMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [auto, setAuto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true), [dragging, setDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [story, setStory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            setTabVisible(!document.hidden);
            const query = matchMedia("(prefers-reduced-motion: reduce)");
            const change = {
                "App.useEffect.change": ()=>setReduced(query.matches)
            }["App.useEffect.change"];
            change();
            query.addEventListener("change", change);
            const onVisibility = {
                "App.useEffect.onVisibility": ()=>{
                    setTabVisible(!document.hidden);
                    if (document.hidden) {
                        motion.current.dragging = false;
                        drag.current = null;
                        setDragging(false);
                    }
                }
            }["App.useEffect.onVisibility"];
            document.addEventListener("visibilitychange", onVisibility);
            const observer = new IntersectionObserver({
                "App.useEffect": ([entry])=>setVisible(entry.isIntersecting)
            }["App.useEffect"], {
                threshold: 0.01
            });
            if (interaction.current) observer.observe(interaction.current);
            return ({
                "App.useEffect": ()=>{
                    query.removeEventListener("change", change);
                    document.removeEventListener("visibilitychange", onVisibility);
                    observer.disconnect();
                }
            })["App.useEffect"];
        }
    }["App.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            let frame = 0, timeout = 0;
            frame = requestAnimationFrame({
                "App.useEffect": ()=>{
                    frame = requestAnimationFrame({
                        "App.useEffect": ()=>{
                            timeout = window.setTimeout({
                                "App.useEffect": ()=>setSceneMounted(true)
                            }["App.useEffect"], 100);
                        }
                    }["App.useEffect"]);
                }
            }["App.useEffect"]);
            return ({
                "App.useEffect": ()=>{
                    cancelAnimationFrame(frame);
                    clearTimeout(timeout);
                }
            })["App.useEffect"];
        }
    }["App.useEffect"], []);
    const release = (id)=>{
        if (drag.current?.id !== id) return;
        drag.current = null;
        motion.current.dragging = false;
        motion.current.lastInteraction = motion.current.time;
        setDragging(false);
    };
    const toggleMotion = ()=>{
        const next = !auto;
        setAuto(next);
        const m = motion.current;
        m.dragging = false;
        if (drag.current && interaction.current?.hasPointerCapture(drag.current.id)) interaction.current.releasePointerCapture(drag.current.id);
        drag.current = null;
        setDragging(false);
        m.planetVelocity = m.pitchVelocity = 0;
        m.dragTarget = m.planetAngle;
        m.pitchTarget = m.pitchAngle;
        if (next) m.lastInteraction = m.time - 4;
    };
    const nudge = (direction)=>{
        if (!auto) return;
        motion.current.planetVelocity += direction * 0.65;
        motion.current.lastInteraction = motion.current.time;
    };
    const explore = ()=>{
        interaction.current?.focus({
            preventScroll: true
        });
        if (window.innerWidth < 760) interaction.current?.scrollIntoView({
            behavior: reduced ? "instant" : "smooth",
            block: "center"
        });
        if (!reduced) nudge(1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "site-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "./",
                        className: "wordmark",
                        "aria-label": "Seu Site Único home",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 38 38",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                            id: "logo-light",
                                            cx: "30%",
                                            cy: "20%",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    stopColor: "#7d9efa"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                                    lineNumber: 846,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "1",
                                                    stopColor: "#4674e9"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                                    lineNumber: 847,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                            lineNumber: 845,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                        lineNumber: 844,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "23",
                                        cy: "15",
                                        r: "14",
                                        fill: "url(#logo-light)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                        lineNumber: 850,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "10",
                                        cy: "27",
                                        r: "8",
                                        fill: "#6389f0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                        lineNumber: 851,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "15",
                                        cy: "8",
                                        r: "3.5",
                                        fill: "#b2c7ff",
                                        opacity: ".45"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                        lineNumber: 852,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                lineNumber: 843,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brand-type",
                                children: [
                                    "seu site",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        children: "único"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                        lineNumber: 854,
                                        columnNumber: 48
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                lineNumber: 854,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                        lineNumber: 842,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        "aria-label": "Navegação principal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: explore,
                                children: "Método"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                lineNumber: 857,
                                columnNumber: 11
                            }, this),
                            [
                                "Como Funciona",
                                "Para Negócios",
                                "Renda Extra"
                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setStory(item),
                                    children: item
                                }, item, false, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 859,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                        lineNumber: 856,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "header-cta",
                        onClick: explore,
                        children: "Começar Agora"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                        lineNumber: 862,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 841,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "hero",
                    "aria-labelledby": "hero-title",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hero-copy",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "eyebrow",
                                    children: "Método Guiado com IA"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 867,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    id: "hero-title",
                                    children: [
                                        "Crie o site do seu negócio.",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                            lineNumber: 868,
                                            columnNumber: 60
                                        }, this),
                                        "Coloque no ar.",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                            lineNumber: 868,
                                            columnNumber: 80
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                            children: "Apareça no Google."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                            lineNumber: 868,
                                            columnNumber: 86
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 868,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "hero-description",
                                    children: "Um manual prático com prompts prontos para criar o site da sua marca com IA — único, rápido e sem código."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 869,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "explore-button",
                                    onClick: explore,
                                    children: [
                                        "Quero Meu Site Único ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Arrow, {}, void 0, false, {
                                            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                            lineNumber: 870,
                                            columnNumber: 87
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 870,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                            lineNumber: 866,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "visual-column",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: interaction,
                                id: "planet",
                                className: `planet-stage ${dragging ? "dragging" : ""}`,
                                tabIndex: 0,
                                role: "group",
                                "aria-roledescription": "interactive 3D planet",
                                "aria-label": "Gire o planeta 3D",
                                onPointerDown: (event)=>{
                                    if (!auto || !event.isPrimary || event.button !== 0) return;
                                    event.currentTarget.setPointerCapture(event.pointerId);
                                    drag.current = {
                                        id: event.pointerId,
                                        x: event.clientX,
                                        y: event.clientY
                                    };
                                    const m = motion.current;
                                    m.dragTarget = m.planetAngle;
                                    m.pitchTarget = m.pitchAngle;
                                    m.dragging = true;
                                    m.lastInteraction = m.time;
                                    setDragging(true);
                                },
                                onPointerMove: (event)=>{
                                    if (!auto || drag.current?.id !== event.pointerId) return;
                                    const dx = event.clientX - drag.current.x, dy = event.clientY - drag.current.y;
                                    const sensitivity = 5 / Math.max(360, event.currentTarget.clientWidth);
                                    const m = motion.current;
                                    m.dragTarget = Math.max(m.planetAngle - 0.5, Math.min(m.planetAngle + 0.5, m.dragTarget + dx * sensitivity));
                                    m.pitchTarget = Math.max(m.pitchAngle - 0.4, Math.min(m.pitchAngle + 0.4, m.pitchTarget + dy * sensitivity * 0.7));
                                    drag.current.x = event.clientX;
                                    drag.current.y = event.clientY;
                                    m.lastInteraction = m.time;
                                },
                                onPointerUp: (event)=>release(event.pointerId),
                                onPointerCancel: (event)=>release(event.pointerId),
                                onLostPointerCapture: (event)=>release(event.pointerId),
                                onKeyDown: (event)=>{
                                    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                                        event.preventDefault();
                                        nudge(event.key === "ArrowRight" ? 1 : -1);
                                    }
                                    if (event.key === " ") {
                                        event.preventDefault();
                                        if (!event.repeat) toggleMotion();
                                    }
                                },
                                children: [
                                    sceneMounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SceneBoundary, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                                            fallback: null,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanetScene, {
                                                motion: motion,
                                                active: visible && tabVisible && !story,
                                                auto: auto,
                                                reduced: reduced,
                                                onReady: setReady
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                                lineNumber: 920,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                            lineNumber: 919,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                        lineNumber: 918,
                                        columnNumber: 17
                                    }, this),
                                    !ready && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "loading",
                                        role: "status",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                                lineNumber: 924,
                                                columnNumber: 65
                                            }, this),
                                            "Carregando o universo 3D…"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                        lineNumber: 924,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                lineNumber: 873,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                            lineNumber: 872,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `planet-caption ${dragging ? "is-dragging" : ""}`,
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        !auto ? "Clique Iniciar" : dragging ? "Seu negócio." : "Arraste para girar",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                            lineNumber: 928,
                                            columnNumber: 93
                                        }, this),
                                        !auto ? "para continuar" : dragging ? "No mapa." : "o mundo"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 928,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 180 165",
                                    fill: "none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M161 148C137 82 103 39 28 14m0 0 6 16m-6-16 19-2",
                                        stroke: "currentColor",
                                        strokeWidth: "2.3",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                        lineNumber: 929,
                                        columnNumber: 52
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 929,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                            lineNumber: 927,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cloud-bank",
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 931,
                                    columnNumber: 58
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 931,
                                    columnNumber: 63
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 931,
                                    columnNumber: 68
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 931,
                                    columnNumber: 73
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 931,
                                    columnNumber: 78
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                            lineNumber: 931,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                    lineNumber: 865,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 864,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "site-footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "footer-left",
                        children: [
                            "Sem código",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                lineNumber: 935,
                                columnNumber: 46
                            }, this),
                            "100% Personalizado"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                        lineNumber: 935,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "motion-button",
                        onClick: toggleMotion,
                        "aria-pressed": !auto,
                        "aria-label": auto ? "Pausar e saudar" : "Iniciar rotação",
                        children: [
                            auto ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 20 20",
                                "aria-hidden": "true",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M7 5v10m6-10v10",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 938,
                                    columnNumber: 57
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                lineNumber: 938,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 20 20",
                                "aria-hidden": "true",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "m7 4 8 6-8 6Z",
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                    lineNumber: 940,
                                    columnNumber: 57
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                lineNumber: 940,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: auto ? "Pausar" : "Girar"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                lineNumber: 942,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                        lineNumber: 936,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "footer-right",
                        children: [
                            "Seu negócio",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                lineNumber: 944,
                                columnNumber: 48
                            }, this),
                            "visível",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                                lineNumber: 944,
                                columnNumber: 61
                            }, this),
                            "no Google"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                        lineNumber: 944,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 934,
                columnNumber: 7
            }, this),
            story && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoryDialog, {
                story: story,
                onClose: ()=>setStory(null)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 946,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
        lineNumber: 840,
        columnNumber: 5
    }, this);
}
_s4(App, "Sht1JRWYsPPOj6dUeY4UTRaXvbA=");
_c5 = App;
function StoryDialog({ story, onClose }) {
    _s5();
    const dialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoryDialog.useEffect": ()=>{
            const node = dialog.current;
            node?.showModal();
            return ({
                "StoryDialog.useEffect": ()=>node?.close()
            })["StoryDialog.useEffect"];
        }
    }["StoryDialog.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dialog", {
        ref: dialog,
        className: "about-dialog",
        onCancel: onClose,
        onClick: (event)=>{
            if (event.target === event.currentTarget) onClose();
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "close-dialog",
                "aria-label": "Fechar",
                onClick: onClose,
                children: "×"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 963,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "eyebrow",
                children: story
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 964,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: stories[story].title
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 965,
                columnNumber: 7
            }, this),
            stories[story].paragraphs.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: p
                }, p, false, {
                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                    lineNumber: 966,
                    columnNumber: 45
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "explore-button",
                onClick: onClose,
                children: [
                    "Conhecer o Método ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Arrow, {}, void 0, false, {
                        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                        lineNumber: 967,
                        columnNumber: 78
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                lineNumber: 967,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
        lineNumber: 960,
        columnNumber: 5
    }, this);
}
_s5(StoryDialog, "UtfO8VS+DT4pQ5LNOKd1nN4+Vak=");
_c6 = StoryDialog;
const css = `
.orbit-delivery{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#080e2b;background:#f6f9ff;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;font-weight:400;color-scheme:light;width:100%;isolation:isolate;--orbit-bg:radial-gradient(ellipse at 6% 15%,#fffefa 0%,#fbfcff 38%,#f0f6ff 100%);--orbit-ink:#080e2b;--orbit-muted:#7a87aa;--orbit-nav:#4d5a83;--orbit-accent:#4a72e7;--orbit-cloud:1;color:var(--orbit-ink)}
.orbit-delivery *{box-sizing:border-box}.orbit-delivery{margin:0}.orbit-delivery button,.orbit-delivery a{-webkit-tap-highlight-color:transparent}.orbit-delivery button{font:inherit;color:inherit;cursor:pointer;border:0;background:none}.orbit-delivery button:focus-visible,.orbit-delivery a:focus-visible{outline:2px solid #4776ee;outline-offset:6px}.orbit-delivery a{color:inherit;text-decoration:none}.orbit-delivery svg{display:block}.orbit-delivery button svg{width:22px;height:22px}
.orbit-delivery .page{height:100svh;min-height:760px;position:relative;overflow:hidden;background:var(--orbit-bg);display:flex;flex-direction:column}
.orbit-delivery .site-header{height:104px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 6.5%;position:relative;z-index:5}
.orbit-delivery .wordmark{display:flex;align-items:center;gap:13px;font-size:30px;font-weight:700;letter-spacing:-1.2px;color:var(--orbit-ink)}
.orbit-delivery .wordmark>svg{width:35px;height:35px}
.orbit-delivery .brand-type{display:flex;flex-direction:column;line-height:1;gap:4px}
.orbit-delivery .brand-type small{font-size:9px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:#7c96cc}
.orbit-delivery .site-header nav{position:absolute;left:50%;transform:translateX(-50%);display:flex;gap:40px;align-items:center}
.orbit-delivery .site-header nav button{font-size:15px;color:var(--orbit-nav);padding:12px 0;transition:color .2s;font-weight:500}
.orbit-delivery .site-header nav button:hover{color:#4574ec}
.orbit-delivery .header-cta{background:#4673eb;color:white;border-radius:23px;padding:13px 25px;font-size:14px;font-weight:600;box-shadow:0 4px 14px rgba(70,115,235,0.25);transition:background .2s,transform .2s}
.orbit-delivery .header-cta:hover{background:#345fda;transform:translateY(-1px)}
.orbit-delivery main{flex:1;min-height:0;display:flex}
.orbit-delivery .hero{width:100%;position:relative}
.orbit-delivery .hero-copy{position:relative;z-index:3;margin-left:6.5%;padding-top:clamp(70px,11vh,135px);width:46%;pointer-events:none}
.orbit-delivery .hero-copy button{pointer-events:auto}
.orbit-delivery .eyebrow{text-transform:uppercase;letter-spacing:.32em;font-size:12px;font-weight:700;color:#7a94df;margin:0 0 18px}
.orbit-delivery h1{font-size:clamp(48px,4.8vw,80px);font-weight:800;letter-spacing:-.045em;line-height:1.06;margin:0 0 22px;color:#080e2b}
.orbit-delivery h1 em{font-style:italic;font-weight:400;color:var(--orbit-accent);font-family:Georgia,serif}
.orbit-delivery .hero-description{color:var(--orbit-muted);font-size:clamp(16px,1.2vw,19px);line-height:1.5;letter-spacing:-.2px;margin:0 0 28px;max-width:440px}
.orbit-delivery .explore-button{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:16px 30px;border-radius:32px;background:#4773ec;color:white;font-size:16px;font-weight:600;min-height:54px;box-shadow:0 8px 24px rgba(71,115,236,0.28);transition:all .2s}
.orbit-delivery .explore-button:hover{background:#345fda;transform:translateY(-2px);box-shadow:0 12px 28px rgba(71,115,236,0.35)}
.orbit-delivery .visual-column{position:absolute;right:-5%;top:0;width:76%;height:calc(100% + 12px);z-index:1}
.orbit-delivery .planet-stage{height:100%;width:100%;position:relative;cursor:grab;touch-action:none;user-select:none;outline:none}
.orbit-delivery .planet-stage.dragging{cursor:grabbing}
.orbit-delivery .planet-caption{position:absolute;right:6.2%;top:17%;z-index:3;width:160px;pointer-events:none;color:#a4b5d8;transition:opacity .2s}
.orbit-delivery .planet-caption p{font-size:14px;line-height:1.35;font-style:italic;text-align:right;margin:0}
.orbit-delivery .planet-caption svg{width:150px;height:140px;margin-top:-15px;margin-left:-25px}
.orbit-delivery .cloud-bank{position:absolute;z-index:2;inset:auto -12% -90px 24%;height:250px;pointer-events:none;filter:blur(17px);opacity:var(--orbit-cloud)}
.orbit-delivery .cloud-bank i{position:absolute;bottom:0;background:radial-gradient(ellipse at 42% 34%,#fffdfb 27%,#f3f7ff 59%,#e5edfc88 75%,transparent 80%);border-radius:50%}
.orbit-delivery .cloud-bank i:nth-child(1){width:390px;height:200px;left:0;bottom:-28px;transform:rotate(-25deg)}
.orbit-delivery .cloud-bank i:nth-child(2){width:265px;height:195px;left:14%;bottom:32px}
.orbit-delivery .cloud-bank i:nth-child(3){width:270px;height:170px;left:29%;bottom:-2px}
.orbit-delivery .cloud-bank i:nth-child(4){width:350px;height:200px;right:7%;bottom:-20px}
.orbit-delivery .cloud-bank i:nth-child(5){width:280px;height:215px;right:-2%;bottom:70px}
.orbit-delivery .site-footer{position:absolute;bottom:35px;left:6.5%;right:5.1%;z-index:4;display:flex;align-items:flex-end;justify-content:space-between;pointer-events:none}
.orbit-delivery .site-footer p{margin:0;text-transform:uppercase;font-size:10px;letter-spacing:.22em;line-height:1.8;color:#94a7d1;font-weight:600}
.orbit-delivery .footer-left::before{content:'';display:block;width:25px;height:1px;background:#aebfdf;margin-bottom:12px}
.orbit-delivery .footer-right{text-align:right}
.orbit-delivery .motion-button{display:flex;gap:7px;align-items:center;color:#7b92be;pointer-events:auto;font-size:11px;font-weight:600;letter-spacing:.04em;padding:8px 12px;border-radius:16px;background:rgba(255,255,255,0.6);backdrop-filter:blur(6px);border:1px solid rgba(216,227,255,0.8);transition:all .2s}
.orbit-delivery .motion-button:hover{color:#4673eb;background:white}
.orbit-delivery .loading{position:absolute;top:42%;left:25%;right:20%;display:flex;align-items:center;justify-content:center;gap:12px;color:#8197c4;font-size:13px;pointer-events:none}
.orbit-delivery .loading>span{width:18px;height:18px;border:2px solid #d8e3ff;border-top-color:#648cf0;border-radius:50%;animation:loading 1s linear infinite}
@keyframes loading{to{transform:rotate(360deg)}}
.orbit-delivery .about-dialog{border:1px solid #dce5fa;border-radius:22px;padding:40px;max-width:500px;width:calc(100% - 32px);background:#f9fbff;color:#080e2b;box-shadow:0 25px 120px rgba(24,60,115,0.18)}
.orbit-delivery .about-dialog::backdrop{background:rgba(26,49,92,0.35);backdrop-filter:blur(8px)}
.orbit-delivery .about-dialog h2{font-size:32px;font-weight:700;letter-spacing:-1.2px;line-height:1.15;margin:18px 0 16px}
.orbit-delivery .about-dialog p{font-size:15px;line-height:1.7;color:var(--orbit-muted)}
.orbit-delivery .close-dialog{position:absolute;right:18px;top:14px;font-size:26px;color:#8194bf;cursor:pointer}
@media(max-width:900px){.orbit-delivery .site-header nav{display:none}.orbit-delivery .hero-copy{width:calc(100% - 40px);margin:0 20px;padding-top:20px}.orbit-delivery .visual-column{position:relative;width:120%;left:-10%;height:450px}}
`;
function OrbitDeliveryHero({ theme = "auto", assetBaseUrl = "https://cdn.jsdelivr.net/gh/fadeichev2121/planet@b3f70fbf4b577845b1d9d5947c9410fb4d925dae" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetBaseContext.Provider, {
        value: assetBaseUrl.replace(/\/$/, "") + "/",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "orbit-delivery",
            "data-theme": theme,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    children: css
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                    lineNumber: 1030,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(App, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
                    lineNumber: 1031,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
            lineNumber: 1029,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/orbit-delivery-hero.tsx",
        lineNumber: 1028,
        columnNumber: 5
    }, this);
}
_c7 = OrbitDeliveryHero;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "Courier");
__turbopack_context__.k.register(_c1, "ResponsiveCamera");
__turbopack_context__.k.register(_c2, "World2");
__turbopack_context__.k.register(_c3, "PlanetScene");
__turbopack_context__.k.register(_c4, "Arrow");
__turbopack_context__.k.register(_c5, "App");
__turbopack_context__.k.register(_c6, "StoryDialog");
__turbopack_context__.k.register(_c7, "OrbitDeliveryHero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/orbit-delivery-hero.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/ui/orbit-delivery-hero.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_ui_orbit-delivery-hero_tsx_0e3e_z_._.js.map