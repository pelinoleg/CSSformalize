const root = document.documentElement;
const variablesOutput = document.querySelector('[data-id="variablesOutput"]');
const themeButton = document.querySelector('[data-id="themeButton"]');
const themeButton2 = document.querySelector('[data-id="themeButton2"]');
const themeButton3 = document.querySelector('[data-id="themeButton3"]');
const themeButton4 = document.querySelector('[data-id="themeButton4"]');
const themeButton5 = document.querySelector('[data-id="themeButton5"]');
const resetButton = document.querySelector('[data-id="resetButton"]');
const metaCheckbox = document.querySelector('[data-id="meta"]');
const metaOutput = document.querySelector('[data-id="metaOutput"]');
let changesMade = false;

const pickrInstances = [];

const cssVariables = {
  demoBg: "--demo-bg",
  cFormAccentColor: "--cform-accent-color",
  cFormBorderFocusColor: "--cform-border-focus-color",
  cFormBg: "--cform-bg",
  cFormFocusBg: "--cform-focus-bg",
  cFormTextColor: "--cform-text-color",
  cFormTextPlaceholderColor: "--cform-text-placeholder-color",
  cFormCheckboxWidth: "--cform-checkbox-width",
  cFormRadius: "--cform-radius",
  cFormFontSize: "--cform-font-size",
  cFormPadding: "--cform-padding",
  cFormAccent: "--cform-accent",
  cFormError: "--cform-error",

  cFormLegend: "--cform-legend",

  cFormBorderWidth: "--cform-border-width",
  cFormBorderWidthFocus: "--cform-border-width-focus",
  cFormBorderColor: "--cform-border-color",
  cFormBorderBlur: "--cform-border-blur",
  cFormButtonDefault: "--cform-btn-default",
  cFormButtonDefaultText: "--cform-btn-default-text",
  cFormButtonPrimary: "--cform-btn-primary",
  cFormButtonSecondary: "--cform-btn-secondary",
  cFormBtnInfo: "--cform-btn-info",

  cFormAccentColorBtn: "--cform-accent-color-btn",
  cFormErrorColor: "--cform-error-color",
  cFormInfoColor: "--cform-info-color",
  cFormSecondaryColor: "--cform-secondary-color",
  cFormPrimaryColor: "--cform-primary-color",
};

