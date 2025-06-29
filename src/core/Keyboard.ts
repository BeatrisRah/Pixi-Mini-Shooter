export class Keyboard {
    private keys: Record<string, boolean> = {};
    private prevKeys: Record<string, boolean> = {};
    constructor() {
        window.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("keyup", this.onKeyUp);
    }

    private onKeyDown = (e: KeyboardEvent): void => {
        this.keys[e.key.toLowerCase()] = true;
    };

    private onKeyUp = (e: KeyboardEvent): void => {
        this.keys[e.key.toLowerCase()] = false;
    };

    public isDown(key: string): boolean {
        return this.keys[key.toLowerCase()] ?? false;
    }

    public isUp(key: string): boolean {
        return !this.isDown(key);
    }

    public anyDown(...keys: string[]): boolean {
        return keys.some((k) => this.isDown(k));
    }
    
    public wasPressed(key: string): boolean {
        const lower = key.toLowerCase();
        return this.keys[lower] && !this.prevKeys[lower];
    }

    public update(): void {
        this.prevKeys = { ...this.keys };
    }

    public destroy(): void {
        window.removeEventListener("keydown", this.onKeyDown);
        window.removeEventListener("keyup", this.onKeyUp);
    }
}