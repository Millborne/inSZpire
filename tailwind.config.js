/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                szPrimary100: "#ECF0FF",
                szPrimary200: "#B2C2FF",
                szPrimary500: "#6584FF",
                szPrimary700: "#4F65BB",
                szPrimary900: "#394577",

                szSecondary50: "#FFF7EB",
                szSecondary100: "#FFEFD6",
                szSecondary200: "#FFDEAD",
                szSecondary400: "#F6C580",
                szSecondary500: "#FF9900",
                szSecondary700: "#CC7A00",
                szSecondary800: "#A36200",
                szSecondary900: "#573400",

                szBlack900: "#1E1F24",
                szBlack800: "#242424",
                szBlack700: "#303030",
                szDarkGrey600: "#575757",
                szGrey500: "#919191",
                szLightGrey400: "#B0B0B0",
                szGrey300: "#C6C6C6",
                szGrey200: "#E3E3E3",
                szGrey150: "#F1F1F1",

                szWhite100: "#FFFFFF",

                error900: "#701800",
                error700: "#FF5324",
                error50: "#FFEFEB",

                success900: "#12451F",
                success700: "#34C759",
                success50: "#EFFBF2",

                info900: "#394577",
                info500: "#6584FF",
                info100: "#ECF0FF",

                warning900: "#573400",
                warning500: "#FF9900",
                warning100: "#FFF7EB",
            },
            fontSize: {
                h1: ["40px", { lineHeight: "50px", fontWeight: "700" }],
                h2: ["34px", { lineHeight: "42px", fontWeight: "700" }],
                h3: ["26px", { lineHeight: "34px", fontWeight: "600" }],
                h4: ["20px", { lineHeight: "28px", fontWeight: "600" }],
                h5: ["18px", { lineHeight: "26px", fontWeight: "600" }],
                h6: ["16px", { lineHeight: "24px", fontWeight: "600" }],
                "body-big-reg": ["18px", { lineHeight: "26px", fontWeight: "400" }],
                "body-big-strong": ["18px", { lineHeight: "26px", fontWeight: "500" }],

                "body-base-reg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                "body-base-strong": ["16px", { lineHeight: "24px", fontWeight: "500" }],

                "body-small-reg": ["14px", { lineHeight: "20px", fontWeight: "400" }],
                "body-small-strong": ["14px", { lineHeight: "20px", fontWeight: "500" }],

                "caption-reg": ["12px", { lineHeight: "auto", fontWeight: "500" }],
                "caption-strong": ["12px", { lineHeight: "auto", fontWeight: "700" }],
                "caption-all-caps": [
                    "9px",
                    {
                        lineHeight: "auto",
                        fontWeight: "700",
                        letterSpacing: "0.12em",
                        textTrasnform: "uppercase",
                    },
                ],
            },
            letterSpacing: {
                tight: "0.01em",
            },
            boxShadow: {
                "custom-light": "0 2px 4px rgba(0, 0, 0, 0.1)",
                "custom-dark": "0 2px 4px rgba(0, 0, 0, 0.3)",
            },
            borderRadius: {
                "custom-md": "6px",
                "custom-lg": "20px",
            },
        },
        fontFamily: {
            montserrat: ["Montserrat", "sans-serif"],
            dmSans: ["DM Sans", "sans-serif"],
            poppins: ["Poppins", "sans-serif"],
        },
    },
    plugins: [],
    safelist: [
        {
            pattern:
                /(bg|text|border|outline)-(szPrimary(100|200|500|700|900)|szSecondary(50|100|200|400|500|700|800|900)|szBlack(700|800|900)|szDarkGrey600|szGrey(150|200|300|400|500)|szWhite100|error(50|700|900)|success(50|700|900)|info(100|500|900)|warning(100|500|900))/,
        },
    ],
};