const themes = {
  default: {
    ":root": {
      "--cform-checkbox-width": "26px",
      "--cform-radius": "10px",
      "--cform-font-size": "16px",
      "--cform-padding": "5px",
      "--cform-border-width": "0px",
      "--cform-border-width-focus": "3px",
      "--cform-border-blur": "0px",

      "--cform-focus-bg": "rgba(255,255,255,1)",
      "--cform-btn-default-text": "rgba(75, 50, 107, 0.75)",
      "--demo-bg": "rgba(255, 255, 255, 0)",
      "--cform-accent-color": "rgba(255, 255, 255, 1)",
      "--cform-border-focus-color": "rgba(199, 188, 212, 1.00)",
      "--cform-bg": "rgba(240, 239, 242, 1.00)",
      "--cform-text-color": "rgba(75, 50, 107, 1.00)",
      "--cform-error": "rgba(232, 112, 112, 1.00)",
      "--cform-accent": "rgba(104, 73, 145, 1.00)",
      "--cform-border-color": "rgba(199, 188, 212, 0.8)",

      "--cform-legend": "rgba(104, 73, 145, 1.00)",

      "--cform-text-placeholder-color": "rgba(75, 50, 107, 0.5)",

      "--cform-btn-default": "var(--cform-bg)",
      "--cform-accent-color-btn": "var(--cform-accent-color)",
      "--cform-error-color": "var(--cform-accent-color)",
      "--cform-info-color": "var(--cform-accent-color)",
      "--cform-secondary-color": "var(--cform-accent-color)",
      "--cform-primary-color": "var(--cform-accent-color)",
      "--cform-btn-primary": "rgba(104, 73, 145, 0.7)",

      "--cform-btn-secondary": "rgba(255, 100, 134, 1.00)",
      "--cform-btn-info": "rgba(251, 195, 111, 1)",
    },
    // ".cform-radio-group": {
    //   "--cform-bg": "rgba(100, 116, 139, 0.19)",
    //   "--cform-accent-color": "rgba(64, 82, 107, 0.83)",
    //   "--cform-accent": "rgba(248, 250, 252, 1)",
    //
    //   "--cform-font-size:": "17px",
    // },
    // ".cform-custom-input": {
    //   "--cform-bg": "rgba(100, 116, 139, 0.19)",
    // },
    // ".cform-custom-switch": {
    //   "--cform-radius": "50px",
    // },
    //
    // ".cform-custom-btn": {
    //   "--cform-btn-default": "rgba(148, 163, 184, 0.63)",
    //   "--cform-btn-default-text": "rgba(255, 255, 255, 1)",
    //   "--cform-btn-primary": "rgba(173, 153, 153, 1)",
    //   "--cform-btn-secondary": "rgba(88, 124, 144, 1)",
    //   "--cform-btn-info": "rgba(251, 195, 111, 1)",
    // },
  },
  theme: {
    ":root": {
      "--cform-checkbox-width": "16px",
      "--cform-radius": "12px",
      "--cform-font-size": "16px",
      "--cform-padding": "5px",
      "--cform-border-width": "0px",
      "--cform-border-width-focus": "0px",
      "--cform-border-blur": "0px",
      "--cform-focus-bg": "#5e6f80",
      "--cform-btn-default-text": "",
      "--demo-bg": "rgba(47, 61, 76, 1.00)",
      "--cform-accent-color": "rgba(94, 112, 130, 1)",
      "--cform-border-focus-color": "rgba(157, 178, 191, 1)",
      "--cform-bg": "#4D5E6F",
      "--cform-text-color": "#fedcba",
      "--cform-error": "rgba(232, 111, 111, 1)",
      "--cform-accent": "#9ab7d6",
      "--cform-border-color": "rgba(190, 162, 162, 1)",
      "--cform-btn-default": "#4D5E6F",
      "--cform-btn-primary": "rgba(173, 153, 153, 1)",
      "--cform-btn-secondary": "rgba(88, 124, 144, 1)",
      "--cform-btn-info": "rgba(251, 195, 111, 1)",
    },

    ".cform-custom-input": {
      "--cform-text-placeholder-color": "rgba(254, 220, 186, 0.56)",
      "--cform-text-color": "rgba(254, 220, 186, 1)",
      "--cform-legend": "rgba(254, 220, 186, 1)",
      "--cform-border-color": "rgba(94, 112, 130, 1)",
      "--cform-bg": "rgba(77, 94, 111, 1)",
      "--cform-border-focus-color": "rgba(137, 155, 174, 1)",
      "--cform-focus-bg": "rgba(90, 108, 126, 1)",
      "--cform-radius": "8px",
    },
    ".cform-custom-checkbox-radio": {
      "--cform-accent-color": "rgba(255, 255, 255, 1)",
      "--cform-accent": "rgba(94, 111, 128, 1)",
      "--cform-checkbox-width": "26px",
      "--cform-radius": "8px",
    },
    ".cform-custom-checkbox": {
      "--cform-accent": "rgba(185, 207, 230, 0.68)",
      "--cform-checkbox-width": "23px",
    },
    ".cform-custom-switch": {
      "--cform-accent-color": "rgba(248, 250, 252, 1)",
      "--cform-text-placeholder-color": "rgba(248, 250, 252, 1)",
      "--cform-accent": "rgba(118, 143, 169, 1)",
      "--cform-bg": "rgba(130, 155, 179, 0.54)",
      "--cform-checkbox-width": "23px",
    },
    ".cform-radio-group": {
      "--cform-accent-color": "rgba(29, 37, 45, 1)",
      "--cform-radius": "8px",
    },
    ".cform-custom-btn": {
      "--cform-btn-default-text": "rgba(255, 255, 255, 0.75)",
      "--cform-btn-primary": "rgba(31, 43, 54, 1)",
      "--cform-primary-color": "rgba(255, 255, 255, 1)",
      "--cform-secondary-color": "rgba(255, 255, 255, 1)",
      "--cform-info-color": "rgba(255, 255, 255, 1)",
      "--cform-error-color": "rgba(245, 245, 245, 1)",
      "--cform-accent-color-btn": "rgba(255, 255, 255, 1)",
      "--cform-radius": "8px",
    },
    ".cform-custom-file": {
      "--cform-accent-color": "rgba(248, 250, 252, 1)",
      "--cform-radius": "8px",
    },
    ".cform-custom-picker": {
      "--cform-checkbox-width": "37px",
      "--cform-radius": "8px",
    },
  },
  theme2: {
    ":root": {
      "--demo-bg": "rgba(235, 231, 229, 1.00)",
      "--cform-radius": "5px",
      "--cform-font-size": "14px",
      "--cform-padding": "4px",
      "--cform-border-width": "1px",
      "--cform-border-width-focus": "0px",
      "--cform-border-focus-color": "rgba(206, 201, 198, 1)",
      "--cform-bg": "rgba(255, 255, 255, 1)",
      "--cform-text-color": "rgba(137, 118, 108, 1)",
      "--cform-accent": "rgba(101, 163, 13, 1)",
      "--cform-border-color": "rgba(206, 201, 198, 0.32)"
    },
    ".cform-custom-input": {
      "--cform-text-placeholder-color": "rgba(137, 118, 108, 0.73)",
      "--cform-legend": "rgba(137, 118, 108, 1)"
    },
    ".cform-custom-switch": {
      "--cform-bg": "rgba(137, 118, 108, 0.18)",
      "--cform-text-placeholder-color": "rgba(255, 255, 255, 0.5)",
      "--cform-radius": "20px"
    },
    ".cform-custom-btn": {
      "--cform-btn-primary": "rgba(63, 54, 50, 0.84)",
      "--cform-btn-default-text": "rgba(137, 118, 108, 1)",
      "--cform-radius": "7px"
    }

  },
  theme3: {
    ":root": {
      "--demo-bg": "rgba(52, 56, 65, 1.00)",
      "--cform-radius": "5px",
      "--cform-font-size": "14px",
      "--cform-padding": "4px",
      "--cform-border-width": "1px",
      "--cform-border-width-focus": "0px",
      "--cform-border-focus-color": "rgba(108, 184, 70, 1.00)",
      "--cform-bg": "rgba(64, 68, 79, 1.00)",
      "--cform-text-color": "rgb(165, 170, 182)",
      "--cform-accent": "rgba(108, 184, 70, 1.00)",
      "--cform-border-color": "rgba(73, 77, 88, 1)",
      "--cform-focus-bg": "rgba(49, 52, 61, 1)"
    },
    ".cform-custom-input": {
      "--cform-text-placeholder-color": "rgba(165, 170, 182, 0.61)",
      "--cform-legend": "rgba(165, 170, 182, 0.85)",
      "--cform-text-color": "rgba(244, 245, 229, 1)"
    },
    ".cform-radio-group" : {
      "--cform-bg": "rgba(32, 35, 43, 1)",
    },
    ".cform-custom-range" : {
      "--cform-bg":  "rgba(32, 35, 43, 1)",
    },
    ".cform-custom-switch": {
      "--cform-bg": "rgba(32, 35, 43, 1)",
      "--cform-text-placeholder-color": "rgba(248, 250, 252, 0.63)",
      "--cform-radius": "20px",
    },
    ".cform-custom-btn": {
      "--cform-btn-primary": "rgba(32, 35, 43, 1)",
      "--cform-btn-default-text": "rgba(244, 245, 229, 1)",
      "--cform-radius": "7px"
    }

  },
  theme4: {
    ":root": {
      "--demo-bg": "rgba(255, 255, 255, 1)",
      "--cform-radius": "50px",
      "--cform-font-size": "15px",
      "--cform-padding": "4px",
      "--cform-border-width": "1px",
      "--cform-border-width-focus": "1px",
      "--cform-focus-bg": "rgba(255, 255, 255, 1)",
      "--cform-border-focus-color": "rgba(141, 203, 196, 1)",
      "--cform-bg": "rgba(255, 255, 255, 1)",
      "--cform-text-color": "rgba(71, 85, 105, 1)",
      "--cform-accent": "rgba(20, 184, 166, 1)",
      "--cform-border-color": "rgba(141, 203, 196, 1)"
    },
    ".cform-custom-input": {
      "--cform-text-placeholder-color": "rgba(17, 94, 89, 0.61)",
      "--cform-legend": "rgba(17, 94, 89, 1)",
     },

    ".cform-custom-switch": {
      "--cform-radius": "20px",
      "--cform-accent": "rgba(20, 184, 166, 1)",
      "--cform-bg": "rgba(82, 255, 236, 0.26)",
      "--cform-text-placeholder-color": "rgba(255, 255, 255, 1)"
    },
    ".cform-radio-group": {
      "--cform-bg": "rgba(20, 184, 166, 1)",
      "--cform-accent": "rgba(255, 255, 255, 1)",
      "--cform-text-color": "rgba(255, 255, 255, 1)",
      "--cform-accent-color": "rgba(20, 184, 166, 1)"
    },
    ".cform-custom-range": {
      "--cform-bg": "rgba(20, 184, 166, 1)",
      "--cform-accent": "rgba(71, 85, 105, 1)"
    },
    ".cform-custom-btn": {
      "--cform-btn-default": "rgba(141, 203, 196, 0.45)",
      "--cform-btn-default-text": "rgba(71, 85, 105, 1)",
      "--cform-radius": "7px",
      "--cform-btn-primary": "rgba(13, 148, 136, 1)"
    },
    ".cform-custom-file": {
      "--cform-radius": "6px"
    },
    ".cform-custom-picker": {
      "--cform-checkbox-width": "31px",
      "--cform-radius": "9px"
    }

  },
  theme5: {
    ":root": {
      "--demo-bg": "rgba(218, 223, 229, 1)",
      "--cform-radius": "50px",
      "--cform-font-size": "14px",
      "--cform-padding": "4px",
      "--cform-border-width-focus": "0px",
      "--cform-focus-bg": "rgba(255, 255, 255, 1)",
      "--cform-bg": "rgba(255, 255, 255, 1)",
      "--cform-text-color": "rgba(71, 85, 105, 1)",
      "--cform-accent": "rgba(71, 85, 105, 1)"
    },
    ".cform-custom-input": {
      "--cform-legend": "rgba(55, 65, 81, 1)",
      "--cform-text-placeholder-color": "rgba(148, 163, 184, 0.85)"
    },
    ".cform-custom-checkbox-radio": {
      "--cform-radius": "18px"
    },
    ".cform-custom-switch": {
      "--cform-radius": "20px",
      "--cform-text-placeholder-color": "rgba(255, 255, 255, 1)",
      "--cform-bg": "rgba(107, 114, 128, 0.21)"
    },
    ".cform-radio-group": {
      "--cform-bg": "rgba(248, 250, 252, 1)",
      "--cform-accent": "rgba(107, 114, 128, 1)",
      "--cform-text-color": "rgba(156, 163, 175, 1)",
      "--cform-accent-color": "rgba(255, 255, 255, 1)"
    },
    ".cform-custom-range": {
      "--cform-bg": "rgba(156, 163, 175, 1)",
      "--cform-accent": "rgba(71, 85, 105, 1)"
    },
    ".cform-custom-btn": {
      "--cform-btn-default": "rgba(209, 213, 219, 1)",
      "--cform-btn-default-text": "rgba(71, 85, 105, 1)",
      "--cform-radius": "7px",
      "--cform-btn-primary": "rgba(108, 159, 230, 1)"
    },
    ".cform-custom-file": {
      "--cform-radius": "6px"
    },
    ".cform-custom-picker": {
      "--cform-checkbox-width": "31px",
      "--cform-radius": "9px"
    }

  }
};

