/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_LOCAL_STORAGE_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
