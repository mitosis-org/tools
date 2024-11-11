export declare function getFileChecksum(filePath: string): string;
export declare function loadCache(toolName: string): Promise<Record<string, string> | null>;
export declare function saveCache(toolName: string, cache: Record<string, string>): Promise<void>;
export declare function hrtime(): number;
export declare function timeDiff(start: number): string;
//# sourceMappingURL=utils.d.ts.map