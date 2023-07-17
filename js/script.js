document.addEventListener("DOMContentLoaded", function () {
  let themeChanging = false;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "style") {
        const input = mutation.target;
        const newValue = input.style.getPropertyValue("--pcr-color");

        // Ищем связанные кнопки
        const relatedInputs = document.querySelectorAll(`[data-class="${input.dataset.class}"][data-id="${input.dataset.id}"]`);

        // Сравниваем новое значение с текущим значением каждой связанной кнопки
        relatedInputs.forEach((relatedInput) => {
          const currentValue = relatedInput.style.getPropertyValue("--pcr-color");
          if (newValue !== currentValue) {
            relatedInput.style.setProperty("--pcr-color", newValue);

            // Здесь мы также устанавливаем или сбрасываем состояние кнопки сброса
            const resetButton = relatedInput.closest(".sidebar-option").querySelector(".reset-btn");
            const dataClass = relatedInput.dataset.class || ":root";
            const varName = cssVariables[relatedInput.dataset.id];
            if (newValue !== getDefaultValue(dataClass, varName)) {
              resetButton.classList.add("btn-show");
            } else {
              resetButton.classList.remove("btn-show");
            }
          }
        });
      }
    });
  });

  const colorInputs = document.querySelectorAll(".input-color[data-id]");

  for (const input of colorInputs) {
    const dataClass = input.dataset.class || ":root";
    const varName = cssVariables[input.dataset.id];
    const initialValue = getComputedStyle(document.querySelector(dataClass)).getPropertyValue(varName).trim();

    input.style.setProperty("--pcr-color", initialValue);

    let resetButton = input.closest(".sidebar-option").querySelector(".reset-btn");

    resetButton.addEventListener("click", () => {
      let defaultValue = getDefaultValue(dataClass, varName);
      if (defaultValue === undefined) {
        defaultValue = "";
      }

      setVariableForClass(dataClass, varName, defaultValue);

      const relatedInputs = document.querySelectorAll(`[data-class="${input.dataset.class}"][data-id="${input.dataset.id}"]`);

      relatedInputs.forEach((relatedInput) => {
        if (relatedInput.pickr) {
          relatedInput.pickr.setColor(defaultValue);
        }
        relatedInput.dataset.color = defaultValue;
        relatedInput.style.setProperty("--pcr-color", defaultValue); // Добавим обновление цвета кнопки здесь

        const relatedResetButton = relatedInput.closest(".sidebar-option").querySelector(".reset-btn");
        relatedResetButton.classList.remove("btn-show"); // Сбрасываем состояние каждой связанной кнопки сброса
      });

      currentValues[varName] = defaultValue;
      updateOutput();
    });

    input.addEventListener("click", function () {
      // Удаляем старый экземпляр Pickr, если он есть
      if (input.pickr) {
        const index = pickrInstances.findIndex((p) => p.instance === input.pickr);
        if (index !== -1) {
          pickrInstances.splice(index, 1);
        }
        input.pickr.destroyAndRemove();
        input.pickr = null;
      }

      // Здесь мы используем сохраненный цвет, если он есть, в противном случае используем начальное значение
      const dataClass = input.dataset.class || ":root";
      const varName = cssVariables[input.dataset.id];
      const computedValue =
          input.dataset.color || input.style.getPropertyValue("--pcr-color").trim();

      input.style.setProperty("--pcr-color", computedValue);

      // Создаем новый экземпляр Pickr с актуальным начальным значением
      const defaultColor = computedValue === 'transparent' ? 'rgba(203, 213, 225, 1)' : computedValue;

      const pickr = Pickr.create({
        el: input,
        theme: "classic",
        useAsButton: true,
        swatches: swatches,
        components: {
          preview: true,
          opacity: true,
          hue: true,
          interaction: {
            input: true,
          },
        },
        defaultRepresentation: "RGBA",
        default: defaultColor,
      });

      const pickrButton = pickr.getRoot().button;
      pickrButton.dataset.id = input.dataset.id;
      pickrButton.dataset.class = input.dataset.class;

      // Если цвет кнопки не прозрачный, то устанавливаем его
      if (computedValue !== 'transparent') {
        pickrButton.style.setProperty("--pcr-color", computedValue);
      }

      pickr.on("change", (color) => {
        if (themeChanging) return;
        const value = color.toRGBA().toString(0);

        setVariableForClass(dataClass, varName, value);
        pickrButton.style.setProperty("--pcr-color", value);

        // Добавляем этот код здесь:
        const relatedInputs = document.querySelectorAll(`[data-class="${input.dataset.class}"][data-id="${input.dataset.id}"]`);

        relatedInputs.forEach((relatedInput) => {
          const relatedResetButton = relatedInput.closest(".sidebar-option").querySelector(".reset-btn");
          relatedResetButton.classList.add("btn-show");
        });

        changesMade = true;
        updateOutput();
        pickr.applyColor();

        // Обновляем все остальные экземпляры Pickr, которые связаны с этим же CSS-свойством и классом
        pickrInstances.forEach((pickrInstance) => {
          const otherButton = pickrInstance.instance.getRoot().button;
          if (
              pickrInstance.id === input.dataset.id &&
              otherButton.dataset.class === input.dataset.class &&
              pickrInstance.instance !== pickr
          ) {
            if (value !== undefined) {
              pickrInstance.instance.setColor(value);
            }
            otherButton.style.setProperty("--pcr-color", value);
          }
        });

        // обновляем значение свойства --pcr-color во всех связанных кнопках, даже если другой pickr не был инициирован
        const relatedButtons = document.querySelectorAll(`[data-class="${input.dataset.class}"][data-id="${input.dataset.id}"]`);
        relatedButtons.forEach((btn) => {
          btn.style.setProperty("--pcr-color", value);
        });
      });

      input.pickr = pickr;

      pickrInstances.push({
        id: input.dataset.id,
        instance: pickr,
      });

      pickr.show();
    });


  }

  colorInputs.forEach((input) => {
    observer.observe(input, { attributes: true, attributeFilter: ["style"] });
  });

  function toggleColorSchemeMeta(shouldAdd) {
    const head = document.head || document.getElementsByTagName("head")[0];
    let metaTag = document.querySelector('meta[name="color-scheme"]');
    if (shouldAdd) {
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.name = "color-scheme";
        metaTag.content = "dark";
        head.appendChild(metaTag);
      }
      metaOutput.innerHTML = "&lt;meta name=&quot;color-scheme&quot; content=&quot;dark&quot;&gt;";
      Prism.highlightElement(metaOutput);
    } else {
      if (metaTag) {
        head.removeChild(metaTag);
      }
      metaOutput.textContent = "";
    }
  }

  let currentValues = {};
  Object.entries(cssVariables).forEach(([id, varName]) => {
    currentValues[varName] = root.style.getPropertyValue(varName).trim();
  });

  const getDefaultValue = (className, varName) => {
    const defaultValues = themes.default[className] || themes.default;
    return defaultValues[varName];
  };

  const updateElement = (element, value) => {
    if (element.type === "range") value = value.replace("px", "");
    element.value = value;
  };

  const updateOutput = () => {
    if (!changesMade) return;
    variablesOutput.textContent = getVariablesString();
    Prism.highlightElement(variablesOutput);
    Object.entries(cssVariables).forEach(([id, varName]) => {
      const elements = document.querySelectorAll(`[data-id="${id}"]`);
      elements.forEach((element) => {
        const dataClass = element.getAttribute("data-class");
        const style = document.querySelector(dataClass)?.style;
        if (style) {
          updateElement(element, style.getPropertyValue(varName).trim() || "");
        }
      });
    });
  };

  const getVariablesString = () => {
    const classes = Array.from(
        new Set(Array.from(document.querySelectorAll("[data-class]")).map((el) => el.getAttribute("data-class"))),
    );
    let result = "";
    classes.forEach((className) => {
      const styles = document.querySelector(className)?.style;
      if (!styles) return;
      const classDefaultValues = themes.default[className] || themes.default;
      const changedVariables = Array.from(styles).filter((variable) => {
        const currentValue = styles.getPropertyValue(variable).trim();
        // Игнорируем переменные, значения которых совпадают со значениями по умолчанию
        return variable !== "--demo-bg" && currentValue !== classDefaultValues[variable];
      });
      if (changedVariables.length === 0) return;
      result += `${className} {\n`;
      for (let variable of changedVariables) {
        result += `${variable}: ${styles.getPropertyValue(variable).trim()};\n`;
      }
      result += "}\n";
    });
    return result;
  };

  const clearAllVariables = () => {
    const classes = Array.from(
        new Set(Array.from(document.querySelectorAll("[data-class]")).map((el) => el.getAttribute("data-class"))),
    );
    classes.forEach((className) => {
      const elements = document.querySelectorAll(className);
      elements.forEach((el) => {
        if (el && el.style) {
          // Check if element and style exist
          Array.from(el.style).forEach((variable) => {
            el.style.removeProperty(variable);
          });
        }
      });
    });
  };

  const setVariableForClass = (className, variableName, value) => {
    const elements = document.querySelectorAll(className);
    elements.forEach((el) => el.style.setProperty(variableName, value));
  };

  const getInitialVariablesString = () => {
    const classes = Array.from(
        new Set(Array.from(document.querySelectorAll("[data-class]")).map((el) => el.getAttribute("data-class"))),
    );
    let result = "";
    classes.forEach((className) => {
      const styles = document.querySelector(className)?.style;
      if (!styles) return;
      const changedVariables = Array.from(styles).filter(
          (variable) =>
              variable !== "--demo-bg" &&
              styles.getPropertyValue(variable) !== "" &&
              styles.getPropertyValue(variable) !== themes.default[className][variable],
      );
      if (changedVariables.length === 0) return;
      result += `${className} {\n`;
      for (let variable of changedVariables) {
        result += `${variable}: ${styles.getPropertyValue(variable).trim()};\n`;
      }
      result += "}\n";
    });
    return result;
  };

  const setTheme = (themeName) => {
    clearAllVariables();
    themeChanging = true;
    const classes = Object.keys(themes[themeName]).sort((a, b) => (a === ":root" ? 1 : b === ":root" ? -1 : 0));

    classes.forEach((className) => {
      const vars = themes[themeName][className];
      const elements = document.querySelectorAll(className);

      elements.forEach((element) => {
        const styles = element.style;

        Object.entries(vars).forEach(([key, value]) => {
          const currentValue = styles.getPropertyValue(key).trim();

          if (currentValue !== value) {
            styles.setProperty(key, value);
            const elementKey = Object.keys(cssVariables).find((k) => cssVariables[k] === key);

            if (elementKey) {
              const inputElements = document.querySelectorAll(`[data-id="${elementKey}"][data-class="${className}"]`);
              inputElements.forEach((inputElement) => {
                const pickrInstance = pickrInstances.find((p) => p.id === elementKey);

                if (pickrInstance) {
                  pickrInstance.instance.setColor(value);
                }

                // Если задано - устанавливаем значение свойства --pcr-color
                if (themes[themeName][inputElement.dataset.class] && themes[themeName][inputElement.dataset.class][cssVariables[inputElement.dataset.id]]) {
                  inputElement.style.setProperty("--pcr-color", value);
                } else {
                  // Если не задано - делаем кнопку прозрачной
                  inputElement.style.setProperty("--pcr-color", "transparent");
                }

                const resetButton = inputElement.closest(".sidebar-option").querySelector(".reset-btn");
                if (resetButton) {
                  const defaultValue = getDefaultValue(className, key);
                  if (value !== defaultValue) {
                    resetButton.classList.add("btn-show");
                  } else {
                    resetButton.classList.remove("btn-show");
                  }
                }
              });
            }
          }
        });
      });
    });

    // Обновление кнопок цвета с учетом класса, к которому они относятся
    const colorInputs = document.querySelectorAll(".input-color[data-id]");
    for (const input of colorInputs) {
      const dataClass = input.dataset.class || ":root";
      const varName = cssVariables[input.dataset.id];
      if (themes[themeName][dataClass] && themes[themeName][dataClass][varName]) {
        const currentColorValue = getComputedStyle(document.querySelector(dataClass)).getPropertyValue(varName).trim();
        input.style.setProperty("--pcr-color", currentColorValue);
      } else {
        input.style.setProperty("--pcr-color", "transparent");
      }
    }

    updateOutput();
    themeChanging = false;
    variablesOutput.textContent = getVariablesString();
    Prism.highlightElement(variablesOutput);
  };





  setTheme("default");
  variablesOutput.textContent = getInitialVariablesString();

  Object.entries(cssVariables).forEach(([id, varName]) => {
    const elements = document.querySelectorAll(`[data-id="${id}"]`);
    if (!elements.length) return;

    elements.forEach((element) => {
      const dataClass = element.dataset.class || ":root";
      updateElement(element, root.style.getPropertyValue(varName).trim());

      const defaultValue = getDefaultValue(dataClass, varName);
      let resetButton = element.parentNode.parentNode.querySelector(".reset-btn");
      if (!resetButton) {
        // console.log(`Reset button not found for element with id ${id}`);
      } else {
        resetButton.addEventListener("click", () => {
          if (themes.default[varName] === undefined) {
            setVariableForClass(dataClass, varName, "");
          } else {
            setVariableForClass(dataClass, varName, themes.default[varName]);
          }
          elements.forEach((el) => {
            updateElement(el, document.querySelector(dataClass)?.style.getPropertyValue(varName).trim() || "");
          });
          resetButton.classList.remove("btn-show");
          updateOutput();
        });
      }

      element.addEventListener("input", function () {
        let value = this.value;
        if (this.type === "range") value += "px";
        setVariableForClass(dataClass, varName, value);
        if (resetButton) resetButton.classList.add("btn-show");
        changesMade = true;
        updateOutput();
      });
    });
  });

  themeButton.addEventListener("click", () => {
    setTheme("theme");

    toggleColorSchemeMeta(true);
    metaCheckbox.checked = true;
  });
  themeButton2.addEventListener("click", () => {
    setTheme("theme2");
    toggleColorSchemeMeta(false);
    metaCheckbox.checked = false;
  });
  themeButton3.addEventListener("click", () => {
    setTheme("theme3");
    toggleColorSchemeMeta(true);
    metaCheckbox.checked = true;
  });
  themeButton4.addEventListener("click", () => {
    setTheme("theme4");
    toggleColorSchemeMeta(false);
    metaCheckbox.checked = false;
  });
  themeButton5.addEventListener("click", () => {
    setTheme("theme5");
    toggleColorSchemeMeta(false);
    metaCheckbox.checked = false;
  });

  resetButton.addEventListener("click", () => {
    Object.entries(cssVariables).forEach(([id]) => {
      const resetBtn = document.querySelector(`[data-id="${id}"]`).parentNode.parentNode.querySelector(".reset-btn");
      if (resetBtn) resetBtn.classList.remove("btn-show");
    });

    clearAllVariables();
    setTheme("default");
    toggleColorSchemeMeta(false);

    metaCheckbox.checked = false;
    variablesOutput.textContent = ""; // Clear Prism
    Prism.highlightElement(variablesOutput);
  });

  metaCheckbox.addEventListener("change", function () {
    toggleColorSchemeMeta(this.checked);
  });

  // hide unchanged
  let checkbox = document.querySelector('[data-id="show-changed"]');
  let sidebar = document.querySelector(".sidebar");
  // let resetButton = document.querySelector('[data-id="resetButton"]');

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      sidebar.classList.add("hide-unchanged");
    } else {
      sidebar.classList.remove("hide-unchanged");
    }
  });

  // Функция, которая проверяет, есть ли хотя бы один элемент .btn-show внутри .sidebar
  function checkBtnShow() {
    let btnShowExists = sidebar.querySelector(".btn-show") != null;

    // Если есть, то чекбокс становится доступным, иначе - нет
    checkbox.disabled = !btnShowExists;

    // Если есть элемент .btn-show, то мы добавляем класс .active к resetButton
    if (btnShowExists) {
      resetButton.classList.add("active");
    } else {
      // Если нет элемента .btn-show, то мы убираем галку с чекбокса и удаляем класс .hide-unchanged и .active с resetButton
      checkbox.checked = false;
      sidebar.classList.remove("hide-unchanged");
      resetButton.classList.remove("active");
    }
  }

  // Запускаем функцию при загрузке страницы
  checkBtnShow();

  // И каждый раз, когда класс .btn-show добавляется или удаляется
  const btnShowObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === "class") {
        checkBtnShow();
      }
    });
  });

  // Наблюдаем только за элементами .reset-btn внутри .sidebar
  sidebar.querySelectorAll(".reset-btn").forEach((el) => {
    btnShowObserver.observe(el, {
      attributes: true,
    });
  });


  // tabs


