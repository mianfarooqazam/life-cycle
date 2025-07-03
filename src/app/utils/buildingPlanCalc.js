export const calculatePlotArea = (plotSize, marlaSize) => {
    return plotSize * marlaSize;
  };

/**
 * Calculate wall material requirements (bricks/blocks, cement, sand) and show calculation steps.
 * @param {number} wallVolume - Wall volume in ft³
 * @param {object} brickBlockType - Object from WallBrickBlock (from Materials.js)
 * @returns {object} Calculation result and steps
 */
export function calculateWallMaterials(wallVolume, brickBlockType) {
  // Parse values as numbers
  const wallVol = parseFloat(wallVolume);
  const brickVolWithMortar = parseFloat(brickBlockType.brickvolumewithmortar);
  const brickVolWithoutMortar = parseFloat(brickBlockType.brickvolumewithoutmortar);

  // 1. Number of bricks/blocks
  const numBricks = wallVol / brickVolWithMortar;

  // 2. Volume of bricks without mortar
  const volBricksWithoutMortar = numBricks * brickVolWithoutMortar;

  // 3. Actual quantity of mortar
  const actualMortar = wallVol - volBricksWithoutMortar;

  // 4. Add 15% wastage
  const mortarWithWastage = actualMortar * 1.15;

  // 5. Add 25% dry volume
  const dryMortar = mortarWithWastage * 1.25;

  // 6. Cement and sand in 1:4 ratio (by volume)
  // Total parts = 1 (cement) + 4 (sand) = 5
  const cementPart = dryMortar * (1 / 5);
  const sandPart = dryMortar * (4 / 5);

  // 7. Convert cement volume to bags (1 bag = 1.25 ft³)
  const cementBags = cementPart / 1.25;

  // Prepare calculation steps for display
  const steps = [
    `Wall volume = ${wallVol.toFixed(2)} ft³`,
    `Number of bricks/blocks = Wall volume / Brick volume with mortar = ${wallVol.toFixed(2)} / ${brickVolWithMortar} = ${numBricks.toFixed(0)}`,
    `Volume of bricks without mortar = Number of bricks * Brick volume without mortar = ${numBricks.toFixed(0)} * ${brickVolWithoutMortar} = ${volBricksWithoutMortar.toFixed(2)} ft³`,
    `Actual quantity of mortar = Wall volume - Volume of bricks without mortar = ${wallVol.toFixed(2)} - ${volBricksWithoutMortar.toFixed(2)} = ${actualMortar.toFixed(2)} ft³`,
    `Add 15% wastage: ${actualMortar.toFixed(2)} * 1.15 = ${mortarWithWastage.toFixed(2)} ft³`,
    `Add 25% dry volume: ${mortarWithWastage.toFixed(2)} * 1.25 = ${dryMortar.toFixed(2)} ft³`,
    `Cement (1 part): ${dryMortar.toFixed(2)} * 1/5 = ${cementPart.toFixed(2)} ft³`,
    `Sand (4 parts): ${dryMortar.toFixed(2)} * 4/5 = ${sandPart.toFixed(2)} ft³`,
    `Cement in bags: ${cementPart.toFixed(2)} / 1.25 = ${cementBags.toFixed(2)} bags`
  ];

  return {
    numBricks: Math.round(numBricks),
    cementVolume: cementPart,
    sandVolume: sandPart,
    cementBags: cementBags,
    steps,
  };
}