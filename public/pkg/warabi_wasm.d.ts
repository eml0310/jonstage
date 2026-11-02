/* tslint:disable */
/* eslint-disable */

export class SearchEngine {
    free(): void;
    [Symbol.dispose](): void;
    build_id(): string;
    cached(id: number): boolean;
    evict(id: number): void;
    load_page(id: number, page: Uint8Array | number[], positions: Uint8Array | number[]): void;
    constructor(bytes: Uint8Array | number[]);
    /**
     * Use token IDs from the latest search, without repeating dictionary traversal.
     */
    result(id: number): any;
    search(query: string, mode: string, limit: number): any;
    validate_manifest(bytes: Uint8Array | number[]): void;
}

export function mount_search_ui(): void;

/**
 * Called when the generated JS initializes Wasm.
 */
export function start(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_searchengine_free: (a: number, b: number) => void;
    readonly mount_search_ui: () => [number, number];
    readonly searchengine_build_id: (a: number) => [number, number];
    readonly searchengine_cached: (a: number, b: number) => number;
    readonly searchengine_evict: (a: number, b: number) => void;
    readonly searchengine_load_page: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
    readonly searchengine_new: (a: number, b: number) => [number, number, number];
    readonly searchengine_result: (a: number, b: number) => [number, number, number];
    readonly searchengine_search: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number];
    readonly searchengine_validate_manifest: (a: number, b: number, c: number) => [number, number];
    readonly start: () => void;
    readonly wasm_bindgen_fdbe15f356db42fc___convert__closures_____invoke___js_sys_e74f5aea62fcf046___Function_fn_wasm_bindgen_fdbe15f356db42fc___JsValue_____wasm_bindgen_fdbe15f356db42fc___sys__Undefined___js_sys_e74f5aea62fcf046___Function_fn_wasm_bindgen_fdbe15f356db42fc___JsValue_____wasm_bindgen_fdbe15f356db42fc___sys__Undefined_______true_: (a: number, b: number, c: any, d: any) => void;
    readonly wasm_bindgen_fdbe15f356db42fc___convert__closures_____invoke___wasm_bindgen_fdbe15f356db42fc___JsValue__core_37ee0ce0c4cd57d5___result__Result_____wasm_bindgen_fdbe15f356db42fc___JsError___true_: (a: number, b: number, c: any) => [number, number];
    readonly wasm_bindgen_fdbe15f356db42fc___convert__closures_____invoke___web_sys_e2015bc64d905883___features__gen_KeyboardEvent__KeyboardEvent______true_: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen_fdbe15f356db42fc___convert__closures_____invoke___web_sys_e2015bc64d905883___features__gen_KeyboardEvent__KeyboardEvent______true__13: (a: number, b: number, c: any) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_destroy_closure: (a: number, b: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
