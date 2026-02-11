/**
 * Модуль для загрузки и работы с конфигурацией Build.json
 */

// export interface BuildConfig {
//     filename: string;
//     app: string;
//     name: string;
//     version: string;
//     language: string;
//     googlePlayUrl: string;
//     appStoreUrl: string;
// }

export class BuildConfigManager {
    static instance = null;
    config = null;
    isLoading = false;
    loadPromise = null;

    constructor() {}

    static getInstance() {
        if (!BuildConfigManager.instance) {
            BuildConfigManager.instance = new BuildConfigManager();
        }
        return BuildConfigManager.instance;
    }

    /**
     * Загружает конфигурацию из Build.json
     */
    async loadConfig() {
        if (this.config) {
            return this.config;
        }

        if (this.isLoading && this.loadPromise) {
            return this.loadPromise;
        }

        this.isLoading = true;
        this.loadPromise = this.fetchConfig();

        try {
            this.config = await this.loadPromise;
            return this.config;
        } finally {
            this.isLoading = false;
        }
    }

    async fetchConfig() {
        // Сначала пытаемся получить конфигурацию из встроенного в HTML window.BUILD_CONFIG
        if (typeof (window).BUILD_CONFIG !== 'undefined' && (window).BUILD_CONFIG) {
            const embeddedConfig = (window).BUILD_CONFIG;
            console.log('✅ Build.json загружен из встроенной конфигурации в HTML:', embeddedConfig);

            // Преобразуем в BuildConfig формат
            const config = {
                filename: embeddedConfig.filename || "{network}",
                app: embeddedConfig.app || "Basketball",
                name: embeddedConfig.name || "MyGameConcept",
                version: embeddedConfig.version || "v1.0",
                language: embeddedConfig.language || "EN",
                googlePlayUrl: embeddedConfig.googlePlayUrl || "",
                appStoreUrl: embeddedConfig.appStoreUrl || ""
            };

            // Устанавливаем язык в глобальную переменную СРАЗУ (синхронно)
            if (config.language) {
                const lang = config.language.toUpperCase();
                (window).BUILD_CONFIG = { ...embeddedConfig, language: lang };

                // Обновляем язык в LocalizationManager, если он уже создан
                try {
                    // const { LocalizationManager } = await import('./LocalizationManager');
                    // const langTyped = lang as any;
                    // if (['EN', 'PL', 'NL', 'IT', 'ES', 'DE'].includes(langTyped)) {
                    //     LocalizationManager.getInstance().setLanguage(langTyped);
                    //     console.log(`🌐 Язык установлен в LocalizationManager: ${langTyped}`);
                    // }
                } catch (err) {
                    // LocalizationManager еще не импортирован, это нормально
                }
            }

            return config;
        }

        // Fallback: пытаемся загрузить из файла (для разработки)
        try {
            const response = await fetch('/Build.json');
            if (!response.ok) {
                console.warn('⚠️ Build.json не найден, используем значения по умолчанию');
                return await this.getDefaultConfig();
            }
            const config = await response.json();
            console.log('✅ Build.json загружен из файла:', config);

            // Устанавливаем язык в глобальную переменную
            if (config.language) {
                const lang = config.language.toUpperCase();
                (window).BUILD_CONFIG = { ...config, language: lang };

                // Обновляем язык в LocalizationManager
                try {
                    // const { LocalizationManager } = await import('./LocalizationManager');
                    // const langTyped = lang as any;
                    // if (['EN', 'PL', 'NL', 'IT', 'ES', 'DE'].includes(langTyped)) {
                    //     LocalizationManager.getInstance().setLanguage(langTyped);
                    //     console.log(`🌐 Язык установлен в LocalizationManager: ${langTyped}`);
                    // }
                } catch (err) {
                    // LocalizationManager еще не импортирован, это нормально
                }
            }

            return config;
        } catch (error) {
            console.warn('⚠️ Ошибка загрузки Build.json:', error);
            return this.getDefaultConfig();
        }
    }

    async getDefaultConfig() {
        const defaultConfig = {
            filename: "{network}",
            app: "Basketball",
            name: "MyGameConcept",
            version: "v1.0",
            language: "EN",
            googlePlayUrl: "",
            appStoreUrl: ""
        };

        // Устанавливаем язык по умолчанию в глобальную переменную
        (window).BUILD_CONFIG = { language: 'EN' };

        // Устанавливаем язык по умолчанию в LocalizationManager
        try {
            // const { LocalizationManager } = await import('./LocalizationManager');
            // LocalizationManager.getInstance().setLanguage('EN');
        } catch (error) {
            console.warn('⚠️ Не удалось установить язык по умолчанию:', error);
        }

        return defaultConfig;
    }

    /**
     * Получить конфигурацию (синхронно, если уже загружена)
     */
    getConfig() {
        return this.config;
    }

    /**
     * Получить URL для Google Play
     */
    getGooglePlayUrl() {
        return this.config?.googlePlayUrl || '';
    }

    /**
     * Получить URL для App Store
     */
    getAppStoreUrl() {
        return this.config?.appStoreUrl || '';
    }

    /**
     * Получить имя сети (filename)
     */
    getNetwork() {
        return this.config?.filename || '';
    }

    /**
     * Проверить, является ли текущая сеть Ironsource
     */
    isIronsource() {
        const network = this.getNetwork().toLowerCase();
        return network === 'ironsource' || network === 'ironSource';
    }
}

