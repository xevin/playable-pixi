import { BuildConfigManager } from './BuildConfig';

/**
 * Менеджер для обработки установки приложения
 * Обрабатывает переходы по ссылкам через различные SDK
 */
export class InstallManager {
    buildConfigManager;

    constructor() {
        this.buildConfigManager = BuildConfigManager.getInstance();
    }

    /**
     * Функция проверки валидности ссылки
     */
    isUrlValid(url) {
        return url !== undefined &&
               url !== null &&
               url.trim() !== '' &&
               !url.includes('ССЫЛКУ_СЮДА') &&
               url !== 'about:blank' &&
               (url.startsWith('http://') || url.startsWith('https://'));
    }

    /**
     * Получить URL для конкретной платформы
     */
    getPlatformSpecificUrl(
        googlePlayUrl,
        appStoreUrl,
        isAndroid,
        isIOS
    ) {
        if (isAndroid && this.isUrlValid(googlePlayUrl)) {
            return googlePlayUrl;
        } else if (isIOS && this.isUrlValid(appStoreUrl)) {
            return appStoreUrl;
        } else if (!isAndroid && !isIOS) {
            // Для десктопа используем любую валидную ссылку
            if (this.isUrlValid(googlePlayUrl)) {
                return googlePlayUrl;
            } else if (this.isUrlValid(appStoreUrl)) {
                return appStoreUrl;
            }
        }
        return null;
    }

    /**
     * Функция SDK загрузки
     */
    async triggerSDKDownload() {
        // Загружаем конфигурацию, если еще не загружена
        await this.buildConfigManager.loadConfig();

        const googlePlayUrl = this.buildConfigManager.getGooglePlayUrl();
        const appStoreUrl = this.buildConfigManager.getAppStoreUrl();

        // Проверяем обе ссылки на валидность
        const hasValidGoogleUrl = this.isUrlValid(googlePlayUrl);
        const hasValidAppStoreUrl = this.isUrlValid(appStoreUrl);

        // Если обе ссылки невалидны - выходим
        if (!hasValidGoogleUrl && !hasValidAppStoreUrl) {
            console.warn("Store URLs are empty, contain placeholder, or are invalid. Skipping download/redirect");
            return;
        }

        const isAndroid = /Android/.test(navigator.userAgent);
        const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

        // Проверяем, есть ли валидная ссылка для текущей платформы
        let platformHasValidUrl = false;
        if (isAndroid && hasValidGoogleUrl) {
            platformHasValidUrl = true;
        } else if (isIOS && hasValidAppStoreUrl) {
            platformHasValidUrl = true;
        } else if (!isAndroid && !isIOS && (hasValidGoogleUrl || hasValidAppStoreUrl)) {
            // Для других платформ (десктоп) используем любую валидную
            platformHasValidUrl = true;
        }

        if (!platformHasValidUrl) {
            console.warn("No valid store URL for the current platform. Skipping download/redirect");
            return;
        }

        // Обработка через различные SDK (только если есть валидная ссылка)
        if (typeof (window).sdk !== 'undefined' && (window).sdk.install) {
            // Передаем валидную ссылку в SDK, если API позволяет
            try {
                (window).sdk.install();
                console.log('✅ SDK install вызван');
                return;
            } catch (e) {
                console.error('SDK install failed:', e);
            }
        }

        if ((window).sdk?.download) {
            try {
                (window).sdk.download();
                console.log('✅ SDK download вызван');
                return;
            } catch (e) {
                console.error('SDK download failed:', e);
            }
        }

        if ((window).sdk?.openStore) {
            try {
                (window).sdk.openStore();
                console.log('✅ SDK openStore вызван');
                return;
            } catch (e) {
                console.error('SDK openStore failed:', e);
            }
        }

        if ((window).mraid?.open) {
            // Для MRAID передаем конкретную ссылку
            const url = this.getPlatformSpecificUrl(googlePlayUrl, appStoreUrl, isAndroid, isIOS);
            if (url && this.isUrlValid(url)) {
                try {
                    (window).mraid.open(url);
                    console.log('✅ MRAID open вызван с URL:', url);
                    return;
                } catch (e) {
                    console.error('MRAID open failed:', e);
                }
            }
        }

        if ((window).CTAsdk?.install) {
            try {
                (window).CTAsdk.install();
                console.log('✅ CTAsdk install вызван');
                return;
            } catch (e) {
                console.error('CTAsdk install failed:', e);
            }
        }

        if ((window).fbPlayableAd?.onCTAClick) {
            try {
                (window).fbPlayableAd.onCTAClick();
                console.log('✅ fbPlayableAd onCTAClick вызван');
                return;
            } catch (e) {
                console.error('fbPlayableAd onCTAClick failed:', e);
            }
        }

        // Fallback: открываем валидную ссылку напрямую
        console.warn("No SDK found for download handling, using fallback");
        const url = this.getPlatformSpecificUrl(googlePlayUrl, appStoreUrl, isAndroid, isIOS);

        if (url && this.isUrlValid(url)) {
            try {
                window.open(url, '_blank');
                console.log('✅ Fallback: открыта ссылка:', url);
            } catch (e) {
                console.error('Fallback redirect failed:', e);
            }
        } else {
            console.warn("No valid URL available for fallback redirect");
        }
    }
}

