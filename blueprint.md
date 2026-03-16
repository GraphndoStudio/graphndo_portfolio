# Synapse Studio: Technical Blueprint

## 1. Atmospheric Background Environment (The "Liquid Soul")
The background is a reactive 3D ecosystem built with **Three.js** that serves as the foundation for the app's cinematic feel.

- **3D Geometry**: A high-density `IcosahedronGeometry` (128 segments) creates the organic "blob" at the core.
- **Materiality**: Utilizes `MeshPhysicalMaterial` with high transmission (0.95), clearcoat (1.0), and ior (1.45) to achieve a "glass-liquid" aesthetic that refracts light.
- **Procedural Animation**: Vertex displacement is driven by a custom noise function using sine and cosine waves in the `requestAnimationFrame` loop, causing the mesh to "breathe" organically.
- **Dynamic Interaction**:
    - **Mouse Parallax**: Both the mesh rotation and position are lerped based on cursor coordinates, creating a deep spatial sense.
    - **Scroll-Triggered Blur**: Using **GSAP ScrollTrigger**, the background transitions from sharp to a 30px blur and 40% opacity as the user scrolls away from the Hero section to maintain focus on content.

## 2. Cinematic Motion System
A cohesive animation language applied across all sections using **GSAP** and **Framer Motion**.

- **Global Smooth Scroll**: Integrated **Lenis.js** for high-frequency, physics-based scrolling that synchronizes perfectly with ScrollTrigger.
- **Entrance Logic**:
    - **Section Reveal**: Major containers use a 100px slide-up with an `expo.out` ease.
    - **Persistent Visibility**: `toggleActions: "play none none none"` ensures once a section is revealed, it stays visible to prevent "blank page" flickering.
- **Horizontal Navigation (Locked Works)**:
    - Replaced vertical scroll-pinning with a manual, button-triggered horizontal slider.
    - Features GSAP-powered transitions, a dynamic progress bar, and an index counter (e.g., `01 / 04`).

## 3. Premium Typography & Text Reveals
Text is treated as an editorial design element rather than just information.

- **Hero Character Pop**: The "SHARUKH H" title is split into individual characters. Each is wrapped in an overflow mask (`.char-mask`) and animated upwards with a staggered delay for a high-end cinematic entrance.
- **Line-by-Line Storytelling**: Paragraphs in the About section use a staggered `.reveal-p` class to guide the eye sequentially through the narrative.
- **Editorial Depth**: The Journey section uses massive, low-opacity "background years" (5% white) that act as anchor points while the foreground milestones fade in over them.

## 4. Technical Odyssey (Timeline)
The vertical journey section features real-time scroll synchronization.

- **Dynamic Progress Line**: A central SVG/DIV line that draws its height (scaleY) from 0 to 1 based on the `scrollTrigger.progress`.
- **Milestone Anchors**: Each step features a pulsating glowing dot and a glassmorphism card that slides in from the left/right depending on its index.

## 5. Performance & Optimization
- **LCP Optimization**: `priority` attribute added to the Hero image and the first Project exhibition image.
- **Responsive Sizing**: `sizes` attribute implemented on all `fill` images to optimize browser fetching and resolve Next.js warnings.
- **Hydration Safety**: Time-sensitive and browser-specific values (like Three.js initialization) are wrapped in `useEffect` to prevent React hydration mismatches.

## 6. Design Tokens
- **Background**: Deep Space (#0B0B0F / #030305)
- **Primary**: Electric Blue (#3B82F6)
- **Secondary**: Cyber Grape (#8B5CF6)
- **Typography**: Space Grotesk (Variable weight)