// Удаляем активность со всех кнопок внутри одного блока табов
  const removeButtonActivityInTab = (tabElement) => {
    tabElement.querySelectorAll('.tab-button').forEach(button => {
      button.classList.remove('active-button');
    });
  };

// Скрываем все контенты внутри одного блока табов
  const hideAllContentsInTab = (tabElement) => {
    tabElement.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
  };

// Скрываем все вкладки на странице
  const hideAllTabs = () => {
    document.querySelectorAll('.tabs').forEach(tab => {
      hideAllContentsInTab(tab);
      removeButtonActivityInTab(tab);
    });
  };

// Включаем события нажатия для всех кнопок
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const targetContentId = event.currentTarget.dataset.target;
      const targetContent = document.getElementById(targetContentId);
      const parentTabElement = event.target.closest('.tabs');
      if (targetContent.classList.contains('active')) {
        targetContent.classList.remove('active');
        event.target.classList.remove('active-button');
      } else {
        // hideAllTabs(); // скрываем все вкладки
        hideAllContentsInTab(parentTabElement);
        removeButtonActivityInTab(parentTabElement);
        targetContent.classList.add('active');
        event.target.classList.add('active-button');
      }
    });
  });


// Начальное скрытие всех контентов и удаление активности кнопок
  hideAllTabs();

// Сделать первую вкладку активной при загрузке страницы
  const firstTab = document.querySelector('.tabs');
  if (firstTab) {
    const firstButton = firstTab.querySelector('.tab-button');
    const firstContentId = firstButton.dataset.target;
    const firstContent = document.getElementById(firstContentId);

    firstButton.classList.add('active-button');
    firstContent.classList.add('active');
  }







  // tooltips
  tippy('[data-tooltip="demo-bg"]', {
    content: 'Used only for emulate background color on your website',
  });
});
