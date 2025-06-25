import { Assets } from "pixi.js";

type Asset = {
    alias: string,
    src: string
}


export default class AssetLoader {
    private assetFileUrls = this.importAssetFiles();
    manifest: Asset[]

    constructor() {
        this.manifest = this.generateManifest()
    }

    public async loadAssets() {
        Assets.addBundle('default', this.manifest);
        await Assets.loadBundle('default');
    }

    importAssetFiles() {
        const assetFiles = import.meta.glob("/public/assets/**/*.*");

        return Object.keys(assetFiles);
    }
    generateManifest() {
        const assetManifest: Asset[] = []
        const assetPathRegexp = /public\/assets\/(?<category>[\w.-]+)\/(?<name>[\w.-]+)\.(?<ext>\w+)$/;

        this.assetFileUrls.forEach((assetPath) => {
            const match = assetPathRegexp.exec(assetPath);

            if (!match || !match.groups) {
                return console.error(
                    `Invalid asset path: ${assetPath}, should match ${assetPathRegexp}`
                );
            }

            const { category, name, ext } = match.groups;

            if (category === "spritesheets" && ext !== "json") {
                return;
            }

            assetManifest.push({
                alias: name,
                src: assetPath.replace('/public', '')
            });
        });

        return assetManifest;
    }
}