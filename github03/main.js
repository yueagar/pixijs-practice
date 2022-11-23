(($, _win) => {
    const renderer = new PIXI.Renderer({
        view: canvas,
        width: _win.innerWidth,
        height: _win.innerHeight,
        resolution: _win.devicePixelRatio,
        autoDensity: !0,
        antialias: !0
    });
    const resources = PIXI.Loader.shared.resources
        Sprite = PIXI.Sprite
        Text = PIXI.Text
        Style = PIXI.TextStyle
        Ticker = PIXI.Ticker
        Loader = PIXI.Loader.shared
        TextureCache = PIXI.utils.TextureCache
        Container = PIXI.Container
        Graphics = PIXI.Graphics
        RenderTexture = PIXI.RenderTexture;
    function draw() {
        const ctx = new Graphics
            stage = new Container;
        ctx.beginFill(0xff0000);
        ctx.drawRect(0, 0, 200, 200);
        ctx.endFill();
        ctx.beginFill(0xffff00);
        ctx.drawCircle(100, 100, 100);
        ctx.endFill();
        ctx.pivot.set(ctx.width/2, ctx.height/2);
        ctx.position.set(_win.innerWidth/2, _win.innerHeight/2);
        stage.addChild(ctx);
        renderer.render(stage);
        let ticker = new Ticker();
        ticker.add((delta) => {
            ctx.rotation += 0.05 * delta;
            renderer.render(stage);
        });
        ticker.start();
    };
    _win.addEventListener("resize", resize);
    function resize() {
        renderer.resize(_win.innerWidth, _win.innerHeight);
        draw();
    };
    resize();
    _win.renderer = renderer;
})(window.jQuery, window);