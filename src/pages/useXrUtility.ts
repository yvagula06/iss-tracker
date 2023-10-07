export function useXrUtility(canvas: HTMLCanvasElement) {
  async function checkSupport(): Promise<boolean> {
    if (!navigator.xr) return false;
    let result = await navigator.xr.isSessionSupported('immersive-ar')

    return result;
  }

  async function startSession() {
    if (!navigator.xr || !await checkSupport()) throw new Error('XR not supported')
    
    let session = await navigator.xr.requestSession('immersive-ar', {
      optionalFeatures: ['dom-overlay'],
      requiredFeatures: ['local'],
    })

    let ctx = canvas.getContext('webgl', { xrCompatible: true })
    if (!ctx) throw new Error('Failed to get context')
    // if (!session.renderState.baseLayer) throw new Error('Failed to get XR buffer')

    // ctx.bindFramebuffer(ctx.FRAMEBUFFER, session.renderState.baseLayer.framebuffer)
    session.updateRenderState({ baseLayer: new XRWebGLLayer(session, ctx) })

    let refSpace = await session.requestReferenceSpace('local')

    return { session, ctx, refSpace }
  }

  return {
    checkSupport, startSession
  }
}