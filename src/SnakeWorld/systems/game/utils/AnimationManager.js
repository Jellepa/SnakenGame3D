/* // Simple easing functions
const Easing = {
  Linear: (t) => t,
  QuadraticIn: (t) => t * t,
  QuadraticOut: (t) => t * (2 - t),
  QuadraticInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  CubicIn: (t) => t * t * t,
  CubicOut: (t) => --t * t * t + 1,
  CubicInOut: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  ElasticIn: (t) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
  },
  ElasticOut: (t) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
  },
  BounceOut: (t) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },
};

// Simple Tween class
class SimpleTween {
  constructor(object) {
    this.object = object;
    this.startValues = {};
    this.endValues = {};
    this.duration = 1000;
    this.easingFunction = Easing.Linear;
    this.onUpdateCallback = null;
    this.onCompleteCallback = null;
    this.startTime = null;
    this.isActive = false;
  }

  to(endValues, duration) {
    this.endValues = endValues;
    this.duration = duration;
    return this;
  }

  easing(easingFunction) {
    this.easingFunction = easingFunction;
    return this;
  }

  onUpdate(callback) {
    this.onUpdateCallback = callback;
    return this;
  }

  onComplete(callback) {
    this.onCompleteCallback = callback;
    return this;
  }

  start() {
    // Store starting values
    for (let key in this.endValues) {
      this.startValues[key] = this.object[key];
    }

    this.startTime = performance.now();
    this.isActive = true;
    this.update();
    return this;
  }

  update() {
    if (!this.isActive) return;

    const currentTime = performance.now();
    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    const easedProgress = this.easingFunction(progress);

    // Update object values
    for (let key in this.endValues) {
      const start = this.startValues[key];
      const end = this.endValues[key];
      this.object[key] = start + (end - start) * easedProgress;
    }

    // Call update callback
    if (this.onUpdateCallback) {
      this.onUpdateCallback();
    }

    // Check if animation is complete
    if (progress >= 1) {
      this.isActive = false;
      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
    } else {
      // Continue animation
      requestAnimationFrame(() => this.update());
    }
  }

  stop() {
    this.isActive = false;
  }
}

class AnimationManager {
  constructor(scene, loop) {
    this.scene = scene;
    this.loop = loop;
    this.activeAnimations = new Map(); // Track animations by mesh ID
  }

  // Generic animation method that can be customized per mesh type
  animateEndOfLife(mesh, meshType, onComplete) {
    console.log(
      "AnimateEndOfLife called for mesh:",
      mesh,
      "type:",
      meshType,
      "uuid:",
      mesh?.uuid
    );

    if (!mesh || !mesh.uuid) {
      console.warn("Invalid mesh provided for end-of-life animation");
      if (onComplete) onComplete();
      return;
    }

    // Prevent multiple animations on the same mesh
    if (this.activeAnimations.has(mesh.uuid)) {
      console.log("Animation already active for mesh uuid:", mesh.uuid);
      return;
    }

    console.log("Starting new animation for mesh uuid:", mesh.uuid);

    // Store original values
    const originalScale = { x: mesh.scale.x, y: mesh.scale.y, z: mesh.scale.z };
    const originalOpacity = this.getMeshOpacity(mesh);

    // Create animation based on mesh type
    const animationConfig = this.getAnimationConfig(meshType);

    if (animationConfig.celebratory) {
      // Two-phase celebratory animation for fruits
      this.animateCelebratoryEndOfLife(
        mesh,
        animationConfig,
        originalScale,
        originalOpacity,
        onComplete
      );
    } else {
      // Simple fade out for non-celebratory meshes
      this.animateSimpleEndOfLife(
        mesh,
        animationConfig,
        originalScale,
        originalOpacity,
        onComplete
      );
    }
  }

  // Celebratory two-phase animation for fruits
  animateCelebratoryEndOfLife(
    mesh,
    config,
    originalScale,
    originalOpacity,
    onComplete
  ) {
    const animationData = {
      scale: originalScale.x,
      opacity: originalOpacity,
      rotation: 0,
    };

    // Phase 1: Grow and spin (celebration)
    const phase1Duration = config.duration * 0.6; // 60% of total duration
    const phase2Duration = config.duration * 0.4; // 40% of total duration

    const phase1Tween = new SimpleTween(animationData)
      .to(
        {
          scale: config.finalScale,
          opacity: 1.0, // Full opacity during celebration
          rotation: Math.PI * 4, // Two full spins
        },
        phase1Duration
      )
      .easing(Easing.ElasticOut) // Bouncy growth
      .onUpdate(() => {
        // Update scale with bouncy effect
        mesh.scale.set(
          animationData.scale,
          animationData.scale,
          animationData.scale
        );

        // Add spinning rotation
        mesh.rotation.y = animationData.rotation;

        // Keep full opacity during celebration
        this.setMeshOpacity(mesh, animationData.opacity);
      })
      .onComplete(() => {
        // Phase 2: Quick fade out
        const phase2Tween = new SimpleTween(animationData)
          .to(
            {
              scale: config.finalScale * 1.2, // Grow slightly more
              opacity: 0,
              rotation: animationData.rotation + Math.PI, // Half spin more
            },
            phase2Duration
          )
          .easing(Easing.QuadraticIn) // Quick fade
          .onUpdate(() => {
            mesh.scale.set(
              animationData.scale,
              animationData.scale,
              animationData.scale
            );
            mesh.rotation.y = animationData.rotation;
            this.setMeshOpacity(mesh, animationData.opacity);
          })
          .onComplete(() => {
            // Clean up
            this.activeAnimations.delete(mesh.uuid);
            this.activeAnimations.delete(mesh.uuid + "_phase2");

            // Properly remove and dispose of the mesh
            this.cleanupMesh(mesh);

            // Call completion callback
            if (onComplete) onComplete();
          })
          .start();

        // Track phase 2
        this.activeAnimations.set(mesh.uuid + "_phase2", phase2Tween);
      })
      .start();

    // Track phase 1
    this.activeAnimations.set(mesh.uuid, phase1Tween);
  }

  // Simple fade animation for non-celebratory meshes
  animateSimpleEndOfLife(
    mesh,
    config,
    originalScale,
    originalOpacity,
    onComplete
  ) {
    const animationData = {
      scale: originalScale.x,
      opacity: originalOpacity,
    };

    const tween = new SimpleTween(animationData)
      .to(
        {
          scale: config.finalScale,
          opacity: config.finalOpacity,
        },
        config.duration
      )
      .easing(config.easing)
      .onUpdate(() => {
        // Update scale
        mesh.scale.set(
          animationData.scale,
          animationData.scale,
          animationData.scale
        );

        // Update opacity
        this.setMeshOpacity(mesh, animationData.opacity);
      })
      .onComplete(() => {
        // Clean up
        this.activeAnimations.delete(mesh.uuid);

        // Properly remove and dispose of the mesh
        this.cleanupMesh(mesh);

        // Call completion callback
        if (onComplete) onComplete();
      })
      .start();

    // Track the animation
    this.activeAnimations.set(mesh.uuid, tween);
  }

  // Animation configurations for different mesh types
  getAnimationConfig(meshType) {
    const configs = {
      fruit: {
        duration: 800,
        finalScale: 2.5, // Grow big before disappearing
        finalOpacity: 0,
        easing: Easing.ElasticIn,
        celebratory: true,
      },
      specialFruit: {
        duration: 1200,
        finalScale: 3.0, // Even bigger for special fruit
        finalOpacity: 0,
        easing: Easing.ElasticIn,
        celebratory: true,
      },
      snakeHead: {
        duration: 1000,
        finalScale: 0.1,
        finalOpacity: 0,
        easing: Easing.CubicInOut,
        celebratory: false,
      },
      snakeBody: {
        duration: 600,
        finalScale: 0,
        finalOpacity: 0,
        easing: Easing.QuadraticOut,
        celebratory: false,
      },
    };

    return configs[meshType] || configs.fruit; // Default to fruit animation
  }

  // Helper method to get mesh opacity
  getMeshOpacity(mesh) {
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        return mesh.material[0].opacity !== undefined
          ? mesh.material[0].opacity
          : 1;
      } else {
        return mesh.material.opacity !== undefined ? mesh.material.opacity : 1;
      }
    }
    return 1;
  }

  // Helper method to set mesh opacity
  setMeshOpacity(mesh, opacity) {
    console.log("Setting opacity to:", opacity, "for mesh:", mesh);
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => {
          console.log(
            "Setting material opacity (array):",
            material,
            "to:",
            opacity
          );
          material.transparent = true;
          material.opacity = opacity;
          material.needsUpdate = true; // Force material update
        });
      } else {
        console.log(
          "Setting material opacity (single):",
          mesh.material,
          "to:",
          opacity
        );
        mesh.material.transparent = true;
        mesh.material.opacity = opacity;
        mesh.material.needsUpdate = true; // Force material update
      }
    }

    // Also check children for materials
    mesh.traverse((child) => {
      if (child.material && child !== mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            material.transparent = true;
            material.opacity = opacity;
            material.needsUpdate = true;
          });
        } else {
          child.material.transparent = true;
          child.material.opacity = opacity;
          child.material.needsUpdate = true;
        }
      }
    });
  }

  // Method to immediately remove a mesh without animation (fallback)
  removeImmediately(mesh, onComplete) {
    this.scene.remove(mesh);
    const index = this.loop.updatables.indexOf(mesh);
    if (index !== -1) {
      this.loop.updatables.splice(index, 1);
    }
    if (onComplete) onComplete();
  }

  // Update method to be called in the game loop
  update() {
    // Our SimpleTween handles updates automatically via requestAnimationFrame
    // This method is here for future extensions if needed
  }

  // Clean up all animations
  dispose() {
    this.activeAnimations.forEach((tween) => {
      if (tween && typeof tween.stop === "function") {
        tween.stop();
      }
    });
    this.activeAnimations.clear();
  }

  // Helper method to ensure mesh cleanup
  cleanupMesh(mesh) {
    if (mesh && mesh.parent) {
      mesh.parent.remove(mesh);
    }

    // Clean up materials and geometries
    if (mesh) {
      mesh.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }
  }

  // Method to animate material color changes
  animateColorChange(mesh, targetColor, duration = 2000, onComplete = null) {
    const animationData = {
      r: 0,
      g: 0,
      b: 0
    };

    // Get current color from the mesh's material
    let currentColor = { r: 0, g: 0, b: 0 };
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        currentColor = mesh.material[0].color;
      } else {
        currentColor = mesh.material.color;
      }
    }

    // Set initial values
    animationData.r = currentColor.r;
    animationData.g = currentColor.g;
    animationData.b = currentColor.b;

    // Parse target color (assuming it's a hex string like "#8B4513" for brown)
    const targetR = parseInt(targetColor.slice(1, 3), 16) / 255;
    const targetG = parseInt(targetColor.slice(3, 5), 16) / 255;
    const targetB = parseInt(targetColor.slice(5, 7), 16) / 255;

    const tween = new SimpleTween(animationData)
      .to(
        {
          r: targetR,
          g: targetG,
          b: targetB
        },
        duration
      )
      .easing(Easing.QuadraticOut)
      .onUpdate(() => {
        this.setMeshColor(mesh, animationData.r, animationData.g, animationData.b);
      })
      .onComplete(() => {
        this.activeAnimations.delete(mesh.uuid + "_color");
        if (onComplete) onComplete();
      })
      .start();

    this.activeAnimations.set(mesh.uuid + "_color", tween);
  }

  // Method to animate sinking into ground
  animateSinking(mesh, sinkDepth = -2, duration = 3000, onComplete = null) {
    const originalY = mesh.position.y;
    const animationData = {
      y: originalY
    };

    const tween = new SimpleTween(animationData)
      .to(
        {
          y: originalY + sinkDepth
        },
        duration
      )
      .easing(Easing.QuadraticIn)
      .onUpdate(() => {
        mesh.position.y = animationData.y;
      })
      .onComplete(() => {
        this.activeAnimations.delete(mesh.uuid + "_sink");
        if (onComplete) onComplete();
      })
      .start();

    this.activeAnimations.set(mesh.uuid + "_sink", tween);
  }

  // Combined death animation for snake parts
  animateSnakeDeath(snakeHeadMesh, snakeTailMeshArray, onComplete = null) {
    const brownColor = "#8B4513"; // Brown color hex
    const colorDuration = 1500; // 1.5 seconds to turn brown
    const sinkDuration = 2500; // 2.5 seconds to sink
    const sinkDelay = 1000; // Start sinking 1 second after color change begins

    let completedAnimations = 0;
    const totalParts = 1 + snakeTailMeshArray.length; // head + all tail segments

    const onPartComplete = () => {
      completedAnimations++;
      if (completedAnimations === totalParts * 2 && onComplete) { // *2 because each part has color + sink
        onComplete();
      }
    };

    // Animate snake head
    if (snakeHeadMesh) {
      // Color change for head
      this.animateColorChange(snakeHeadMesh, brownColor, colorDuration, onPartComplete);
      
      // Sinking for head (delayed)
      setTimeout(() => {
        this.animateSinking(snakeHeadMesh, -2, sinkDuration, onPartComplete);
      }, sinkDelay);
    }

    // Animate all tail segments
    snakeTailMeshArray.forEach((tailMesh, index) => {
      if (tailMesh) {
        // Stagger the animations slightly for a wave effect
        const staggerDelay = index * 150; // 150ms delay between each segment
        
        setTimeout(() => {
          // Color change for tail segment
          this.animateColorChange(tailMesh, brownColor, colorDuration, onPartComplete);
          
          // Sinking for tail segment (delayed)
          setTimeout(() => {
            this.animateSinking(tailMesh, -2, sinkDuration, onPartComplete);
          }, sinkDelay);
        }, staggerDelay);
      }
    });
  }

  // Helper method to set mesh color
  setMeshColor(mesh, r, g, b) {
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => {
          material.color.setRGB(r, g, b);
          material.needsUpdate = true;
        });
      } else {
        mesh.material.color.setRGB(r, g, b);
        mesh.material.needsUpdate = true;
      }
    }

    // Also update child meshes (for snake head with eyes, etc.)
    mesh.traverse((child) => {
      if (child.material && child !== mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            material.color.setRGB(r, g, b);
            material.needsUpdate = true;
          });
        } else {
          child.material.color.setRGB(r, g, b);
          child.material.needsUpdate = true;
        }
      }
    });
  }

  // Method to stop all active animations
  stopAllAnimations() {
    this.activeAnimations.forEach((tween, key) => {
      if (tween && tween.stop) {
        tween.stop();
      }
    });
    this.activeAnimations.clear();
  }
}

export { AnimationManager };
 */
