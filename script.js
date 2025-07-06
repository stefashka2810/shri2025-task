var App = (() => {
    function Header() {
        const [expanded, setExpanded] = React.useState(false);
        const toggle = () => setExpanded(!expanded);

        return React.createElement(
            "header",
            { className: "header" },
            React.createElement("a", {
                href: "/",
                className: "header__logo",
                "aria-label": "Яндекс.Дом",
            }),
            React.createElement(
                "button",
                {
                    className: "header__menu",
                    "aria-expanded": expanded ? "true" : "false",
                    onClick: toggle,
                },
                React.createElement(
                    "span",
                    { className: "header__menu-text a11y-hidden" },
                    expanded ? "Закрыть меню" : "Открыть меню",
                ),
            ),
            React.createElement(
                "ul",
                { className: `header__links${expanded ? " header__links_opened" : ""}` },
                React.createElement(
                    "li",
                    { className: "header__item" },
                    React.createElement(
                        "a",
                        {
                            className: "header__link header__link_current",
                            href: "/",
                            "aria-current": "page",
                        },
                        "Сводка",
                    ),
                ),
                React.createElement(
                    "li",
                    { className: "header__item" },
                    React.createElement("a", { className: "header__link", href: "/devices" }, "Устройства"),
                ),
                React.createElement(
                    "li",
                    { className: "header__item" },
                    React.createElement("a", { className: "header__link", href: "/scripts" }, "Сценарии"),
                ),
            ),
        );
    }

    const Event = React.memo(function Event(props) {
        return React.createElement(
            "li",
            { className: "event" + (props.slim ? " event_slim" : "") },
            React.createElement(
                "button",
                { className: "event__button" },
                React.createElement("span", {
                    className: `event__icon event__icon_${props.icon}`,
                    role: "img",
                    "aria-label": props.iconLabel,
                }),
                React.createElement("h4", { className: "event__title" }, props.title),
                props.subtitle &&
                React.createElement("span", { className: "event__subtitle" }, props.subtitle),
            ),
        );
    });

    const TABS = {
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

    for (let i = 0; i < 6; ++i) {
        TABS.all.items = [...TABS.all.items, ...TABS.all.items];
    }

    const TAB_KEYS = Object.keys(TABS);

    function Main() {
        const wrapperRef = React.useRef(null);
        const [activeTab, setActiveTab] = React.useState(
            () => new URLSearchParams(location.search).get("tab") || "all",
        );
        const [showArrow, setShowArrow] = React.useState(false);

        React.useLayoutEffect(() => {
            const scroller =
                wrapperRef.current?.querySelector(".section__panel:not(.section__panel_hidden)");
            if (scroller) setShowArrow(scroller.scrollWidth > scroller.clientWidth);
        }, [activeTab]);

        const handleArrow = () => {
            const scroller =
                wrapperRef.current?.querySelector(".section__panel:not(.section__panel_hidden)");
            scroller?.scrollTo({ left: scroller.scrollLeft + 400, behavior: "smooth" });
        };

        return React.createElement(
            "main",
            { className: "main" },
            React.createElement(
                "section",
                { className: "section main__general" },
                React.createElement("h2", { className: "section__title section__title-header section__main-title" }, "Главное"),
                React.createElement(
                    "div",
                    { className: "hero-dashboard" },
                    React.createElement(
                        "div",
                        { className: "hero-dashboard__primary" },
                        React.createElement("h3", { className: "hero-dashboard__title" }, "Привет, Геннадий!"),
                        React.createElement(
                            "p",
                            { className: "hero-dashboard__subtitle" },
                            "Двери и окна закрыты, сигнализация включена.",
                        ),
                        React.createElement(
                            "ul",
                            { className: "hero-dashboard__info" },
                            React.createElement(
                                "li",
                                { className: "hero-dashboard__item" },
                                React.createElement("div", { className: "hero-dashboard__item-title" }, "Дома"),
                                React.createElement(
                                    "div",
                                    { className: "hero-dashboard__item-details" },
                                    "+23",
                                    React.createElement("span", { className: "a11y-hidden" }, "°"),
                                ),
                            ),
                            React.createElement(
                                "li",
                                { className: "hero-dashboard__item" },
                                React.createElement("div", { className: "hero-dashboard__item-title" }, "За окном"),
                                React.createElement(
                                    "div",
                                    { className: "hero-dashboard__item-details" },
                                    "+19",
                                    React.createElement("span", { className: "a11y-hidden" }, "°"),
                                    React.createElement("div", {
                                        className: "hero-dashboard__icon hero-dashboard__icon_rain",
                                        role: "img",
                                        "aria-label": "Дождь",
                                    }),
                                ),
                            ),
                        ),
                    ),
                    React.createElement(
                        "ul",
                        { className: "hero-dashboard__schedule" },
                        React.createElement(Event, {
                            icon: "temp",
                            iconLabel: "Температура",
                            title: "Philips Cooler",
                            subtitle: "Начнет охлаждать в 16:30",
                        }),
                        React.createElement(Event, {
                            icon: "light",
                            iconLabel: "Освещение",
                            title: "Xiaomi Yeelight LED Smart Bulb",
                            subtitle: "Включится в 17:00",
                        }),
                        React.createElement(Event, {
                            icon: "light",
                            iconLabel: "Освещение",
                            title: "Xiaomi Yeelight LED Smart Bulb",
                            subtitle: "Включится в 17:00",
                        }),
                    ),
                ),
            ),
            React.createElement(
                "section",
                { className: "section main__scripts" },
                React.createElement("h2", { className: "section__title section__title-header" }, "Избранные сценарии"),
                React.createElement(
                    "ul",
                    { className: "event-grid" },
                    React.createElement(Event, {
                        slim: true,
                        icon: "light2",
                        iconLabel: "Освещение",
                        title: "Выключить весь свет в доме и во дворе",
                    }),
                    React.createElement(Event, {
                        slim: true,
                        icon: "schedule",
                        iconLabel: "Расписание",
                        title: "Я ухожу",
                    }),
                    React.createElement(Event, {
                        slim: true,
                        icon: "light2",
                        iconLabel: "Освещение",
                        title: "Включить свет в коридоре",
                    }),
                    React.createElement(Event, {
                        slim: true,
                        icon: "temp2",
                        iconLabel: "Температура",
                        title: "Набрать горячую ванну",
                        subtitle: "Начнётся в 18:00",
                    }),
                    React.createElement(Event, {
                        slim: true,
                        icon: "temp2",
                        iconLabel: "Температура",
                        title: "Сделать пол тёплым во всей квартире",
                    }),
                ),
            ),
            React.createElement(
                "section",
                { className: "section main__devices" },
                React.createElement(
                    "div",
                    { className: "section__title" },
                    React.createElement("h2", { className: "section__title-header" }, "Избранные устройства"),
                    React.createElement(
                        "select",
                        { className: "section__select", value: activeTab, onChange: e => setActiveTab(e.target.value) },
                        TAB_KEYS.map(key => React.createElement("option", { key, value: key }, TABS[key].title)),
                    ),
                    React.createElement(
                        "ul",
                        { role: "tablist", className: "section__tabs" },
                        TAB_KEYS.map(key =>
                            React.createElement(
                                "li",
                                {
                                    key,
                                    role: "tab",
                                    "aria-selected": key === activeTab ? "true" : "false",
                                    tabIndex: key === activeTab ? 0 : undefined,
                                    className: "section__tab" + (key === activeTab ? " section__tab_active" : ""),
                                    id: `tab_${key}`,
                                    "aria-controls": `panel_${key}`,
                                    onClick: () => setActiveTab(key),
                                },
                                TABS[key].title,
                            ),
                        ),
                    ),
                ),
                React.createElement(
                    "div",
                    { className: "section__panel-wrapper", ref: wrapperRef },
                    TAB_KEYS.map(key =>
                        React.createElement(
                            "div",
                            {
                                key,
                                role: "tabpanel",
                                className: "section__panel" + (key === activeTab ? "" : " section__panel_hidden"),
                                "aria-hidden": key === activeTab ? "false" : "true",
                                id: `panel_${key}`,
                                "aria-labelledby": `tab_${key}`,
                            },
                            React.createElement(
                                "ul",
                                { className: "section__panel-list" },
                                TABS[key].items.map((item, idx) => React.createElement(Event, { key: idx, ...item })),
                            ),
                        ),
                    ),
                    showArrow &&
                    React.createElement("div", { className: "section__arrow", onClick: handleArrow }),
                ),
            ),
        );
    }

    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(
        React.createElement(React.Fragment, null, React.createElement(Header), React.createElement(Main)),
    );
})();
