export const SHOP_HOST = "shop.dreamplaypianos.com";
export const SHOP_BASE_URL = `https://${SHOP_HOST}`;
export const SHOP_HOME_URL = `${SHOP_BASE_URL}/`;

export const SHOP_LINKS = {
    home: SHOP_HOME_URL,
    keyboards: `${SHOP_HOME_URL}#keyboards`,
    bundles: `${SHOP_HOME_URL}#bundles`,
    dreamplayOne: `${SHOP_HOME_URL}#dreamplay-one`,
    dreamplayOnePro: `${SHOP_HOME_URL}#dreamplay-one-pro`,
    benches: `${SHOP_HOME_URL}#benches`,
} as const;