let swatches = [
  "rgb(248,250,252)",
  "rgb(241,245,249)",
  "rgb(226,232,240)",
  "rgb(203,213,225)",
  "rgb(148,163,184)",
  "rgb(100,116,139)",
  "rgb(71,85,105)",
  "rgb(51,65,85)",
  "rgb(30,41,59)",
  "rgb(15,23,42)",

  "rgb(249,250,251)",
  "rgb(243,244,246)",
  "rgb(229,231,235)",
  "rgb(209,213,219)",
  "rgb(156,163,175)",
  "rgb(107,114,128)",
  "rgb(75,85,99)",
  "rgb(55,65,81)",
  "rgb(31,41,55)",
  "rgb(17,24,39)",

  "rgb(250,250,250)",
  "rgb(244,244,245)",
  "rgb(228,228,231)",
  "rgb(212,212,216)",
  "rgb(161,161,170)",
  "rgb(113,113,122)",
  "rgb(82,82,91)",
  "rgb(63,63,70)",
  "rgb(39,39,42)",
  "rgb(24,24,27)",

  "rgb(254,242,242)",
  "rgb(254,226,226)",
  "rgb(254,202,202)",
  "rgb(252,165,165)",
  "rgb(248,113,113)",
  "rgb(239,68,68)",
  "rgb(220,38,38)",
  "rgb(185,28,28)",
  "rgb(153,27,27)",
  "rgb(127,29,29)",

  "rgb(255,247,237)",
  "rgb(255,237,213)",
  "rgb(254,215,170)",
  "rgb(253,186,116)",
  "rgb(251,146,60)",
  "rgb(249,115,22)",
  "rgb(234,88,12)",
  "rgb(194,65,12)",
  "rgb(154,52,18)",
  "rgb(124,45,18)",

  "rgb(255,251,235)",
  "rgb(254,243,199)",
  "rgb(253,230,138)",
  "rgb(252,211,77)",
  "rgb(251,191,36)",
  "rgb(245,158,11)",
  "rgb(217,119,6)",
  "rgb(180,83,9)",
  "rgb(146,64,14)",
  "rgb(120,53,15)",

  "rgb(254,252,232)",
  "rgb(254,249,195)",
  "rgb(254,240,138)",
  "rgb(253,224,71)",
  "rgb(250,204,21)",
  "rgb(234,179,8)",
  "rgb(202,138,4)",
  "rgb(161,98,7)",
  "rgb(133,77,14)",
  "rgb(113,63,18)",

  "rgb(247,254,231)",
  "rgb(236,252,203)",
  "rgb(217,249,157)",
  "rgb(190,242,100)",
  "rgb(163,230,53)",
  "rgb(132,204,22)",
  "rgb(101,163,13)",
  "rgb(77,124,15)",
  "rgb(63,98,18)",
  "rgb(54,83,20)",

  "rgb(240,253,244)",
  "rgb(220,252,231)",
  "rgb(187,247,208)",
  "rgb(134,239,172)",
  "rgb(74,222,128)",
  "rgb(34,197,94)",
  "rgb(22,163,74)",
  "rgb(21,128,61)",
  "rgb(22,101,52)",
  "rgb(20,83,45)",

  "rgb(236,253,245)",
  "rgb(209,250,229)",
  "rgb(167,243,208)",
  "rgb(110,231,183)",
  "rgb(52,211,153)",
  "rgb(16,185,129)",
  "rgb(5,150,105)",
  "rgb(4,120,87)",
  "rgb(6,95,70)",
  "rgb(6,78,59)",

  "rgb(240,253,250)",
  "rgb(204,251,241)",
  "rgb(153,246,228)",
  "rgb(94,234,212)",
  "rgb(45,212,191)",
  "rgb(20,184,166)",
  "rgb(13,148,136)",
  "rgb(15,118,110)",
  "rgb(17,94,89)",
  "rgb(19,78,74)",

  "rgb(236,254,255)",
  "rgb(207,250,254)",
  "rgb(165,243,252)",
  "rgb(103,232,249)",
  "rgb(34,211,238)",
  "rgb(6,182,212)",
  "rgb(8,145,178)",
  "rgb(14,116,144)",
  "rgb(21,94,117)",
  "rgb(22,78,99)",

  "rgb(240,249,255)",
  "rgb(224,242,254)",
  "rgb(186,230,253)",
  "rgb(125,211,252)",
  "rgb(56,189,248)",
  "rgb(14,165,233)",
  "rgb(2,132,199)",
  "rgb(3,105,161)",
  "rgb(7,89,133)",
  "rgb(12,74,110)",

  "rgb(239,246,255)",
  "rgb(219,234,254)",
  "rgb(191,219,254)",
  "rgb(147,197,253)",
  "rgb(96,165,250)",
  "rgb(59,130,246)",
  "rgb(37,99,235)",
  "rgb(29,78,216)",
  "rgb(30,64,175)",
  "rgb(30,58,138)",

  "rgb(238,242,255)",
  "rgb(224,231,255)",
  "rgb(199,210,254)",
  "rgb(165,180,252)",
  "rgb(129,140,248)",
  "rgb(99,102,241)",
  "rgb(79,70,229)",
  "rgb(67,56,202)",
  "rgb(55,48,163)",
  "rgb(49,46,129)",

  "rgb(245,243,255)",
  "rgb(237,233,254)",
  "rgb(221,214,254)",
  "rgb(196,181,253)",
  "rgb(167,139,250)",
  "rgb(139,92,246)",
  "rgb(124,58,237)",
  "rgb(109,40,217)",
  "rgb(91,33,182)",
  "rgb(76,29,149)",

  "rgb(250,245,255)",
  "rgb(243,232,255)",
  "rgb(233,213,255)",
  "rgb(216,180,254)",
  "rgb(192,132,252)",
  "rgb(168,85,247)",
  "rgb(147,51,234)",
  "rgb(126,34,206)",
  "rgb(107,33,168)",
  "rgb(88,28,135)",

  "rgb(253,244,255)",
  "rgb(250,232,255)",
  "rgb(245,208,254)",
  "rgb(240,171,252)",
  "rgb(232,121,249)",
  "rgb(217,70,239)",
  "rgb(192,38,211)",
  "rgb(162,28,175)",
  "rgb(134,25,143)",
  "rgb(112,26,117)",

  "rgb(253,242,248)",
  "rgb(252,231,243)",
  "rgb(251,207,232)",
  "rgb(249,168,212)",
  "rgb(244,114,182)",
  "rgb(236,72,153)",
  "rgb(219,39,119)",
  "rgb(190,24,93)",
  "rgb(157,23,77)",
  "rgb(131,24,67)",

  "rgb(255,241,242)",
  "rgb(255,228,230)",
  "rgb(254,205,211)",
  "rgb(253,164,175)",
  "rgb(251,113,133)",
  "rgb(244,63,94)",
  "rgb(225,29,72)",
  "rgb(190,18,60)",
  "rgb(159,18,57)",
  "rgb(136,19,55)",
];
