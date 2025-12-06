interface RybbitConfig {
    analyticsHost: string;
    siteId: string;
    debounce?: number;
    skipPatterns?: string[];
    maskPatterns?: string[];
    debug?: boolean;
    replayPrivacyConfig?: {
        maskAllInputs?: boolean;
        maskTextSelectors?: string[];
    };
}
type PropertyValue = string | number | boolean;
interface TrackProperties {
    [key: string]: PropertyValue | PropertyValue[];
}
type PageChangeCallback = (pathname: string, previousPathname: string) => void;
interface RybbitAPI {
    init: (config: RybbitConfig) => Promise<void>;
    pageview: (path?: string) => void;
    event: (name: string, properties?: TrackProperties) => void;
    outbound: (url: string, text?: string, target?: string) => void;
    identify: (userId: string, traits?: Record<string, unknown>) => void;
    setTraits: (traits: Record<string, unknown>) => void;
    clearUserId: () => void;
    getUserId: () => string | null;
    cleanup: () => void;
    captureError: (error: Error | ErrorEvent, context?: TrackProperties) => void;
    onPageChange: (callback: PageChangeCallback) => () => void;
    startSessionReplay: () => void;
    stopSessionReplay: () => void;
    isSessionReplayActive: () => boolean;
}

declare const rybbit: RybbitAPI;

export { rybbit as default };
