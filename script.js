(() => {
    const { createElement: h, useState, useRef, useLayoutEffect, memo, Fragment } = React;

    const Header = () => {
        const [opened, setOpened] = useState(false);
        return h(
            "header",
            { className: "header" },
            h("a", { href: "/", className: "header__logo", "aria-label": "Яндекс.Дом" }),
            h(
                "button",
                { className: "header__menu", "aria-expanded": opened, onClick: () => setOpened(v => !v) },
                h("span", { className: "header__menu-text a11y-hidden" }, opened ? "Закрыть меню" : "Открыть меню"),
            ),
            h(
                "ul",
                { className: `header__links${opened ? " header__links_opened" : ""}` },
                [
                    ["Сводка", "/", true],
                    ["Устройства", "/devices"],
                    ["Сценарии", "/scripts"],
                ].map(([label, href, current]) =>
                    h(
                        "li",
                        { key: href, className: "header__item" },
                        h(
                            "a",
                            {
                                href,
                                className: `header__link${current ? " header__link_current" : ""}`,
                                ...(current && { "aria-current": "page" }),
                            },
                            label,
                        ),
                    ),
                ),
            ),
        );
    };

    const EventCard = memo(({ slim, icon, iconLabel, title, subtitle }) =>
        h(
            "li",
            { className: `event${slim ? " event_slim" : ""}` },
            h(
                "button",
                { className: "event__button" },
                h("span", { className: `event__icon event__icon_${icon}`, role: "img", "aria-label": iconLabel }),
                h("h4", { className: "event__title" }, title),
                subtitle && h("span", { className: "event__subtitle" }, subtitle),
            ),
        ),
    );

    const DATA = {
        all: {
            title: "Все",
            items: [
                { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Yeelight LED Smart Bulb", subtitle: "Включено" },
                { icon: "light", iconLabel: "Освещение", title: "D-Link Omna 180 Cam", subtitle: "Включится в 17:00" },
                { icon: "temp", iconLabel: "Температура", title: "Elgato Eve Degree Connected", subtitle: "Выключено до 17:00" },
                { icon: "light", iconLabel: "Освещение", title: "LIFX Mini Day & Dusk A60 E27", subtitle: "Включится в 17:00" },
                { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Mi Air Purifier 2S", subtitle: "Включено" },
                { icon: "light", iconLabel: "Освещение", title: "Philips Zhirui", subtitle: "Включено" },
            ],
        },
        kitchen: {
            title: "Кухня",
            items: [
                { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Yeelight LED Smart Bulb", subtitle: "Включено" },
                { icon: "temp", iconLabel: "Температура", title: "Elgato Eve Degree Connected", subtitle: "Выключено до 17:00" },
            ],
        },
        hall: {
            title: "Зал",
            items: [
                { icon: "light", iconLabel: "Освещение", title: "Philips Zhirui", subtitle: "Выключено" },
                { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Mi Air Purifier 2S", subtitle: "Выключено" },
            ],
        },
        lights: {
            title: "Лампочки",
            items: [
                { icon: "light", iconLabel: "Освещение", title: "D-Link Omna 180 Cam", subtitle: "Включится в 17:00" },
                { icon: "light", iconLabel: "Освещение", title: "LIFX Mini Day & Dusk A60 E27", subtitle: "Включится в 17:00" },
                { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Mi Air Purifier 2S", subtitle: "Включено" },
                { icon: "light", iconLabel: "Освещение", title: "Philips Zhirui", subtitle: "Включено" },
            ],
        },
        cameras: {
            title: "Камеры",
            items: [
                { icon: "light2", iconLabel: "Освещение", title: "Xiaomi Mi Air Purifier 2S", subtitle: "Включено" },
            ],
        },
    };
    DATA.all.items = [...DATA.all.items, ...DATA.all.items]; // удваиваем список, как в исходнике

    const TABS = Object.keys(DATA);

    const Main = () => {
        const wrapRef = useRef(null);
        const [tab, setTab] = useState(() => new URLSearchParams(location.search).get("tab") || "all");
        const [overflow, setOverflow] = useState(false);

        useLayoutEffect(() => {
            const scroller = wrapRef.current?.querySelector(".section__panel:not(.section__panel_hidden)");
            if (scroller) setOverflow(scroller.scrollWidth > scroller.clientWidth);
        }, [tab]);

        const scrollRight = () =>
            wrapRef.current
                ?.querySelector(".section__panel:not(.section__panel_hidden)")
                ?.scrollTo({ left: 400, behavior: "smooth" });

        return h(
            "main",
            { className: "main" },

            h(
                "section",
                { className: "section main__general" },
                h("h2", { className: "section__title section__title-header section__main-title" }, "Главное"),
                h(
                    "div",
                    { className: "hero-dashboard" },
                    h(
                        "div",
                        { className: "hero-dashboard__primary" },
                        h("h3", { className: "hero-dashboard__title" }, "Привет, Геннадий!"),
                        h("p", { className: "hero-dashboard__subtitle" }, "Двери и окна закрыты, сигнализация включена."),
                        h(
                            "ul",
                            { className: "hero-dashboard__info" },
                            [
                                ["Дома", "+23°"],
                                ["За окном", "+19°", "hero-dashboard__icon_rain", "Дождь"],
                            ].map(([label, val, cls, aria]) =>
                                h(
                                    "li",
                                    { key: label, className: "hero-dashboard__item" },
                                    h("div", { className: "hero-dashboard__item-title" }, label),
                                    h(
                                        "div",
                                        { className: "hero-dashboard__item-details" },
                                        val.replace("°", ""),
                                        h("span", { className: "a11y-hidden" }, "°"),
                                        cls && h("div", { className: `hero-dashboard__icon ${cls}`, role: "img", "aria-label": aria }),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    h(
                        "ul",
                        { className: "hero-dashboard__schedule" },
                        [
                            ["temp", "Температура", "Philips Cooler", "Начнет охлаждать в 16:30"],
                            ["light", "Освещение", "Xiaomi Yeelight LED Smart Bulb", "Включится в 17:00"],
                            ["light", "Освещение", "Xiaomi Yeelight LED Smart Bulb", "Включится в 17:00"],
                        ].map((p, i) => h(EventCard, { key: i, icon: p[0], iconLabel: p[1], title: p[2], subtitle: p[3] })),
                    ),
                ),
            ),

            h(
                "section",
                { className: "section main__scripts" },
                h("h2", { className: "section__title section__title-header" }, "Избранные сценарии"),
                h(
                    "ul",
                    { className: "event-grid" },
                    [
                        ["light2", "Освещение", "Выключить весь свет в доме и во дворе"],
                        ["schedule", "Расписание", "Я ухожу"],
                        ["light2", "Освещение", "Включить свет в коридоре"],
                        ["temp2", "Температура", "Набрать горячую ванну", "Начнётся в 18:00"],
                        ["temp2", "Температура", "Сделать пол тёплым во всей квартире"],
                    ].map((p, i) => h(EventCard, { key: i, slim: true, icon: p[0], iconLabel: p[1], title: p[2], subtitle: p[3] })),
                ),
            ),

            h(
                "section",
                { className: "section main__devices" },
                h(
                    "div",
                    { className: "section__title" },
                    h("h2", { className: "section__title-header" }, "Избранные устройства"),
                    h(
                        "select",
                        { className: "section__select", value: tab, onChange: e => setTab(e.target.value) },
                        TABS.map(key => h("option", { key, value: key }, DATA[key].title)),
                    ),
                    h(
                        "ul",
                        { className: "section__tabs", role: "tablist" },
                        TABS.map(key =>
                            h(
                                "li",
                                {
                                    key,
                                    role: "tab",
                                    "aria-selected": key === tab,
                                    tabIndex: key === tab ? 0 : undefined,
                                    id: `tab_${key}`,
                                    "aria-controls": `panel_${key}`,
                                    className: `section__tab${key === tab ? " section__tab_active" : ""}`,
                                    onClick: () => setTab(key),
                                },
                                DATA[key].title,
                            ),
                        ),
                    ),
                ),
                h(
                    "div",
                    { className: "section__panel-wrapper", ref: wrapRef },
                    TABS.map(key =>
                        h(
                            "div",
                            {
                                key,
                                className: `section__panel${key === tab ? "" : " section__panel_hidden"}`,
                                role: "tabpanel",
                                "aria-hidden": key !== tab,
                                id: `panel_${key}`,
                                "aria-labelledby": `tab_${key}`,
                            },
                            h(
                                "ul",
                                { className: "section__panel-list" },
                                DATA[key].items.map((it, i) => h(EventCard, { key: i, ...it })),
                            ),
                        ),
                    ),
                    overflow && h("div", { className: "section__arrow", onClick: scrollRight }),
                ),
            ),
        );
    };

    ReactDOM.createRoot(document.getElementById("app")).render(h(Fragment, null, h(Header), h(Main)));
})();
